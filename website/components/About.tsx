'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Leaf, Users, Clock } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    title: 'Award Winning',
    desc: 'Recognized by Kerala Tourism Board for excellence in backwater hospitality.',
  },
  {
    icon: Leaf,
    title: 'Eco Friendly',
    desc: 'Solar-powered houseboats and biodegradable practices for a greener tomorrow.',
  },
  {
    icon: Users,
    title: 'Expert Crew',
    desc: 'Our experienced local guides bring the backwaters to life with stories and wisdom.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Round-the-clock assistance ensures your journey is seamless and worry-free.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #060d1a 100%)' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(0,188,212,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(56,189,248,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[500px]"
          >
            {/* Main image */}
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=800&q=80&fit=crop"
                alt="Kerala houseboat interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#030a14]/30" />
            </div>
            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-1/2 h-2/5 rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid rgba(56,189,248,0.2)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=400&q=80&fit=crop"
                alt="Kerala backwater scenic view"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a14]/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 left-4 glass-dark rounded-2xl px-5 py-4 shadow-xl"
            >
              <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
                Est. 2008
              </p>
              <p className="font-playfair text-white font-bold text-xl">15+ Years</p>
              <p className="text-white/60 text-xs">of backwater excellence</p>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-10 bg-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl font-semibold text-white leading-[1.2] mb-6"
            >
              The Soul of{' '}
              <span className="text-gradient">Kerala's</span>
              <br />
              Backwaters
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-[15px] md:text-base leading-[1.7] mb-6"
            >
              Nestled in the heart of Alleppey — the Venice of the East — we have been crafting
              extraordinary backwater experiences for over 15 years. Our traditional Kerala
              kettuvallam houseboats are built with bamboo poles and coconut fibers, honoring
              centuries of craftsmanship while offering modern luxury.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/70 text-[15px] md:text-base leading-[1.7] mb-10"
            >
              Every journey with us is a serenade through nature's most pristine waterways —
              past swaying palms, paddy fields, and quaint villages that exist as though time
              has stood still.
            </motion.p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-4 group hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3">
                    <item.icon size={18} className="text-cyan-400" />
                  </div>
                  <h4 className="font-playfair text-white font-semibold text-base mb-1 leading-[1.2]">{item.title}</h4>
                  <p className="text-white/60 text-xs leading-[1.7]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
