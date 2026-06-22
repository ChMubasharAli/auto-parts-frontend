import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  Wrench,
  Phone,
  MapPin,
  Clock,
  Package,
  Shield,
  Truck,
  ShoppingCart,
  Hammer,
  Paintbrush,
  Fan,
  Droplets,
  Zap,
  Settings,
  ArrowRight,
  Sparkles,
  Car,
  Scissors,
  Layers,
} from "lucide-react";

const products = [
  {
    icon: Wrench,
    tag: "Hand Tools",
    name: "Professional Wrenches & Sockets",
    description:
      "Heavy-duty wall-mounted wrench sets, precision sockets, and mechanics hand tools for workshop organization.",
    image: "/images/Dee-Jay-Internal-2.webp",
  },
  {
    icon: Droplets,
    tag: "Maintenance",
    name: "CRC Automotive Chemicals",
    description:
      "Premium performance sprays including Mass Air Flow sensor cleaners, Brakleen brake parts cleaners, and specialty engine fluids.",
    image: "/images/IMG-2676.webp",
  },
  {
    icon: Shield,
    tag: "Engine Oil",
    name: "Shell Rotella T4 Engine Oil",
    description:
      "Triple Protection SAE 15W-40 heavy duty diesel engine oil. Formulated for superior wear protection and engine cleanliness.",
    image: "/images/IMG-5544.webp",
  },
  {
    icon: Settings,
    tag: "Power Tools",
    name: "ECHO Outdoor Chainsaws",
    description:
      "Professional-grade gas chainsaws, operators manuals, and replacement bar & chain equipment for commercial cutting.",
    image: "/images/IMG-6942.webp",
  },
  {
    icon: Scissors,
    tag: "Trimmers",
    name: "ECHO Gas String Trimmers",
    description:
      "High-torque outdoor weed eaters, shaft trimmers, and commercial lawn maintenance equipment with easy-start technology.",
    image: "/images/IMG-6944.webp",
  },
  {
    icon: Hammer,
    tag: "Hardware",
    name: "Bulk Fasteners & Retail Tool Kits",
    description:
      "Comprehensive retail display of electrical repair kits, fuses, screwdrivers, and specialized automotive fasteners.",
    image: "/images/IMG-6945.webp",
  },
  {
    icon: Layers,
    tag: "Plumbing",
    name: "Plumb Pak Tubular Drainage",
    description:
      "Professional sink & faucet tubular drainage kits, slip joint washers, P-traps, and flexible waste connections.",
    image: "/images/IMG-6948.webp",
  },
  {
    icon: Package,
    tag: "Branded Gear",
    name: "Dee Jay Auto Parts Buckets",
    description:
      "Custom branded heavy-duty hardware pails and utility buckets for garage organization and liquid transport.",
    image: "/images/IMG-6950.webp",
  },
];

