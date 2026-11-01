import Image from "next/image";
import { Globe, Share2, Link2, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "" },
  { label: "About Milanmela", href: "#about" },
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Gallery Showcase", href: "#gallery" },
  { label: "Past Events", href: "#completed-events" },
];

const usefulLinks = [
  { label: "Cultural Heritage", href: "#about-details" },
  { label: "Community Blog", href: "#" },
  { label: "Event Partners", href: "#" },
  { label: "Media Coverage", href: "#" },
  { label: "Newsletter", href: "#newsletter" },
];

const socialLinks = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Share2, label: "Instagram", href: "#" },
  { icon: Link2, label: "YouTube", href: "#" },
  { icon: Mail, label: "X / Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#064B38] overflow-hidden">
      {/* Golden top separator */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C83D2B] via-[#C99A4B] to-[#C83D2B]" />

      {/* Alpana cream pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-alpana-cream bg-repeat" style={{ backgroundSize: "80px 80px" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="relative size-12 rounded-full border-2 border-[#C99A4B]/50 overflow-hidden shadow-md flex-shrink-0">
                <Image
                  src="/Milanmela.png"
                  alt="Milanmela Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p
                  className="text-xl font-bold text-[#F7F1E3]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Milanmela
                </p>
                <p className="text-[10px] text-[#C99A4B] tracking-widest uppercase">
                  Cultural Platform
                </p>
              </div>
            </div>

            {/* Bengali tagline */}
            <p
              className="text-sm text-[#F7F1E3]/70 italic"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              সংস্কৃতির ছোঁয়ায়, মিলনের আয়োজনে।
            </p>

            {/* Description */}
            <p className="text-xs text-[#F7F1E3]/60 leading-relaxed">
              Milanmela is a premium Bengali cultural platform dedicated to
              celebrating community, tradition, and the timeless heritage of
              Bengali arts and culture.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center size-9 rounded-full border border-[#C99A4B]/30 text-[#C99A4B] hover:bg-[#C99A4B] hover:text-[#064B38] hover:border-[#C99A4B] transition-all"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#C99A4B] uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="h-px w-8 bg-[#C99A4B]/40" />
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#F7F1E3]/65 hover:text-[#C99A4B] transition-colors flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-[#C83D2B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#C99A4B] uppercase tracking-widest">
              Useful Links
            </h4>
            <div className="h-px w-8 bg-[#C99A4B]/40" />
            <ul className="flex flex-col gap-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#F7F1E3]/65 hover:text-[#C99A4B] transition-colors flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-[#C83D2B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[#C99A4B] uppercase tracking-widest">
              Get In Touch
            </h4>
            <div className="h-px w-8 bg-[#C99A4B]/40" />
            <p className="text-xs text-[#F7F1E3]/60 leading-relaxed">
              Have questions about upcoming events or want to partner with us?
              We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col gap-2 text-xs text-[#F7F1E3]/60">
              <p>📧 hello@milanmela.com</p>
              <p>📍 Dhaka, Bangladesh</p>
              <p>📞 +880 1700-000000</p>
            </div>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 self-start mt-2 rounded-full bg-[#C83D2B]/80 hover:bg-[#C83D2B] text-white text-xs font-bold px-5 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Subscribe Newsletter →
            </a>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C99A4B]/20 pt-8">
          <p className="text-xs text-[#F7F1E3]/50 text-center sm:text-left">
            © {new Date().getFullYear()} Milanmela. All rights reserved. Crafted with{" "}
            <span className="text-[#C83D2B]">♥</span> for Bengali culture.
          </p>

          <div className="flex items-center gap-1.5">
            <div className="h-px w-12 bg-[#C99A4B]/30" />
            <span className="text-[#C99A4B]/60 text-[10px] tracking-widest uppercase font-bold">
              সংস্কৃতির ছোঁয়ায়
            </span>
            <div className="h-px w-12 bg-[#C99A4B]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
