import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
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
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { value: "28+", label: "Years Experience", icon: Clock },
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "99%", label: "Satisfaction Rate", icon: Star },
  { value: "15K+", label: "Services Done", icon: TrendingUp },
];

const features = [
  {
    icon: Shield,
    title: "ASE Certified Technicians",
    description:
      "Our master technicians hold the highest industry certifications with decades of combined experience working on all makes and models.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Clock,
    title: "Same-Day Service Guarantee",
    description:
      "Most repairs and maintenance completed within hours, not days. Get back on the road fast with our efficient service bay.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Award,
    title: "Lifetime Warranty Protection",
    description:
      "We stand behind every repair with our comprehensive lifetime warranty on both parts and labor. Your peace of mind is guaranteed.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
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
    <div className="overflow-hidden">
      {/* ==========================================
          HERO SECTION — Reference Style 4-Image Collage
          ========================================== */}
      <section className="relative w-full bg-surface-white py-16 lg:py-24 px-6 md:px-12 flex items-center">
        <div className="container-custom w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Trusted Auto Care Since 1995
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-text-heading uppercase tracking-tight leading-[1.05] mb-5">
                Expert Auto Care You Can{" "}
                <span className="text-gradient">Trust</span>
              </h1>

              <p className="text-base md:text-lg text-text-body font-light leading-relaxed max-w-lg">
                Professional repair and maintenance services that keep your
                vehicle running at peak performance. Family-owned,
                community-trusted.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/booking" className="w-full sm:w-fit">
                <Button
                  size="lg"
                  variant="gradient"
                  className="gap-2 w-full sm:w-auto justify-center"
                >
                  <Clock className="h-5 w-5" />
                  Book Appointment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auto-parts" className="w-full sm:w-fit">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto justify-center gap-2 border-2 border-border-default text-text-heading hover:border-brand-orange hover:bg-surface-warm"
                >
                  Browse Parts
                </Button>
              </Link>
            </div>
          </div>

          {/* MIDDLE: Empty Space — 1 Column Gap ✅ */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* RIGHT COLUMN: 4-Image Collage (Reference Style) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative items-center mx-auto lg:mx-0 w-full ">
            {/* Top Left: Rounded Rectangle */}
            <div className="col-span-6 aspect-[4/3] rounded-[32px] overflow-hidden bg-surface-gray border border-border-light shadow-md">
              <img
                src="/images/Dee-Jay-Auto-External.webp"
                alt="Auto Service"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Right: Rounded Rectangle */}
            <div className="col-span-6 aspect-[4/3] rounded-[32px] overflow-hidden bg-surface-gray border border-border-light shadow-md">
              <img
                src="/images/IMG-6941.webp"
                alt="Tire Service"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Left: Circle with Ring */}
            <div className="col-span-5 relative flex justify-center items-center">
              <div className="absolute w-[110%] h-[110%] border-2 border-dashed border-brand-orange/30 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="w-full aspect-square rounded-full overflow-hidden bg-surface-gray relative border border-border-light z-10 shadow-md">
                <img
                  src="/images/Dee-Jay-Internal-2.webp"
                  alt="Mechanic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Right: Large Rounded */}
            <div className="col-span-7 aspect-[4/3] rounded-[40px] overflow-hidden bg-surface-gray border border-border-light shadow-md">
              <img
                src="/images/IMG-6942.webp"
                alt="Car Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          STATS STRIP
          ========================================== */}
      <section className="py-8 bg-surface-warm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black text-text-heading leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          POPULAR SERVICES — Clean Cards (No Image, No Hover Button)
          ========================================== */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border-light pb-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Service Menu
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1]">
                Popular <span className="text-gradient">Services</span>
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-xs font-light leading-relaxed border-l border-border-default pl-4">
              Comprehensive auto repair and maintenance to keep your vehicle in
              top condition.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-3xl bg-surface-gray animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services
                ?.filter((s) => s.isActive)
                .slice(0, 4)
                .map((service, i) => (
                  <div
                    key={service.id}
                    className="group relative bg-white border-2 border-border-default p-7 transition-all duration-500 hover:border-brand-orange hover:shadow-lg flex flex-col overflow-hidden rounded-[28px_12px]"
                  >
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    {/* Icon & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-surface-warm flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm">
                        {iconMap[service.name] || (
                          <Wrench className="h-6 w-6" />
                        )}
                      </div>
                      <span className="font-heading font-black text-3xl text-text-heading/10 group-hover:text-brand-orange/20 transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 flex-1">
                      <span className="inline-block text-[10px] font-black text-brand-orange tracking-[0.2em] uppercase bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                        {service.category || "Service"}
                      </span>

                      <h3 className="font-heading font-black text-lg text-text-heading uppercase tracking-wide group-hover:text-brand-orange transition-colors duration-300">
                        {service.name}
                      </h3>

                      <p className="text-sm text-text-body font-medium leading-relaxed line-clamp-3">
                        {service.description ||
                          "Professional service by certified technicians with quality guarantee."}
                      </p>
                    </div>

                    {/* Footer — Price & Duration */}
                    <div className="mt-6 pt-5 border-t border-border-default group-hover:border-brand-orange/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold block mb-0.5">
                            Starting at
                          </span>
                          <span className="text-xl font-heading font-black text-brand-orange tracking-tight">
                            ${Number(service.price).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold uppercase tracking-wider">
                          <Clock className="h-3.5 w-3.5" />
                          {service.duration} min
                        </div>
                      </div>
                    </div>

                    {/* Hover Arrow (Subtle) */}
                    <div className="mt-4 flex items-center gap-1.5 text-brand-orange text-[10px] font-black uppercase tracking-widest transition-all duration-500 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0">
                      <span>View Details</span>
                      <ArrowRight size={12} strokeWidth={3} />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* View All Link */}
          <div className="mt-12 text-center">
            <Link to="/booking">
              <Button variant="outline" className="gap-2">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          WHY CHOOSE US — FIXED: Light Background, Dark Text
          ========================================== */}
      <section className="py-24 lg:py-32 bg-surface-white relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                Why Choose Us
              </span>
              <span className="w-8 h-[2px] bg-brand-orange" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
              The West Main <span className="text-gradient">Difference</span>
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              Three decades of excellence, thousands of satisfied customers, and
              an unwavering commitment to your safety.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white border-2 border-border-default rounded-3xl overflow-hidden hover:border-brand-orange hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading font-black text-lg text-text-heading uppercase tracking-wide mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-body font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS — Image + Content Split
          ========================================== */}
      <section className="py-24 lg:py-32 bg-surface-warm">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Large Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/Dee-Jay-Auto-External.webp"
                  alt="Satisfied Customer"
                  className="w-full h-[400px] lg:h-[560px] object-cover"
                />
              </div>

              {/* Floating Review Card */}
              {/* <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-border-default max-w-[280px]">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-brand-gold"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-text-body text-sm leading-relaxed mb-4">
                  "Best auto shop in town! Fixed my transmission in one day when
                  others quoted me a week."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                  <div>
                    <div className="font-bold text-sm text-text-heading">
                      John Davidson
                    </div>
                    <div className="text-xs text-text-muted">
                      Verified Customer
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-dashed border-brand-orange/20 rounded-full animate-[spin_40s_linear_infinite]" />
            </div>

            {/* Right: Content */}
            <div className="space-y-8 lg:pl-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-brand-orange" />
                  <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                    Testimonials
                  </span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
                  Trusted by Thousands of{" "}
                  <span className="text-gradient">Local Drivers</span>
                </h2>
                <p className="text-text-body text-lg leading-relaxed">
                  Don't just take our word for it. Here's what our community has
                  to say about their experience with us.
                </p>
              </div>

              {/* Review List */}
              <div className="space-y-5">
                {[
                  {
                    name: "Sarah Mitchell",
                    text: "Fast, honest, and fairly priced. They explained everything clearly and didn't try to upsell me on unnecessary repairs.",
                    rating: 5,
                  },
                  {
                    name: "Mike Torres",
                    text: "Been coming here for 10 years. The team treats every car like their own. Wouldn't trust anyone else with my vehicles.",
                    rating: 5,
                  },
                  {
                    name: "Lisa Chen",
                    text: "Emergency brake repair on a Saturday morning. They saved my weekend road trip! Forever grateful for their dedication.",
                    rating: 5,
                  },
                ].map((review, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border-default hover:border-brand-orange/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-orange/15 to-brand-gold/15 flex items-center justify-center text-brand-orange font-bold text-sm shrink-0">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-sm text-text-heading">
                          {review.name}
                        </span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-3 w-3 text-brand-gold"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-text-body leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/booking">
                <Button size="lg" variant="gradient" className="gap-2">
                  Explore Our Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT & LOCATION — Split with Image
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-brand-orange" />
                  <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                    Visit Us
                  </span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
                  Ready to Get Your{" "}
                  <span className="text-gradient">Vehicle Serviced ?</span>
                </h2>
                <p className="text-text-body leading-relaxed">
                  Drop by the shop or give us a call. Walk-ins are always
                  welcome, but appointments get priority service and guaranteed
                  time slots.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "123 West Main Street\nYour City, ST 12345",
                  },
                  { icon: Phone, label: "Phone", value: "(555) 123-4567" },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    value:
                      "Monday - Friday: 7:00 AM - 5:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: Closed",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 bg-surface-warm rounded-2xl border border-border-default hover:border-brand-orange/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 flex items-center justify-center text-brand-orange shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-text-muted uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-sm text-text-body font-medium whitespace-pre-line leading-relaxed">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="flex-1">
                  <Button size="lg" variant="gradient" className="w-full gap-2">
                    Book Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:5551234567" className="flex-1">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Location Image */}
            <div className="lg:col-span-7">
              <div className="h-full min-h-[400px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl relative group">
                <img
                  src="/images/West-Main-Open-Bay.webp"
                  alt="Our Location"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />

                {/* Location Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center shadow-xl">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-orange rotate-45" />
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 flex items-center justify-between shadow-lg">
                    <div>
                      <div className="font-bold text-text-heading">
                        West Main Tire & Lube
                      </div>
                      <div className="text-sm text-text-muted">
                        123 West Main Street, Your City
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="gradient" className="gap-1">
                        <MapPin className="h-4 w-4" />
                        Directions
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA — Full-Width Banner
          ========================================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070&auto=format&fit=crop"
            alt="Service Bay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-orange/20" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-[1.1]">
              Don't Wait Schedule Your{" "}
              <span className="text-gradient">Service Today</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              Preventive maintenance saves you money and keeps you safe on the
              road. Book your appointment in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button
                  size="lg"
                  variant="gradient"
                  className="gap-2 text-base px-10 w-full sm:w-auto justify-center"
                >
                  Schedule Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auto-parts">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 border-white/25 text-white hover:bg-white/10 text-base px-10 w-full sm:w-auto justify-center"
                >
                  Shop Parts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
