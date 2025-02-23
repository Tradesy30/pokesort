import { Suspense } from 'react';
import ErrorContent from './error-content';

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="max-w-md w-full space-y-8 p-8 bg-[var(--bg-secondary)] rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
              Loading...
            </h2>
          </div>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}