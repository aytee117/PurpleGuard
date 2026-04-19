import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#000033] via-slate-900 to-[#000033] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6633cc] to-indigo-600 flex items-center justify-center">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
          </div>
        </div>

        <p className="text-[#6633cc] font-semibold text-lg mb-2 tracking-wide uppercase">
          404 — Page Not Found
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Threat Not Detected
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Our SOC analysts
          are on it — but in the meantime, let us redirect you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button size="lg" className="bg-[#6633cc] hover:bg-[#5522bb] text-white px-8">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 px-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              View Services
            </Button>
          </Link>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-slate-500 text-sm mb-4">Quick links</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { label: "PurpleVAPT", href: "/services/purple-x/purplevapt" },
              { label: "PurpleSOC", href: "/services/purple-x/purplesoc" },
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "mailto:hello@purpleguard.io" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
