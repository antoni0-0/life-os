import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { QueryTasksDto } from '../dto/query-tasks.dto';

const taskAssigneeSelect = {
  id: true,
  firstName: true,
  lastName: true,
  preferredName: true,
  profilePicture: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        category: dto.category,
        description: dto.description,
        priority: dto.priority,
        status: dto.status,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        userId: dto.userId,
      },
      include: {
        user: {
          select: taskAssigneeSelect,
        },
      },
    });
  }

  async findMany(query: QueryTasksDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'desc';
    const where = this.buildWhereClause(query);

    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: taskAssigneeSelect,
          },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  private buildWhereClause(query: QueryTasksDto): Prisma.TaskWhereInput {
    const where: Prisma.TaskWhereInput = {};

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.search?.trim()) {
      const search = query.search.trim();
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (query.status?.length) {
      where.status = { in: query.status };
    }

    if (query.priority?.length) {
      where.priority = { in: query.priority };
    }

    return where;
  }
}
