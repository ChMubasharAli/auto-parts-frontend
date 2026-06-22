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
  { path: "/", label: "Home" },
  { path: "/booking", label: "Book Appointment" },
  { path: "/auto-parts", label: "Auto Parts" },
];

export const PublicLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-surface-white">
      {/* ==========================================
          TOP BAR — Matching Brand Colors
          ========================================== */}
      <div className="hidden sm:block bg-brand-navy text-white/90 py-2">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-orange" />
              (555) 123-4567
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />
              123 West Main St, Your City
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Clock className="h-3.5 w-3.5 text-brand-orange" />
              Mon-Fri: 7:00 AM - 5:00 PM | Sat: 8:00 AM - 2:00 PM
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-3 w-3 text-brand-gold"
                  fill="currentColor"
                />
              ))}
              <span className="text-xs font-bold text-white ml-1">4.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          HEADER — Sticky with Blur Effect
          ========================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border-default"
            : "bg-white border-b border-border-light"
        }`}
      >
        <div className="container-custom flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Wrench className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div>
              <span className="font-heading font-black text-base lg:text-lg text-text-heading uppercase tracking-tight leading-none block">
                West Main
              </span>
              <span className="text-[10px] lg:text-xs text-brand-orange font-black uppercase tracking-[0.2em]">
                Tire & Lube
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
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
            <div className="w-px h-6 bg-border-default mx-2" />
            <Link
              to="/admin/login"
              className="text-sm font-bold uppercase tracking-wider text-text-muted hover:text-brand-orange transition-colors px-3 py-2"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href="tel:5551234567">
              <Button size="sm" variant="gradient" className="gap-1.5">
                <Phone className="h-4 w-4" />
                <span className="hidden xs:inline">Call</span>
              </Button>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl border-2 border-border-default flex items-center justify-center text-text-heading hover:border-brand-orange hover:text-brand-orange transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ==========================================
            MOBILE NAVIGATION — Full Screen Overlay
            ========================================== */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-default">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-white" />
                </div>
                <span className="font-heading font-black text-sm text-text-heading uppercase">
                  Menu
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center hover:border-brand-orange transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="p-4 space-y-2">
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

              <div className="my-4 border-t border-border-default" />

              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-surface-warm text-text-muted font-bold uppercase tracking-wider text-sm hover:bg-surface-gray transition-all"
              >
                <span>Admin Login</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>

            {/* Mobile Contact Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-default bg-surface-warm">
              <div className="space-y-2">
                <a
                  href="tel:5551234567"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border-default hover:border-brand-orange transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-text-muted uppercase tracking-wider">
                      Call Us
                    </div>
                    <div className="text-sm font-bold text-text-heading">
                      (555) 123-4567
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
                      Mon-Fri: 7AM-5PM | Sat: 8AM-2PM
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
          FOOTER — Matching Design System
          ========================================== */}
      <footer className="bg-brand-navy text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom py-16 lg:py-20 relative z-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand Column */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center shadow-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="font-heading font-black text-lg text-white uppercase tracking-tight leading-none block">
                    West Main
                  </span>
                  <span className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em]">
                    Tire & Lube
                  </span>
                </div>
              </Link>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Professional auto repair and maintenance services you can trust.
                Family-owned since 1995.
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-brand-gold"
                    fill="currentColor"
                  />
                ))}
                <span className="text-sm text-white/80 font-bold ml-2">
                  4.9 Rating
                </span>
              </div>
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
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider mb-5">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Address
                    </div>
                    <p className="text-sm text-white/80 font-medium">
                      123 West Main Street
                      <br />
                      Your City, ST 12345
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Phone
                    </div>
                    <a
                      href="tel:5551234567"
                      className="text-sm text-white/80 font-medium hover:text-brand-orange transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-0.5">
                      Hours
                    </div>
                    <p className="text-sm text-white/80 font-medium">
                      Mon-Fri: 7AM - 5PM
                      <br />
                      Sat: 8AM - 2PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40 text-center sm:text-left">
              © {new Date().getFullYear()} West Main Tire & Lube. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <a href="#" className="hover:text-white/80 transition-colors">
                Privacy Policy
              </a>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <a href="#" className="hover:text-white/80 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
