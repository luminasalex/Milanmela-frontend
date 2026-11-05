"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Calendar,
  PlusCircle,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  setLanguage,
  useLanguage,
} from "@/components/LanguageProvider";

const navLinks = [
  { label: { bn: "আমাদের সম্পর্কে", en: "About" }, href: "/#about" },
  { label: { bn: "আসন্ন আয়োজন", en: "Upcoming Events" }, href: "/#upcoming-events" },
  // { label: "Create Event", href: "/create-event" },
  // { label: "All Events", href: "/events" },
  { label: { bn: "ছবির গ্যালারি", en: "Gallery Showcase" }, href: "/#gallery" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const language = useLanguage();
  const isHomePage = pathname === "/";
  const isBengali = isHomePage && language === "bn";
  const activeLanguage = isBengali ? "bn" : "en";
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        console.error("Sign out failed:", error);
        toast.error(error.message || (isBengali ? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।" : "Failed to sign out. Please try again."));
        return;
      }

      toast.success(isBengali ? "সফলভাবে সাইন আউট হয়েছে।" : "Signed out successfully.");
      router.push("/sing-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error(isBengali ? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।" : "Failed to sign out. Please try again.");
    }
  }

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <header
      lang={activeLanguage}
      style={{ fontFamily: isBengali ? "var(--font-bengali)" : "inherit" }}
      className="sticky top-0 z-50 w-full border-b border-[#C99A4B]/30 bg-[#F7F1E3]/95 backdrop-blur-md"
    >
      {/* Golden decorative top stripe */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C99A4B] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo + Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={isBengali ? "মিলনমেলা হোম" : "Milanmela Home"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Milanmela.png"
              alt="Milanmela Logo"
              className="size-10 lg:size-12 rounded-full border-2 border-[#C99A4B]/50 object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span
                className="text-xl lg:text-2xl font-bold tracking-wide text-[#064B38]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Milanmela
              </span>
              <span
                className="text-[10px] tracking-widest text-[#C99A4B] uppercase hidden sm:block"
              >
                {isBengali ? "সংস্কৃতির ছোঁয়ায়" : "BENGALI CULTURE & COMMUNITY"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[#064B38] transition-colors hover:text-[#C83D2B] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#C83D2B] after:transition-all hover:after:w-full"
              >
                {link.label[activeLanguage]}
              </Link>
            ))}
          </nav>

          {/* Right: Avatar + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {isHomePage && (
              <div
                role="group"
                aria-label={isBengali ? "ভাষা নির্বাচন করুন" : "Choose language"}
                className="flex items-center rounded-full border border-[#C99A4B]/40 bg-white p-0.5"
              >
                {(["bn", "en"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    aria-pressed={language === option}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      language === option
                        ? "bg-[#064B38] text-[#F7F1E3]"
                        : "text-[#064B38] hover:bg-[#064B38]/10"
                    }`}
                  >
                    {option === "bn" ? "বাংলা" : "EN"}
                  </button>
                ))}
              </div>
            )}
            <Link
              href="#"
              onClick={toggleTheme}
              aria-label={isBengali ? "রঙের থিম বদলান" : "Toggle color theme"}
              title={isBengali ? "রঙের থিম বদলান" : "Toggle color theme"}
              className="theme-toggle flex size-9 items-center justify-center rounded-full border border-[#C99A4B]/40 text-[#064B38] transition hover:border-[#C99A4B] hover:bg-[#064B38]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064B38]/40"
            >
              <Moon className="theme-toggle-moon size-4" />
              <Sun className="theme-toggle-sun size-4" />
            </Link>

            {!isPending && session?.user ? (
              /* Logged In User State with Dropdown Menu */
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-2 rounded-full border border-[#C99A4B]/40 bg-white pl-1.5 pr-2.5 py-1 shadow-sm transition hover:border-[#C99A4B] hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#064B38]/30"
                  aria-label={isBengali ? "ব্যবহারকারীর প্রোফাইল মেনু খুলুন" : "Open user profile menu"}
                >
                  <div className="relative size-7 shrink-0 rounded-full border border-[#C99A4B]/60 overflow-hidden bg-[#064B38] flex items-center justify-center">
                    {session.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name || (isBengali ? "ব্যবহারকারী" : "User")}
                        className="size-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[#F7F1E3] text-xs font-bold">
                        {userInitial}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-xs font-semibold text-[#064B38] max-w-[110px] truncate">
                    {session.user.name || (isBengali ? "অ্যাকাউন্ট" : "Account")}
                  </span>
                  <ChevronDown className="size-3 text-[#65472D]/70" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-64 p-2 bg-white/95 backdrop-blur-md border border-[#C99A4B]/35 shadow-2xl rounded-2xl"
                >
                  {/* User Profile Details Header */}
                  <div className="flex items-center gap-3 p-3 bg-[#F7F1E3]/60 rounded-xl border border-[#C99A4B]/20 mb-1">
                    <div className="relative size-11 shrink-0 rounded-full border-2 border-[#C99A4B]/60 overflow-hidden bg-[#064B38] flex items-center justify-center shadow-sm">
                      {session.user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={session.user.image}
                          alt={session.user.name || (isBengali ? "ব্যবহারকারী" : "User")}
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-[#F7F1E3] text-sm font-bold">
                          {userInitial}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#064B38] truncate leading-tight">
                        {session.user.name || (isBengali ? "সাংস্কৃতিক সদস্য" : "Cultural Member")}
                      </p>
                      <p className="text-[11px] text-[#65472D] truncate mt-0.5">
                        {session.user.email}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#C99A4B] uppercase tracking-wider mt-1">
                        <Sparkles className="size-2.5" /> {isBengali ? "মিলনমেলার সদস্য" : "Milanmela Member"}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-[#C99A4B]/20 my-1" />

                  {/* Quick links */}
                  <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-semibold text-[#064B38] hover:bg-[#064B38]/10 transition-colors">
                    <Link href="/create-event" className="flex items-center gap-2.5 w-full">
                      <PlusCircle className="size-4 text-[#C99A4B]" />
                      <span>{isBengali ? "আয়োজন তৈরি করুন" : "Create Event"}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-semibold text-[#064B38] hover:bg-[#064B38]/10 transition-colors">
                    <Link href="/events" className="flex items-center gap-2.5 w-full">
                      <Calendar className="size-4 text-[#064B38]" />
                      <span>{isBengali ? "সকল আয়োজনের তালিকা" : "All Events Schedule"}</span>
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-semibold text-[#064B38] hover:bg-[#064B38]/10 transition-colors">
                    <Link href="/joined-events" className="flex items-center gap-2.5 w-full">
                      <Calendar className="size-4 text-[#064B38]" />
                      <span>{isBengali ? "আমার যোগ দেওয়া আয়োজন" : "My Joined Events"}</span>
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-semibold text-[#064B38] hover:bg-[#064B38]/10 transition-colors">
                    <Link href="/manage-events" className="flex items-center gap-2.5 w-full">
                      <Calendar className="size-4 text-[#064B38]" />
                      <span>{isBengali ? "আয়োজন পরিচালনা" : "Manage Events"}</span>
                    </Link>
                  </DropdownMenuItem>


                  <DropdownMenuSeparator className="bg-[#C99A4B]/20 my-1" />

                  {/* Sign Out Action inside Dropdown */}
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-semibold text-[#C83D2B] hover:bg-[#C83D2B]/10 hover:text-[#C83D2B] focus:bg-[#C83D2B]/10 focus:text-[#C83D2B] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 w-full">
                      <LogOut className="size-4" />
                      <span>{isBengali ? "সাইন আউট" : "Sign Out"}</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Signed Out State */
              <Link
                href="/sing-in"
                aria-label={isBengali ? "ব্যবহারকারী সাইন ইন" : "User sign in"}
                className="flex items-center gap-2 rounded-full border border-[#C99A4B]/40 bg-white px-3 py-1.5 shadow-sm transition hover:border-[#C99A4B] hover:shadow-md cursor-pointer"
              >
                <Avatar size="sm" className="border border-[#C99A4B]/60">
                  <AvatarFallback className="bg-[#064B38] text-[#F7F1E3]">
                    <User className="size-3" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-xs font-medium text-[#064B38]">
                  {isBengali ? "সাইন ইন" : "Sign In"}
                </span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              aria-label={
                mobileOpen
                  ? isBengali
                    ? "মেনু বন্ধ করুন"
                    : "Close menu"
                  : isBengali
                    ? "মেনু খুলুন"
                    : "Open menu"
              }
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-[#C99A4B]/40 text-[#064B38] hover:bg-[#064B38]/5 transition"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#C99A4B]/20 bg-[#F7F1E3] px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-2 text-sm font-medium text-[#064B38] border-b border-[#C99A4B]/20 hover:text-[#C83D2B] transition-colors last:border-0"
              >
                {link.label[activeLanguage]}
              </Link>
            ))}

            {session?.user ? (
              <div className="pt-2 flex items-center justify-between border-t border-[#C99A4B]/20">
                <div className="flex items-center gap-2">
                  <div className="relative size-7 shrink-0 rounded-full border border-[#C99A4B]/60 overflow-hidden bg-[#064B38] flex items-center justify-center">
                    {session.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name || (isBengali ? "ব্যবহারকারী" : "User")}
                        className="size-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[#F7F1E3] text-xs font-bold">
                        {userInitial}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#064B38] max-w-[150px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[#C83D2B] text-[#C83D2B] hover:bg-[#C83D2B] hover:text-white transition-colors"
                >
                  {isBengali ? "সাইন আউট" : "Sign Out"}
                </button>
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-2">
                <Link
                  href="/sing-in"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-full border border-[#064B38] text-[#064B38] hover:bg-[#064B38] hover:text-[#F7F1E3] transition-colors"
                >
                  {isBengali ? "সাইন ইন" : "Sign In"}
                </Link>
                <Link
                  href="/sing-up"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-full bg-[#064B38] text-[#F7F1E3] hover:bg-[#064B38]/90 transition-colors"
                >
                  {isBengali ? "নিবন্ধন করুন" : "Sign Up"}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
