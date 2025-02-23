'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  minLength?: number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  label?: string;
}

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  disabled = false,
  minLength,
  required = false,
  placeholder,
  error,
  label
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          required={required}
          className={`appearance-none rounded-lg relative block w-full px-3 py-2 pr-10 border ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-[var(--surface-primary)] focus:ring-blue-500'
          } bg-[var(--bg-tertiary)] text-[var(--text-primary)] focus:outline-none focus:ring-2`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          minLength={minLength}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1} // Prevents tab focus while maintaining clickability
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}