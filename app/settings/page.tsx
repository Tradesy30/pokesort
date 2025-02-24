import { Metadata } from 'next';
import { SettingsForm } from '@/components/settings/settings-form';
import { SettingsHeader } from '@/components/settings/settings-header';
import { Background } from '@/components/ui/Background';

export const metadata: Metadata = {
  title: 'Settings | PokéSort',
  description: 'Manage your PokéSort account settings and preferences',
};

export default function SettingsPage() {
  return (
    <main className="min-h-screen animate-fade-in">
      <Background />

      {/* Account for navbar height */}
      <div className="h-2" />

      <div className="container-width px-4 sm:px-6 lg:px-8 py-8">
        <SettingsHeader />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] xl:gap-8">
          <section className="order-2 lg:order-1">
            <div className="sticky top-24">
              <SettingsForm />
            </div>
          </section>

          <aside className="order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              {/* TODO: Add settings sidebar content if needed */}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}