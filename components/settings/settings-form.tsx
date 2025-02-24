'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Save, AlertCircle, Bell, User, Palette, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const settingsSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string().email('Please enter a valid email address'),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    newFeatures: z.boolean().default(true),
    deckUpdates: z.boolean().default(true),
  }),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    cardDisplayStyle: z.enum(['grid', 'list']),
    enableAnimations: z.boolean().default(true),
    compactMode: z.boolean().default(false),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export function SettingsForm() {
  const { data: session, status } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: session?.user?.username || '',
      email: session?.user?.email || '',
      notifications: {
        email: true,
        push: true,
        newFeatures: true,
        deckUpdates: true,
      },
      preferences: {
        theme: 'system',
        cardDisplayStyle: 'grid',
        enableAnimations: true,
        compactMode: false,
      },
    },
  });

  async function onSubmit(data: SettingsFormData) {
    try {
      setIsSaving(true);

      const response = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'DUPLICATE_ERROR') {
          form.setError(result.field as 'username' | 'email', {
            type: 'manual',
            message: result.message,
          });
          toast.error(`This ${result.field} is already taken`);
          return;
        }

        if (result.error === 'VALIDATION_ERROR') {
          result.details.forEach((error: { field: string; message: string }) => {
            form.setError(error.field as any, {
              type: 'manual',
              message: error.message,
            });
          });
          toast.error('Please check the form for errors');
          return;
        }

        throw new Error(result.message || 'Failed to update settings');
      }

      // Update the session data with new values
      const { user } = result;
      if (user) {
        router.refresh(); // Refresh the page to update session data
        toast.success('Settings saved successfully');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  // Get formatted dates for stats
  const memberSince = session?.user?.id
    ? new Date(parseInt(session.user.id.substring(0, 8), 16) * 1000).getFullYear()
    : new Date().getFullYear();

  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Quick Stats */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Account Status", value: "Active", color: "from-emerald-400 to-teal-600", icon: "🟢" },
          { label: "Member Since", value: memberSince.toString(), color: "from-sky-400 to-blue-600", icon: "📅" },
          { label: "Last Updated", value: "Today", color: "from-purple-400 to-indigo-600", icon: "🔄" },
          { label: "Settings Status", value: form.formState.isDirty ? "Unsaved" : "Up to date", color: "from-amber-400 to-orange-600", icon: form.formState.isDirty ? "⚠️" : "✨" }
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="card gradient-border p-4"
          >
            <h3 className="text-sm text-[var(--text-secondary)]">{stat.label}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span>{stat.icon}</span>
              <p className={`text-base font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Account Settings */}
      <motion.div variants={fadeInUp} className="card gradient-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="h-5 w-5 text-[var(--text-secondary)]" />
          <h2 className="text-xl font-bold gradient-text">Account Settings</h2>
        </div>
        <div className="grid gap-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-[var(--text-secondary)]">
              Username
            </label>
            <input
              {...form.register('username')}
              id="username"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--surface-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              placeholder="Enter your username"
            />
            {form.formState.errors.username && (
              <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>{form.formState.errors.username.message}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">
              Email
            </label>
            <input
              {...form.register('email')}
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--surface-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              placeholder="Enter your email"
            />
            {form.formState.errors.email && (
              <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>{form.formState.errors.email.message}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div variants={fadeInUp} className="card gradient-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="h-5 w-5 text-[var(--text-secondary)]" />
          <h2 className="text-xl font-bold gradient-text">Notifications</h2>
        </div>
        <div className="grid gap-4">
          {[
            { id: 'email-notifications', label: 'Email Notifications', desc: 'Receive updates via email', field: 'notifications.email' },
            { id: 'push-notifications', label: 'Push Notifications', desc: 'Receive instant notifications in your browser', field: 'notifications.push' },
            { id: 'new-features', label: 'New Features', desc: 'Get notified about new PokéSort features', field: 'notifications.newFeatures' },
            { id: 'deck-updates', label: 'Deck Updates', desc: 'Get notified about changes to your deck', field: 'notifications.deckUpdates' }
          ].map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--surface-secondary)] transition-colors"
            >
              <div className="space-y-1">
                <label htmlFor={notification.id} className="text-sm font-medium text-[var(--text-primary)]">
                  {notification.label}
                </label>
                <p className="text-xs text-[var(--text-secondary)]">{notification.desc}</p>
              </div>
              <input
                {...form.register(notification.field as any)}
                id={notification.id}
                type="checkbox"
                className="h-5 w-5 rounded border-[var(--border-primary)] accent-[var(--accent-primary)]"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={fadeInUp} className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving || !form.formState.isDirty}
          className="button-primary flex items-center justify-center space-x-2 px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </motion.div>
    </motion.form>
  );
}