import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Wrench,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

const navLinks = [
  { path: "/", label: "Dee Jay Auto" },
  { path: "/booking", label: "Book Appointment" },
  { path: "/auto-parts", label: "WEST MAIN" },
];

// Page-specific content configuration
const pageConfig: Record<
  string,
  {
    topBar: {
      phone: string;
      address: string;
      hours: string;
    };
    footer: {
      brandName: string;
      tagline: string;
      description: string;
      address: string;
      phone: string;
      hours: string;
    };
  }
> = {
  "/": {
    topBar: {
      phone: "(859) 289-2208",
      address: "328 W Main St, Carlisle, KY 40311",
      hours: "Mon–Sat: 7:00 AM – 5:30 PM",
    },
    footer: {
      brandName: "Dee Jay Auto Parts",
      tagline: "& Hardware",
      description:
        "Your local one-stop shop since 1955. Auto parts, hardware, plumbing supplies, hydraulic hoses, Echo power equipment, and pet feed.",
      address: "328 W Main St\nCarlisle, KY 40311",
      phone: "(859) 289-2208",
      hours: "Mon–Sat: 7:00 AM – 5:30 PM\nSunday: Closed",
    },
  },
  "/auto-parts": {
    topBar: {
      phone: "(859) 405-4083",
      address: "346 W Main St, Carlisle, KY 40311",
      hours: "Mon–Fri: 8:00 AM – 5:00 PM",
    },
    footer: {
      brandName: "West Main",
      tagline: "Tire & Lube",
      description:
        "Full Service Auto Shop that handles basic maintenance and repairs, including exhaust work. Opened in June 2025 with a combined 25+ years of experience.",
      address: "346 W Main St\nCarlisle, KY 40311",
      phone: "(859) 405-4083",
      hours: "Mon–Fri: 8:00 AM – 5:00 PM\nSat–Sun: Closed",
    },
  },
};

// Default fallback config (Home page)
const defaultConfig = pageConfig["/"];

export const PublicLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track the last non-booking page config to preserve on booking page
  const [lastPageConfig, setLastPageConfig] = useState(defaultConfig);

  const isActive = (path: string) => location.pathname === path;

  // Update lastPageConfig when navigating to a non-booking page
  useEffect(() => {
    if (location.pathname !== "/booking" && pageConfig[location.pathname]) {
      setLastPageConfig(pageConfig[location.pathname]);
    }
  }, [location.pathname]);

  // Determine which config to use:
  // - If on a known page (home or auto-parts), use that page's config
  // - If on booking (or any other unknown page), use the last preserved config
  const currentConfig = pageConfig[location.pathname] || lastPageConfig;

  // Determine logo text based on current or last known page
  const getLogoText = () => {
    if (location.pathname === "/auto-parts") {
      return { main: "West Main", sub: "Tire & Lube" };
    }
    if (location.pathname === "/") {
      return { main: "Dee Jay", sub: "Auto Parts & Hardware" };
    }
    // For booking or any other page, use last known page's logo
    if (lastPageConfig.footer.brandName === "West Main") {
      return { main: "West Main", sub: "Tire & Lube" };
    }
    return { main: "Dee Jay", sub: "Auto Parts & Hardware" };
  };

  const logoText = getLogoText();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-surface-white">
      {/* ==========================================
          TOP BAR — Dynamic per page (preserved on booking)
          ========================================== */}
      <div className="hidden md:block bg-brand-navy text-white/90 py-2">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-orange" />
              {currentConfig.topBar.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />
              {currentConfig.topBar.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Clock className="h-3.5 w-3.5 text-brand-orange" />
              {currentConfig.topBar.hours}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          HEADER — Simple Sticky Navbar
          ========================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-border-light">
        <div className="container-custom flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div>
              <span className="font-heading font-black text-base lg:text-lg text-text-heading uppercase tracking-tight leading-none block">
                {logoText.main}
              </span>
              <span className="text-[10px] lg:text-xs text-brand-orange font-black uppercase tracking-[0.2em]">
                {logoText.sub}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-xl ${
                  isActive(link.path)
                    ? "text-white bg-brand-orange shadow-md shadow-orange/20"
                    : "text-text-heading hover:text-brand-orange hover:bg-surface-warm"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-brand-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA + Animated Menu Button */}
          <div className="flex items-center  md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 rounded-xl border-2 border-border-default flex items-center justify-center text-text-heading hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer overflow-hidden"
              aria-label="Toggle menu"
            >
              {/* Animated Hamburger / X Icon */}
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45"
                      : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "opacity-0 scale-0"
                      : "opacity-100 scale-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : "bottom-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ==========================================
            MOBILE SIDEBAR — Slides from right below header
            ========================================== */}
        <div
          className={`lg:hidden fixed right-0 z-40 h-[calc(100dvh-64px)] w-full transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Backdrop overlay */}

          {/* Sidebar Panel */}
          <div className="h-full bg-white shadow-2xl flex flex-col overflow-y-auto">
            {/* Menu Links */}
            <nav className="p-4 space-y-2 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all ${
                    isActive(link.path)
                      ? "bg-brand-orange text-white shadow-md"
                      : "bg-surface-warm text-text-heading hover:bg-surface-gray"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      isActive(link.path) ? "text-white" : "text-text-muted"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="p-4 border-t border-border-default bg-surface-warm">
              <div className="space-y-2">
                <a
                  href={`tel:${currentConfig.topBar.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border-default hover:border-brand-orange transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-text-muted uppercase tracking-wider">
                      Call Us
                    </div>
                    <div className="text-sm font-bold text-text-heading">
                      {currentConfig.topBar.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border-default">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-text-muted uppercase tracking-wider">
                      Hours
                    </div>
                    <div className="text-xs font-bold text-text-heading">
                      {currentConfig.topBar.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ==========================================
          FOOTER — Dynamic per page (preserved on booking)
          ========================================== */}
      <footer className="bg-brand-navy text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom py-16 lg:py-20 relative z-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-5 cursor-pointer">
                <div>
                  <span className="font-heading font-black text-lg text-white uppercase tracking-tight leading-none block">
                    {currentConfig.footer.brandName}
                  </span>
                  <span className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em]">
                    {currentConfig.footer.tagline}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
                {currentConfig.footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-brand-orange transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-brand-orange rounded-full group-hover:scale-150 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link to="/admin/login">
                <Button
                  size="sm"
                  variant="gradient"
                  className="gap-2 mt-4  justify-center cursor-pointer text-base px-8"
                >
                  Admin
                </Button>
              </Link>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider mb-5">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Address
                    </div>
                    <p className="text-sm text-white/80 font-medium whitespace-pre-line">
                      {currentConfig.footer.address}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Phone
                    </div>
                    <a
                      href={`tel:${currentConfig.footer.phone.replace(/\D/g, "")}`}
                      className="text-sm text-white/80 font-medium hover:text-brand-orange transition-colors"
                    >
                      {currentConfig.footer.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Hours
                    </div>
                    <p className="text-sm text-white/80 font-medium whitespace-pre-line">
                      {currentConfig.footer.hours}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-white/40 text-center sm:text-left">
              © {new Date().getFullYear()} {currentConfig.footer.brandName}{" "}
              {currentConfig.footer.tagline}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
