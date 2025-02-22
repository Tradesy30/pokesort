'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Sparkles } from '@/app/components/ui/sparkles';
import PasswordInput from '@/app/components/ui/password-input';

interface FieldError {
  field: string;
  message: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setGeneralError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'VALIDATION_ERROR') {
          setErrors(data.details);
          return;
        }

        if (data.error === 'DUPLICATE_ERROR') {
          setErrors([{ field: data.field, message: data.message }]);
          return;
        }

        throw new Error(data.message || 'Something went wrong');
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Failed to sign in after registration');
      }

      router.push('/dashboard/mobile');
    } catch (err: any) {
      setGeneralError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <Sparkles
          id="sparkles"
          particleColor="#60A5FA"
          particleDensity={100}
          speed={0.6}
          minSize={1.2}
          maxSize={2.5}
          particleGlow={true}
        />
      </div>

      {/* Content Container with higher z-index */}
      <div className="max-w-md w-full space-y-8 p-8 bg-[var(--bg-secondary)] rounded-xl shadow-lg relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Join PokéSort and start managing your collection
          </p>
        </div>

        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-[var(--text-primary)]">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border ${
                  getFieldError('username')
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[var(--surface-primary)] focus:ring-blue-500'
                } bg-[var(--bg-tertiary)] text-[var(--text-primary)] focus:outline-none focus:ring-2`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isLoading}
                minLength={3}
              />
              {getFieldError('username') && (
                <p className="mt-1 text-xs text-red-500">{getFieldError('username')}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border ${
                  getFieldError('email')
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[var(--surface-primary)] focus:ring-blue-500'
                } bg-[var(--bg-tertiary)] text-[var(--text-primary)] focus:outline-none focus:ring-2`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
              {getFieldError('email') && (
                <p className="mt-1 text-xs text-red-500">{getFieldError('email')}</p>
              )}
            </div>

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              required
              minLength={8}
              error={getFieldError('password')}
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={isLoading}
              required
              minLength={8}
              error={getFieldError('confirmPassword')}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}