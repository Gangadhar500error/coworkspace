"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Include cookies for session-based auth
        body: JSON.stringify({
          user_name: email, // API expects 'user_name' field
          password,
          rememberme,
          isajax: 1, // Required for JSON response from LoginController
        }),
      });

      const data = await response.json();

      // Handle error response format: {error: ['message']} or {error: {user_name: 'message'}}
      if (data.error) {
        const errorMessage = Array.isArray(data.error) 
          ? data.error[0] 
          : data.error.user_name || data.error || "Login failed";
        throw new Error(errorMessage);
      }

      // Handle success response format: {success: {customer: 'Login success'}}
      if (data.success && data.success.customer) {
        // Session-based auth - cookies are automatically set
        // Store success status
        localStorage.setItem("login_success", "true");
        localStorage.setItem("is_authenticated", "true");

        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Decorative SVGs */}
      <svg
        className="absolute left-0 top-0 w-64 h-64 opacity-20"
        fill="none"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="200" fill="#a5b4fc" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-64 h-64 opacity-20"
        fill="none"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="200" fill="#fbcfe8" />
      </svg>

      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/40 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <Image
              src="/assets/coworkspace.png"
              width={160}
              height={48}
              alt="CoworkSpace Logo"
              className="h-12 w-auto"
            />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-4 text-center">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error!</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="user_name"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberme}
                  onChange={(e) => setRememberme(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-50 transition">
            Sign in with Google
          </button>
        </div>

        <div className="text-xs text-gray-400 text-center mt-6">
          ©2025 CoworkSpace, Inc. All Rights Reserved.
          <br />
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
}
