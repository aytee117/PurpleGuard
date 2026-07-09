/** @type {import('next').NextConfig} */
const nextConfig = {
  // Repo root has its own package-lock.json (legacy app), which makes Next.js
  // misdetect the workspace root - pin it explicitly so file tracing (below)
  // resolves paths relative to next-app/, not the repo root.
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // private-documents/ lives outside public/ so it's never statically served,
  // but that also means Vercel's file tracer won't bundle it automatically -
  // this route reads from disk at runtime, so it must be included explicitly.
  outputFileTracingIncludes: {
    "app/api/documents/download/route": ["./private-documents/**/*"],
  },
};

module.exports = nextConfig;
