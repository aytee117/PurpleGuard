"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CALENDLY_LINK } from "@/lib/services-data";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Shield,
  Search,
  Eye,
  AlertTriangle,
  Cpu,
  Server,
  Lock,
  FileCheck,
  Cloud,
  Globe,
  BookOpen,
  Calculator,
  ClipboardCheck,
} from "lucide-react";

const purpleXServices = [
  { name: "PurpleVAPT", tagline: "Vulnerability Assessment & Pen Testing", href: "/services/purple-x/purplevapt", icon: Search, color: "from-purple-500 to-indigo-600" },
  { name: "PurpleSOC", tagline: "24/7 Managed SOC & Incident Response", href: "/services/purple-x/purplesoc", icon: Eye, color: "from-blue-500 to-cyan-600" },
  { name: "PurpleSentinel", tagline: "Managed Detection & Response (MDR)", href: "/services/purple-x/purplesentinel", icon: Shield, color: "from-violet-500 to-purple-600" },
  { name: "PurpleSentry", tagline: "Threat Intelligence & Digital Risk", href: "/services/purple-x/purplesentry", icon: AlertTriangle, color: "from-orange-500 to-red-600" },
];

const managedXServices = [
  { name: "Managed Endpoint", tagline: "Endpoint management & patching", href: "/services/managed-x/managed-endpoint", icon: Cpu, color: "from-blue-500 to-cyan-600" },
  { name: "Managed EDR", tagline: "Endpoint threat detection & response", href: "/services/managed-x/managed-edr", icon: Shield, color: "from-purple-500 to-indigo-600" },
  { name: "Managed Firewall", tagline: "Perimeter & network security", href: "/services/managed-x/managed-firewall", icon: Server, color: "from-emerald-500 to-teal-600" },
  { name: "Managed SASE / ZTNA", tagline: "Secure cloud-delivered access", href: "/services/managed-x/managed-sase-ztna", icon: Lock, color: "from-slate-600 to-slate-800" },
];

const solutions = [
  { name: "Compliance & Audit Readiness", href: "/solutions/compliance-audit-readiness", icon: FileCheck, color: "from-emerald-500 to-teal-600" },
  { name: "Ransomware Defense", href: "/solutions/ransomware-defense", icon: Shield, color: "from-red-500 to-orange-600" },
  { name: "Cloud & SaaS Security", href: "/solutions/cloud-saas-security", icon: Cloud, color: "from-blue-500 to-cyan-600" },
  { name: "External Attack Surface Management", href: "/solutions/external-attack-surface-management", icon: Globe, color: "from-purple-500 to-indigo-600" },
  { name: "Zero Trust & Secure Remote Access", href: "/solutions/zero-trust-secure-remote-access", icon: Lock, color: "from-slate-600 to-slate-800" },
];

const resourcesItems = [
  { name: "Blog", tagline: "Cybersecurity insights & news", href: "/blog", icon: BookOpen, color: "from-purple-500 to-indigo-600" },
  { name: "VAPT Calculator", tagline: "Estimate your penetration testing scope", href: "/services/purple-x/purplevapt/calculator", icon: Calculator, color: "from-emerald-500 to-teal-600" },
  { name: "SOC Sizing Tool", tagline: "Discover the right SOC model for you", href: "/services/purple-x/purplesoc/questionnaire", icon: ClipboardCheck, color: "from-blue-500 to-cyan-600" },
];

