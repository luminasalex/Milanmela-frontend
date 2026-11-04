"use client";

import { motion } from "framer-motion";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="relative w-full overflow-hidden bg-[#064B38] py-20 lg:py-24"
    >
      {/* Alpana cream pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-alpana-cream bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      {/* Golden top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C99A4B] to-transparent" />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
        <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 5 L35 20 L50 20 L38 29 L43 44 L30 35 L17 44 L22 29 L10 20 L25 20 Z" stroke="#C99A4B" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none rotate-45">
        <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 5 L35 20 L50 20 L38 29 L43 44 L30 35 L17 44 L22 29 L10 20 L25 20 Z" stroke="#C99A4B" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C99A4B]/60" />
          <span className="text-[#C99A4B]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C99A4B]/60" />
        </div>

        {/* Mail icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center size-16 rounded-full bg-[#C99A4B]/15 border border-[#C99A4B]/30 mb-6 mx-auto"
        >
          <Mail className="size-7 text-[#C99A4B]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-[#F7F1E3] mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Stay Connected with{" "}
          <span className="text-[#C99A4B]">Milanmela</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#F7F1E3]/75 text-base mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Get updates about new volunteer opportunities and community projects
          happening near you.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#65472D]" />
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-12 pl-10 pr-4 rounded-full bg-[#F7F1E3] border-[#C99A4B]/30 text-[#064B38] placeholder:text-[#65472D]/60 text-sm focus-visible:border-[#C99A4B] focus-visible:ring-[#C99A4B]/30"
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-7 rounded-full bg-[#C83D2B] text-white hover:bg-[#C83D2B]/85 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0"
          >
            Subscribe
            <Send className="size-4 ml-1" />
          </Button>
        </motion.form>

        {/* Privacy note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 mt-5 text-xs text-[#F7F1E3]/50"
        >
          <ShieldCheck className="size-3.5 text-[#C99A4B]" />
          Your privacy is respected. We never share your information.
        </motion.p>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-20 bg-[#C99A4B]/30" />
          <span className="text-[#C99A4B]/60 text-xs tracking-widest uppercase font-bold">
            Milanmela
          </span>
          <div className="h-px w-20 bg-[#C99A4B]/30" />
        </div>
      </div>
    </section>
  );
}
