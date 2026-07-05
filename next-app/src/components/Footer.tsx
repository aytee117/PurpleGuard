import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0a12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* About */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="mb-6 cursor-pointer">
                <Image
                  src="/logo.png"
                  alt="PurpleGuard"
                  width={160}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
                <p className="text-sm text-purple-300 mt-2 font-medium">
                  Smarter Security. Stronger Defense.
                </p>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              PurpleGuard is a managed security services provider (MSSP) focused on SMEs and mid-market organizations. We deliver subscription-based, compliance-ready cybersecurity with 24/7 SOC monitoring and expert support.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>CAI | DXB</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 text-purple-400" />
                <a href="tel:+971585159666" className="hover:text-white transition-colors">+971 58 515 9666</a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 text-purple-400" />
                <a href="mailto:hello@purpleguard.io" className="hover:text-white transition-colors">hello@purpleguard.io</a>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/purpleguard" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Purple X */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 mb-6">Purple X</h4>
            <ul className="space-y-3">
              {[
                { label: "PurpleVAPT", href: "/services/purple-x/purplevapt" },
                { label: "PurpleSOC", href: "/services/purple-x/purplesoc" },
                { label: "PurpleSentinel", href: "/services/purple-x/purplesentinel" },
                { label: "PurpleSentry", href: "/services/purple-x/purplesentry" },
                { label: "PurpleStrike", href: "/services/purple-x/purplestrike" },
                { label: "PurpleConfig", href: "/services/purple-x/purpleconfig" },
                { label: "PurpleReveal", href: "/services/purple-x/purplereveal" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Managed X */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 mb-6">Managed X</h4>
            <ul className="space-y-3">
              {[
                { label: "Managed Endpoint", href: "/services/managed-x/managed-endpoint" },
                { label: "Managed EDR", href: "/services/managed-x/managed-edr" },
                { label: "Managed Identity", href: "/services/managed-x/managed-identity" },
                { label: "Managed SASE", href: "/services/managed-x/managed-sase-ztna" },
                { label: "Managed Firewall", href: "/services/managed-x/managed-firewall" },
                { label: "Managed WAF", href: "/services/managed-x/managed-waf" },
                { label: "Managed Email", href: "/services/managed-x/managed-email-security" },
                { label: "Managed Backup", href: "/services/managed-x/managed-backup-bcdr" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 mb-6">Company</h4>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Services", href: "/services" },
                { label: "Solutions", href: "/solutions" },
                { label: "Pricing", href: "/pricing" },
                { label: "Resources", href: "/blog" },
                { label: "Contact", href: "/booking" },
                { label: "PurpleVAPT Calculator", href: "/services/purple-x/purplevapt/calculator" },
                { label: "SOC Sizing Tool", href: "/services/purple-x/purplesoc/questionnaire" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 mb-4">Compliance & Trust</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">© {currentYear} PurpleGuard. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
            <span>CIS | NIST | ISO Aligned</span>
            <span>MITRE ATT&CK Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