const navigationItems = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src="/logo.png" alt="PurpleGuard" width={160} height={48} priority className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">

            {/* Solutions — pure CSS hover via group */}
            <div className="group relative">
              <button className="inline-flex items-center gap-1 px-4 py-2 h-16 text-sm font-medium text-slate-700 group-hover:text-[#6633cc] transition-colors">
                Solutions
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel — hidden by default, visible on group hover */}
              <div className="absolute left-0 top-full pt-0 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="w-[360px] rounded-xl border border-slate-200 bg-white shadow-xl p-4 mt-0">
                  <div className="space-y-1">
                    {solutions.map((solution) => (
                      <Link key={solution.name} href={solution.href}>
                        <div className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${solution.color} flex items-center justify-center flex-shrink-0`}>
                            <solution.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 group-hover/item:text-[#6633cc] transition-colors text-sm">
                              {solution.name}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover/item:text-[#6633cc] transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <Link href="/solutions">
                      <Button variant="outline" size="sm" className="w-full border-[#6633cc]/30 text-[#6633cc] hover:bg-[#6633cc]/5">
                        View All Solutions
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Services — pure CSS hover via group */}
            <div className="group relative">
              <button className="inline-flex items-center gap-1 px-4 py-2 h-16 text-sm font-medium text-slate-700 group-hover:text-[#6633cc] transition-colors">
                Services
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-0 top-full z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="w-[620px] rounded-xl border border-slate-200 bg-white shadow-xl p-6">
                  <div className="grid grid-cols-2 gap-8">

                    {/* Purple X */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Purple X</h3>
                          <p className="text-xs text-slate-500">Cybersecurity Services</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {purpleXServices.map((service) => (
                          <Link key={service.name} href={service.href}>
                            <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                                <service.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-900 group-hover/item:text-[#6633cc] transition-colors text-sm">{service.name}</div>
                                <div className="text-xs text-slate-500 truncate">{service.tagline}</div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-slate-300 group-hover/item:text-[#6633cc] transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/services/purple-x">
                        <Button variant="outline" size="sm" className="w-full border-[#6633cc]/30 text-[#6633cc] hover:bg-[#6633cc]/5">
                          View All Purple X <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>

                    {/* Managed X */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                          <Server className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Managed X</h3>
                          <p className="text-xs text-slate-500">Managed Infrastructure</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {managedXServices.map((service) => (
                          <Link key={service.name} href={service.href}>
                            <div className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                                <service.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-900 group-hover/item:text-blue-600 transition-colors text-sm">{service.name}</div>
                                <div className="text-xs text-slate-500 truncate">{service.tagline}</div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-slate-300 group-hover/item:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/services/managed-x">
                        <Button variant="outline" size="sm" className="w-full border-blue-500/30 text-blue-600 hover:bg-blue-50">
                          View All Managed X <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Resources dropdown */}
            <div className="group relative">
              <button className="inline-flex items-center gap-1 px-4 py-2 h-16 text-sm font-medium text-slate-700 group-hover:text-[#6633cc] transition-colors">
                Resources
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-0 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="w-[340px] rounded-xl border border-slate-200 bg-white shadow-xl p-4 mt-0">
                  <div className="space-y-1">
                    {resourcesItems.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-slate-900 group-hover/item:text-[#6633cc] transition-colors text-sm">{item.name}</span>
                            <div className="text-xs text-slate-500 truncate">{item.tagline}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover/item:text-[#6633cc] transition-colors flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navigationItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button variant="ghost" className="text-slate-700 hover:text-[#6633cc] font-medium">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center space-x-4">
            <Link href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <Button>Book Discovery Call</Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-2 mt-8">
                  <Link href="/solutions" onClick={() => setMobileOpen(false)}>
                    <div className="font-semibold text-slate-900 px-3 py-2 text-sm cursor-pointer hover:text-[#6633cc]">Solutions</div>
                  </Link>
                  {solutions.map((s) => (
                    <Link key={s.name} href={s.href} onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start pl-8 text-slate-700 hover:text-[#6633cc] font-medium text-left">
                        {s.name}
                      </Button>
                    </Link>
                  ))}

                  <div className="border-b border-slate-200 my-2" />

                  <Link href="/services" onClick={() => setMobileOpen(false)}>
                    <div className="font-semibold text-slate-900 px-3 py-2 text-sm cursor-pointer hover:text-[#6633cc]">Services</div>
                  </Link>
                  <Link href="/services/purple-x" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start pl-8 text-slate-700 hover:text-[#6633cc] font-medium">Purple X</Button>
                  </Link>
                  <Link href="/services/managed-x" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start pl-8 text-slate-700 hover:text-[#6633cc] font-medium">Managed X</Button>
                  </Link>

                  <div className="border-b border-slate-200 my-2" />

                  <div className="font-semibold text-slate-900 px-3 py-2 text-sm">Resources</div>
                  {resourcesItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start pl-8 text-slate-700 hover:text-[#6633cc] font-medium text-left">
                        {item.name}
                      </Button>
                    </Link>
                  ))}

                  <div className="border-b border-slate-200 my-2" />

                  {navigationItems.map((item) => (
                    <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-slate-700 hover:text-[#6633cc] font-medium">
                        {item.label}
                      </Button>
                    </Link>
                  ))}

                  <div className="border-b border-slate-200 my-2" />

                  <Link href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">Book Discovery Call</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}
