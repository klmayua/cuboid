import { motion } from 'framer-motion';

function CuboidLogo({ variant = 'full', width = 80, height = 80, className = '' }) {
  const svg = (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="20" width="40" height="40" rx="4" stroke="#5E8DFF" strokeWidth="2" fill="none"/>
      <rect x="30" y="20" width="40" height="40" rx="4" stroke="#123E91" strokeWidth="2" fill="none"/>
      <rect x="10" y="20" width="40" height="40" rx="4" stroke="#0A2A66" strokeWidth="2" fill="rgba(10, 42, 102, 0.5)"/>
    </svg>
  );
  return svg;
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <CuboidLogo variant="full" mode="light" width={80} height={80} className="mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-light text-[#F5F8FF] mb-6 tracking-tight"
        >
          Institutional Economic
          <br />
          <span className="text-brand-light-trust">Infrastructure</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#AAB7D1] max-w-2xl mx-auto mb-10"
        >
          Trust infrastructure for the movement of value. Orchestration, settlement, 
          compliance, and FX — built for institutions that move serious money.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-shadow">
            Launch Cuboid
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-medium text-[#AAB7D1] hover:text-[#F5F8FF] transition-colors">
            Talk to Sales
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-[#7183A6]"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
            All systems operational
          </span>
          <span>SOC 2 Type II</span>
          <span>Bank-grade security</span>
        </motion.div>
      </div>
    </section>
  );
}