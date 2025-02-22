'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Function to check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint

      // Redirect if needed
      if (mobile && pathname === '/dashboard') {
        router.push('/dashboard/mobile');
      } else if (!mobile && pathname === '/dashboard/mobile') {
        router.push('/dashboard');
      }
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [mounted, pathname, router]);

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return children;
}