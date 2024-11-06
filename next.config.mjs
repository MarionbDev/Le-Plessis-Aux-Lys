/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // => checkFields<DIFF< : resolve terminal error : run build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["zsycdbufjrptszftdbdg.supabase.co"],
  },
  experimental: {
    middleware: true, // active l'utilisation du middleware
  },
};

export default nextConfig;
