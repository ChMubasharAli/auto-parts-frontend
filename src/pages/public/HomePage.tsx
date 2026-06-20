import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Wrench,
  Shield,
  Clock,
  Award,
  ChevronRight,
  Car,
  Droplets,
  RotateCcw,
  Calculator,
  MapPin,
  Phone,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Certified Technicians",
    description: "Our team is ASE certified with years of hands-on experience.",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description: "Most services completed same day with minimal wait times.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "We stand behind our work with a comprehensive warranty.",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "Oil Change": <Droplets className="h-6 w-6" />,
  "Tire Rotation": <RotateCcw className="h-6 w-6" />,
  "Mount & Balance": <Car className="h-6 w-6" />,
  Estimates: <Calculator className="h-6 w-6" />,
};

export const HomePage = () => {
  const { data: services, isLoading } = useServices();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <div className="container-custom relative z-10 py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur mb-6">
              <Wrench className="h-4 w-4" />
              Trusted Auto Care Since 1995
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-6">
              West Main Tire & Lube
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Professional auto repair and maintenance services. From oil
              changes to tire services, we keep your vehicle running smoothly.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-[var(--color-primary)] hover:bg-white/90"
                >
                  Book Appointment
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auto-parts">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Browse Auto Parts
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 lg:opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              We offer a comprehensive range of auto repair and maintenance
              services to keep your vehicle in top condition.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-muted)]"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services
                ?.filter((s) => s.isActive)
                .map((service) => (
                  <Card
                    key={service.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-muted)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-primary-foreground)] transition-colors">
                        {iconMap[service.name] || (
                          <Wrench className="h-6 w-6" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                        {service.duration} minutes
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">
                          ${Number(service.price).toFixed(2)}
                        </span>
                        <Link to="/booking">
                          <Button size="sm" variant="ghost" className="gap-1">
                            Book <ChevronRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-[var(--color-muted)]/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Why Choose Us
            </h2>
            <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
              We are committed to providing the best service experience for our
              customers.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Business Hours */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Visit Us
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
                    <p className="font-medium">Business Hours</p>
                    <div className="text-sm text-[var(--color-muted-foreground)]">
                      <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                      <p>Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted)]/50 p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Book?</h3>
              <p className="text-[var(--color-muted-foreground)] mb-6">
                Schedule your appointment online in just a few clicks. No
                account required.
              </p>
              <Link to="/booking">
                <Button size="lg" className="gap-2">
                  Book Appointment
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
