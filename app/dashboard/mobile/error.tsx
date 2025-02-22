'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="max-w-md w-full space-y-8 p-8 bg-[var(--bg-secondary)] rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
            Something went wrong!
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={reset}
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            Try again
          </button>
          <span className="text-[var(--text-secondary)]">•</span>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}