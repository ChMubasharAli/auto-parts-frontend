import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Wrench, Menu, X, Phone, MapPin, Clock } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/booking", label: "Book Appointment" },
  { path: "/auto-parts", label: "Auto Parts" },
];

export const PublicLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] py-2">
        <div className="container-custom flex flex-col items-center justify-between gap-1 sm:flex-row">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (555) 123-4567
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              123 West Main St, Your City
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            Mon-Fri: 7:00 AM - 5:00 PM
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
        <div className="container-custom flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <Wrench className="h-4 w-4 text-[var(--color-primary-foreground)]" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              West Main Tire
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-2 rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-muted)]"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]">
            <nav className="container-custom flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-center"
              >
                Admin Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/30">
        <div className="container-custom py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                  <Wrench className="h-4 w-4 text-[var(--color-primary-foreground)]" />
                </div>
                <span className="text-lg font-bold">West Main Tire</span>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Professional auto repair and maintenance services you can trust.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                <li>
                  <Link to="/" className="hover:text-[var(--color-foreground)]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/booking"
                    className="hover:text-[var(--color-foreground)]"
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auto-parts"
                    className="hover:text-[var(--color-foreground)]"
                  >
                    Auto Parts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                <li>Oil Change</li>
                <li>Tire Rotation</li>
                <li>Mount & Balance</li>
                <li>Estimates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  123 West Main St
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Mon-Fri: 7AM - 5PM
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-muted-foreground)]">
            © 2026 West Main Tire & Lube. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
