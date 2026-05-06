import Link from 'next/link';
import { motion } from 'framer-motion';
import { CuboidLogo } from '@cuboid/design-system';

export function Navigation() {
  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Rates', href: '/rates' },
    { label: 'Security', href: '/security' },
    { label: 'Developers', href: '/developers' },
    { label: 'Learn', href: '/learn' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <CuboidLogo variant="mark" mode="dark" width={32} height={32} />
            <span className="text-xl font-semibold text-[#0A2A66]">CUBOID</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#7183A6] hover:text-[#F5F8FF] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-sm text-[#7183A6] hover:text-[#F5F8FF] transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white px-5 py-2 rounded-xl font-medium hover:shadow-lg transition-shadow"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}