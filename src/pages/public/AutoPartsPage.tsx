import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  Wrench,
  ShoppingCart,
  Truck,
  Phone,
  MapPin,
  Clock,
  Package,
  Shield,
  ChevronRight,
  Hammer,
  Paintbrush,
  Fan,
  Droplets,
  Zap,
  Settings,
} from "lucide-react";

const products = [
  {
    icon: Package,
    name: "Tires & Wheels",
    description:
      "All sizes and brands available. Mounting and balancing included.",
  },
  {
    icon: Wrench,
    name: "Auto Parts",
    description: "Brake pads, filters, belts, hoses, and more.",
  },
  {
    icon: Droplets,
    name: "Fluids & Oils",
    description: "Motor oil, coolant, transmission fluid, and grease.",
  },
  {
    icon: Zap,
    name: "Batteries",
    description: "Car and truck batteries with installation service.",
  },
  {
    icon: Fan,
    name: "Accessories",
    description: "Air fresheners, floor mats, seat covers, and gadgets.",
  },
  {
    icon: Paintbrush,
    name: "Paints & Supplies",
    description: "Spray paints, touch-up pens, and body repair kits.",
  },
  {
    icon: Hammer,
    name: "Tools",
    description: "Hand tools, power tools, and specialty automotive tools.",
  },
  {
    icon: Settings,
    name: "Hardware",
    description: "Bolts, nuts, screws, and fasteners for all makes.",
  },
];

const specialServices = [
  {
    icon: Shield,
    title: "Parts Warranty",
    description: "All parts come with a minimum 1-year warranty.",
  },
  {
    icon: Truck,
    title: "Special Orders",
    description: "Can't find it? We can order any part within 24-48 hours.",
  },
  {
    icon: ShoppingCart,
    title: "Bulk Pricing",
    description: "Discounted rates for mechanics and fleet operators.",
  },
];

export const AutoPartsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <div className="container-custom py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur mb-6">
              <ShoppingCart className="h-4 w-4" />
              Quality Parts & Hardware
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">
              Dee Jay Auto Parts & Hardware
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Your one-stop shop for automotive parts, tools, and hardware. We
              stock everything you need to keep your vehicle running and your
              projects moving.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="tel:5551234567">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-[var(--color-primary)] hover:bg-white/90"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
              <Link to="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Book Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Products
            </h2>
            <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              Wide selection of automotive parts, tools, and hardware supplies.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card
                  key={product.name}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-muted)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-primary-foreground)] transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16 lg:py-24 bg-[var(--color-muted)]/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Special Services
            </h2>
            <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              We go beyond just selling parts. Here is what sets us apart.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {specialServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact / Location */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Visit Our Store
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-muted)]">
                    <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      123 West Main Street
                      <br />
                      Your City, ST 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-muted)]">
                    <Phone className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-muted)]">
                    <Clock className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-medium">Store Hours</p>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                      <p>Saturday: 8:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted)]/50 p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Need a Part?</h3>
              <p className="text-[var(--color-muted-foreground)] mb-6">
                Call us or stop by. Our team will help you find exactly what you
                need.
              </p>
              <a href="tel:5551234567">
                <Button size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--color-muted)]/30 py-12">
        <div className="container-custom">
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Need Installation Too?
              </h2>
              <p className="text-white/80">
                Buy your parts here and get them installed by our certified
                technicians.
              </p>
            </div>
            <Link to="/booking">
              <Button
                size="lg"
                className="gap-2 bg-white text-[var(--color-primary)] hover:bg-white/90"
              >
                Book Installation
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
