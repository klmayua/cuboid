import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';

export function Footer() {
  const footerLinks = {
    Products: [
      { label: 'Cuboid Connect', href: '/products/connect' },
      { label: 'Cuboid FX', href: '/products/fx' },
      { label: 'Cuboid Treasury', href: '/products/treasury' },
      { label: 'Cuboid Pay', href: '/products/pay' },
      { label: 'Cuboid Escrow', href: '/products/escrow' },
    ],
    Solutions: [
      { label: 'For Banks', href: '/solutions/banks' },
      { label: 'For IMTOs', href: '/solutions/imtos' },
      { label: 'For Enterprises', href: '/solutions/enterprises' },
      { label: 'For Developers', href: '/solutions/developers' },
    ],
    Resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Status', href: '/status' },
      { label: 'Security', href: '/security' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#0B1020] border-t border-white/7 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <CuboidLogo variant="mark" mode="dark" width={28} height={28} />
              <span className="text-lg font-semibold text-[#0A2A66]">CUBOID</span>
            </Link>
            <p className="text-sm text-[#7183A6]">
              Institutional economic infrastructure for Africa and beyond.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#F5F8FF] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#7183A6] hover:text-[#F5F8FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7183A6]">
            © 2024 Insane Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#7183A6]">
            <Link href="/legal/privacy" className="hover:text-[#F5F8FF] transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-[#F5F8FF] transition-colors">
              Terms
            </Link>
            <Link href="/legal/compliance" className="hover:text-[#F5F8FF] transition-colors">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}