const specialServices = [
  {
    icon: Shield,
    tag: "Trust",
    title: "Parts Warranty",
    description: "All parts come with a minimum 1-year warranty.",
  },
  {
    icon: Truck,
    tag: "Speed",
    title: "Special Orders",
    description: "Can't find it? We can order any part within 24-48 hours.",
  },
  {
    icon: ShoppingCart,
    tag: "Value",
    title: "Bulk Pricing",
    description: "Discounted rates for mechanics and fleet operators.",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "Tires & Wheels": <Car className="h-6 w-6" />,
  "Auto Parts": <Wrench className="h-6 w-6" />,
  "Fluids & Oils": <Droplets className="h-6 w-6" />,
  Batteries: <Zap className="h-6 w-6" />,
  Accessories: <Fan className="h-6 w-6" />,
  "Paints & Supplies": <Paintbrush className="h-6 w-6" />,
  Tools: <Hammer className="h-6 w-6" />,
  Hardware: <Settings className="h-6 w-6" />,
};

export const AutoPartsPage = () => {
  return (
    <div className="overflow-hidden">
      {/* ==========================================
          HERO SECTION — Split: Text Left + Single Image Right
          ========================================== */}
      <section className="relative w-full bg-surface-white py-16 lg:py-24 px-6 md:px-12 flex items-center">
        <div className="container-custom w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Quality Parts & Hardware
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-text-heading uppercase tracking-tight leading-[1.05] mb-5">
                Auto Parts <span className="text-gradient">Store</span>
              </h1>

              <p className="text-base md:text-lg text-text-body font-light leading-relaxed max-w-lg">
                Your one-stop shop for automotive parts, tools, and hardware. We
                stock everything you need to keep your vehicle running and your
                projects moving.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a href="tel:5551234567" className="w-full sm:w-fit">
                <Button
                  size="lg"
                  variant="gradient"
                  className="gap-2 w-full sm:w-auto justify-center"
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <Link to="/booking" className="w-full sm:w-fit">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto justify-center gap-2 border-2 border-border-default text-text-heading hover:border-brand-orange hover:bg-surface-warm"
                >
                  Book Service
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Single Large Image */}
          <div className="lg:col-span-6">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="/images/IMG-6947.webp"
                alt="Auto Parts Store"
                className="w-full h-[450px] lg:h-[550px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PRODUCTS GRID — Clean Cards with Images
          ========================================== */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border-light pb-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Product Catalog
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1]">
                Our <span className="text-gradient">Products</span>
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-xs font-light leading-relaxed border-l border-border-default pl-4">
              Wide selection of automotive parts, tools, and hardware supplies.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <div
                key={product.name}
                className="group relative bg-white border-2 border-border-default rounded-3xl overflow-hidden transition-all duration-500 hover:border-brand-orange hover:shadow-lg flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-[10px] font-black text-white tracking-[0.2em] uppercase bg-brand-orange px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Icon & Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-surface-warm flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      {iconMap[product.name] || <Package className="h-5 w-5" />}
                    </div>
                    <span className="font-heading font-black text-2xl text-text-heading/10 group-hover:text-brand-orange/20 transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-base text-text-heading uppercase tracking-wide mb-2 group-hover:text-brand-orange transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-text-body font-medium leading-relaxed flex-1">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SPECIAL SERVICES — Feature Cards
          ========================================== */}
      <section className="py-24 lg:py-32 bg-surface-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                Added Value
              </span>
              <span className="w-8 h-[2px] bg-brand-orange" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
              Special <span className="text-gradient">Services</span>
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              Extra benefits that make shopping with us the best choice for your
              vehicle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white border-2 border-border-default p-8 transition-all duration-500 hover:border-brand-orange hover:shadow-lg flex flex-col overflow-hidden rounded-[28px_12px]"
                >
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {/* Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-heading font-black text-3xl text-text-heading/10 group-hover:text-brand-orange/20 transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <span className="inline-block text-[10px] font-black text-brand-orange tracking-[0.2em] uppercase bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                      {service.tag}
                    </span>

                    <h3 className="font-heading font-black text-lg text-text-heading uppercase tracking-wide group-hover:text-brand-orange transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-sm text-text-body font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT & STORE INFO
          ========================================== */}
      <section className="py-24 lg:py-32 bg-surface-warm">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border-light pb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1]">
                Visit Our <span className="text-gradient">Store</span>
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-xs font-light leading-relaxed border-l border-border-default pl-4">
              Stop by the shop or give us a call. We are here to help you find
              exactly what you need.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* LEFT: Contact Info */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 West Main Street\nYour City, ST 12345",
                },
                { icon: Phone, label: "Phone", value: "(555) 123-4567" },
                {
                  icon: Clock,
                  label: "Store Hours",
                  value:
                    "Monday - Friday: 7:00 AM - 5:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: Closed",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-border-default hover:border-brand-orange/30 hover:shadow-md transition-all duration-300"
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

            {/* RIGHT: CTA Card */}
            <div className="lg:col-span-5">
              <div className="h-full bg-brand-navy rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-lg mb-6">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wide mb-3">
                    Need a Part?
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-8">
                    Call us or stop by. Our team will help you find exactly what
                    you need.
                  </p>
                </div>

                <div className="relative z-10 space-y-3">
                  <a href="tel:5551234567" className="block">
                    <Button
                      size="lg"
                      variant="gradient"
                      className="w-full gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      Call Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                  <Link to="/booking" className="block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full gap-2 border-2 border-white/25 text-white hover:bg-white/10"
                    >
                      Book Service
                    </Button>
                  </Link>
                </div>

                {/* Decorative Ring */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA BANNER — Installation Service
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="bg-brand-navy rounded-[36px] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Installation Service
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-[1.1] mb-3">
                Need Installation Too?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Buy your parts here and get them installed by our certified
                technicians.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link to="/booking">
                <Button size="lg" variant="gradient" className="gap-2">
                  Book Installation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Decorative Ring */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 border-2 border-dashed border-white/10 rounded-full animate-[spin_50s_linear_infinite] pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
