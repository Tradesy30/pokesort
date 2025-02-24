import { Suspense } from 'react';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileContent } from '@/components/profile/profile-content';
import { ProfileStats } from '@/components/profile/profile-stats';
import { LoadingProfile } from '@/components/profile/loading-profile';
import { Background } from '@/components/ui/Background';

export const metadata = {
  title: 'Your Profile | PokéSort',
  description: 'View and manage your PokéSort profile and collection stats',
};

export default async function ProfilePage() {
  return (
    <main className="min-h-screen animate-fade-in">
      <Background />
      {/* Account for navbar height */}
      <div className="h-2" />

      <div className="container-width px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] xl:gap-8">
          <section className="order-2 lg:order-1">
            <div className="sticky top-24">
              <Suspense fallback={<LoadingProfile />}>
                <ProfileContent />
              </Suspense>
            </div>
          </section>

          <aside className="order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <Suspense>
                <ProfileStats />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}