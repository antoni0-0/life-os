export const ECOSYSTEM_FEATURES = [
    {
        icon: '/assets/habits-icon.png',
        title: 'Habits',
        description: 'Build habits that stick and track your streaks.',
        color: '#7bfb5d',
    },
    {
        icon: '/assets/goals-icon.png',
        title: 'Goals',
        description: 'Set meaningful goals and crush them step by step.',
        color: '#ffd529',
    },
    {
        icon: '/assets/health-icon.png',
        title: 'Health',
        description: 'Move, sleep, eat better and feel your best every day.',
        color: '#ff84a7',
    },
    {
        icon: '/assets/mind-icon.png',
        title: 'Mind',
        description: 'Improve focus, mindfulness and mental clarity.',
        color: '#58c7f9',
    },
    {
        icon: '/assets/skills-icon.png',
        title: 'Skills',
        description: 'Learn, practice and master new skills.',
        color: '#c893f0',
    },
    {
        icon: '/assets/finance-icon.png',
        title: 'Finance',
        description: 'Track your income, expenses and net worth.',
        color: '#7bfb5d',
    },
] as const;

export type NavItem = {
    id: number;
    label: string;
    href: string;
    icon?: string;
    color?: string;
};

export const NAV_ITEMS: NavItem[] = [
    { id: 1, label: 'Home', href: '/dashboard', color: '#c4b5fd' },
    ...ECOSYSTEM_FEATURES.map((feature, index) => ({
        id: index + 2,
        label: feature.title,
        href: `/${feature.title.toLowerCase()}`,
        icon: feature.icon,
        color: feature.color,
    })),
];
