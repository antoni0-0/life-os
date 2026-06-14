import type { ButtonHTMLAttributes, ReactNode } from 'react';

type AuthButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function AuthButton({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: AuthButtonProps) {
  const baseStyles =
    'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base';

  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-primary-orange to-secondary-purple text-white hover:brightness-110'
      : 'border border-white/10 bg-elevated text-text-primary hover:border-white/30';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
