'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { Sparkles } from '@/components/ui/sparkles';
import PasswordInput from '@/components/ui/password-input';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/mobile";
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'USER_NOT_FOUND':
        return 'No account found with this username';
      case 'INVALID_PASSWORD':
        return 'Incorrect password';
      case 'VALIDATION_ERROR':
        return 'Please check your username and password';
      case 'CredentialsSignin':
        return 'Invalid username or password';
      case 'Default':
        return 'An error occurred during sign in';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(callbackUrl);
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError('Default');
    } finally {
      setIsLoading(false);
    }
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Sign in to manage your Pokémon collection
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-relative" role="alert">
            <span className="block sm:inline">
              {getErrorMessage(error)}
            </span>
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
                className="appearance-none rounded-lg relative block w-full px-3 py-2 mt-1 border border-[var(--surface-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              required
              error={getErrorMessage(error)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-[var(--text-secondary)]">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-[var(--text-primary)]">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}