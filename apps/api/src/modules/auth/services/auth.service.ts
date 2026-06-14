import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { PrismaService } from '../../../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    try {
      console.log('Registering user', data);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        preferredName: data.preferredName,
        birthday: new Date(data.birthday),
      },
    });

      return this.generateTokens(user.id, user.email);
    } catch (error) {
      console.error('Failed to register user', error);
      throw new Error('Failed to register user');
    }
  }

  async login(email: string, password: string) {
    try {
      console.log('Logging in user', email);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email);
    } catch (error) {
      console.error('Failed to login user', error);
      throw new Error('Failed to login user');
    }
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessSecret = process.env.JWT_ACCESS_SECRET || '';
    const accessExpires = process.env.JWT_ACCESS_EXPIRES as StringValue | undefined;
    const refreshSecret = process.env.JWT_REFRESH_SECRET || '';
    const refreshExpires = process.env.JWT_REFRESH_EXPIRES as StringValue | undefined;

    if (!accessSecret || !accessExpires || !refreshSecret || !refreshExpires) {
      throw new Error('Missing JWT environment variables');
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: accessExpires,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpires,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}