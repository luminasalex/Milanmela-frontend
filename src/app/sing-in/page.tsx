"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

// Google Icon Component
function GoogleIcon({ className = "size-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
            />
        </svg>
    );
}

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function showError(message: string) {
        setErrorMessage(message);
        toast.error(message);
    }

    // Google Sign-in Handler
    async function handleGoogleSignIn() {
        setErrorMessage(null);
        setIsGoogleLoading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                showError(error.message || "Failed to sign in with Google.");
                setIsGoogleLoading(false);
                return;
            }
        } catch (err: unknown) {
            console.error("Google sign in error:", err);
            const msg =
                err instanceof Error
                    ? err.message
                    : "Failed to sign in with Google. Please check your connection.";
            showError(msg);
            setIsGoogleLoading(false);
        }
    }

    // Email & Password Sign-in Handler
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMessage(null);

        if (!email.trim()) {
            showError("Please enter your email address.");
            return;
        }

        if (!password) {
            showError("Please enter your password.");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email: email.trim(),
                password,
                callbackURL: "/",
            });

            if (error) {
                showError(error.message || "Invalid email or password.");
                setIsLoading(false);
                return;
            }

            toast.success("Welcome back! Signed in successfully.");
            router.push("/");
            router.refresh();
        } catch (err: unknown) {
            console.error("Sign in error:", err);
            const msg =
                err instanceof Error
                    ? err.message
                    : "Something went wrong during sign in. Please try again.";
            showError(msg);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F7F1E3] relative overflow-hidden flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C99A4B] via-[#064B38] to-[#C83D2B]" />

            {/* Background subtle motif texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #064B38 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Back link */}
            <div className="relative w-full max-w-md mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#064B38] hover:text-[#C83D2B] transition-colors"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to Milanmela
                </Link>
            </div>

            {/* Card Container */}
            <Card className="relative w-full max-w-md bg-white/90 backdrop-blur-md border border-[#C99A4B]/30 shadow-2xl rounded-3xl p-6 sm:p-8">
                <CardHeader className="p-0 pb-6 text-center">
                    {/* Header decorative tag */}
                    <div className="inline-flex items-center justify-center gap-2 mx-auto mb-2 text-[#C99A4B]">
                        <span className="text-xs">✦</span>
                        <span className="text-[11px] font-bold tracking-widest uppercase">
                            Milanmela Portal
                        </span>
                        <span className="text-xs">✦</span>
                    </div>

                    <CardTitle
                        className="text-2xl sm:text-3xl font-bold text-[#064B38]"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-[#65472D] mt-1">
                        Sign in to access and manage cultural festival events
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-5">
                    {/* Error Banner */}
                    {errorMessage && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#C83D2B]/10 border border-[#C83D2B]/20 text-[#C83D2B] text-xs">
                            <AlertCircle className="size-4 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{errorMessage}</span>
                        </div>
                    )}

                    {/* Google Sign In Button */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                        className="w-full h-11 rounded-xl border border-[#C99A4B]/35 bg-white hover:bg-[#F7F1E3]/60 text-[#064B38] font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                        <GoogleIcon />
                        {isGoogleLoading ? "Connecting with Google..." : "Login with Google"}
                    </Button>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-3">
                        <div className="w-full border-t border-[#C99A4B]/20" />
                        <span className="absolute bg-white px-3 text-[11px] uppercase tracking-wider text-[#65472D]/70 font-semibold">
                            Or continue with email
                        </span>
                    </div>

                    {/* Email & Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-xs font-semibold text-[#064B38]"
                            >
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#65472D]/60 pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/40 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus-visible:ring-[#064B38]/30 focus-visible:border-[#064B38]"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-xs font-semibold text-[#064B38]"
                                >
                                    Password
                                </Label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#65472D]/60 pointer-events-none" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-11 rounded-xl border border-[#C99A4B]/35 bg-[#F7F1E3]/40 text-sm text-[#064B38] placeholder:text-[#65472D]/50 focus-visible:ring-[#064B38]/30 focus-visible:border-[#064B38]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#65472D]/60 hover:text-[#064B38] transition-colors p-0.5"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full h-11 mt-2 rounded-xl bg-[#064B38] hover:bg-[#064B38]/90 text-[#F7F1E3] font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="p-0 pt-6 mt-6 border-t border-[#C99A4B]/20 flex flex-col gap-2 text-center">
                    <p className="text-xs text-[#65472D]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sing-up"
                            className="font-bold text-[#C83D2B] hover:text-[#064B38] transition-colors underline-offset-4 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                    <p className="text-[11px] text-[#65472D]/70 flex items-center justify-center gap-1">
                        <Sparkles className="size-3 text-[#C99A4B]" />
                        Celebrate Bengali culture with Milanmela
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}