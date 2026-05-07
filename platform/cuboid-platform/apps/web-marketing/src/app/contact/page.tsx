"use client";

import { Navigation } from "@/components";

export default function Contact() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      <section className="pt-navbar">
        <div className="max-w-container mx-auto px-gutter pt-premium_section">
          <span className="badge-premium mb-lg block">CONTACT</span>
          <h1 className="font-section text-pure_white mb-lg">Get in touch</h1>
          <div className="grid grid-cols-2 gap-lg">
            <div className="premium_panel rounded-card p-xl">
              <h3 className="font-card text-pure_white mb-lg">Send a message</h3>
              <div className="space-y-lg">
                <input placeholder="Name" className="w-full h-button bg-obsidian/50 border border-white/[0.08] rounded-small px-md text-pure_white" />
                <input placeholder="Email" className="w-full h-button bg-obsidian/50 border border-white/[0.08] rounded-small px-md text-pure_white" />
                <textarea placeholder="Message" rows={4} className="w-full bg-obsidian/50 border border-white/[0.08] rounded-small p-md text-pure_white" />
                <button className="btn-primary w-full">Send Message</button>
              </div>
            </div>
            <div className="space-y-lg">
              <div className="premium_panel rounded-card p-xl">
                <h3 className="font-card text-pure_white mb-3">Lagos, Nigeria</h3>
                <p className="text-muted_slate text-sm">Victoria Island</p>
              </div>
              <div className="premium_panel rounded-card p-xl">
                <h3 className="font-card text-pure_white mb-3">Email</h3>
                <p className="text-muted_slate text-sm">institutions@cuboid.technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}