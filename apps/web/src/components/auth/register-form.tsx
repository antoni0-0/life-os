'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { AuthButton } from '@/components/auth/auth-button';
import { AuthField } from '@/components/auth/auth-field';
import { AuthShell } from '@/components/auth/auth-shell';
import { register } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/client';
import { saveAuthTokens } from '@/lib/auth/session';

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    preferredName: '',
    email: '',
    birthday: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const tokens = await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName || undefined,
        birthday: form.birthday,
        preferredName: form.preferredName,
      });
      saveAuthTokens(tokens);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to create your account right now. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Start your journey"
      subtitle="Create your account and begin building your best life."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthField
            label="First name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Required"
            value={form.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
            required
          />
          <AuthField
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Optional"
            value={form.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
          />
        </div>

        <AuthField
          label="Preferred name"
          name="preferredName"
          autoComplete="nickname"
          placeholder="How should we call you?"
          value={form.preferredName}
          onChange={(event) => updateField('preferredName', event.target.value)}
          required
        />

        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />

        <AuthField
          label="Birthday"
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={(event) => updateField('birthday', event.target.value)}
          required
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={(event) => updateField('password', event.target.value)}
          minLength={6}
          required
        />

        {error ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </AuthButton>
      </form>
    </AuthShell>
  );
}
