import type { InputHTMLAttributes } from 'react';

type AuthFieldProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function AuthField({ label, error, id, className = '', ...props }: AuthFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={fieldId}
        className={`w-full rounded-xl border bg-elevated px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${error ? 'border-danger/70' : 'border-white/10'} ${className}`}
        {...props}
      />
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
