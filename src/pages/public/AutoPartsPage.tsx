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
  Star,
  HeartHandshake,
  BadgeCheck,
  Navigation,
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
    <div className="overflow-hidden bg-surface-gray">
      {/* ==========================================
          HERO SECTION — Editorial Magazine Mesh Layout
          ========================================== */}
      <section className="relative w-full bg-[#0B0F19] pt-24 pb-32 lg:pt-32 lg:pb-48 px-4 md:px-8 overflow-hidden text-white">
        {/* Tech grid texture effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Content block grouped into single typographic vertical line */}
          <div className="lg:col-span-7 space-y-8 lg:pr-6">
            <div className="space-y-4">
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-text-white max-w-md uppercase tracking-tight leading-[1.05]">
                WEST MAIN <span className="text-gradient">TIRE & LUBE</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 border-t border-white/10 pt-8">
              <div className="sm:col-span-4 text-xs font-black uppercase tracking-widest text-brand-orange">
                Est. June 2025 // <br className="hidden sm:inline" /> 25+ Yrs
                Field Exp
              </div>
              <p className="sm:col-span-8 text-sm md:text-base text-white/70 font-light leading-relaxed">
                Full Service Auto Shop that handles basic maintenance and
                repairs, including exhaust work. Happy to serve the community of
                Carlisle and surrounding areas with reliable precision
                engineering.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-xl">
              <a href="tel:8594054083" className="w-full sm:flex-1">
                <Button
                  size="md"
                  variant="gradient"
                  className="w-full gap-3 justify-center cursor-pointer  font-black text-sm uppercase tracking-wider"
                >
                  <Phone className="h-4 w-4" />
                  (859) 405-4083
                </Button>
              </a>
              <Link to="/booking" className="w-full sm:flex-1">
                <Button
                  size="md"
                  variant="outline"
                  className="w-full justify-center gap-2 border border-white/20 text-white bg-white/5   transition-all duration-300 cursor-pointer   font-black text-sm uppercase tracking-wider"
                >
                  Book Service <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Abstract Dual Offset Frame Component (Breaks standard boxes completely) */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative w-full aspect-[4/5] max-w-[380px] mx-auto">
              {/* Back Accent geometric box outline */}
              <div className="absolute -inset-4 border border-brand-orange/30 rounded-2xl pointer-events-none transform -rotate-3" />

              {/* Main Graphic Frame */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-brand-navy shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10" />
                <img
                  src="/images/IMG-6947.webp"
                  alt="West Main Tire & Lube Shop"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Float Badge embedded inside canvas borders */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-brand-orange to-brand-gold text-brand-navy px-6 py-4 rounded-xl shadow-2xl font-heading font-black text-xs uppercase tracking-widest z-20">
                Open Mon - Fri
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PRODUCTS GRID — Geometric Display Panels
          ========================================== */}
      <section className="py-24 lg:py-36 bg-surface-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 max-w-5xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-10 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Product Catalog
                </span>
              </div>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-text-heading uppercase tracking-tight leading-none">
                Our <span className="text-gradient">Products</span>
              </h2>
            </div>
            <div className="md:max-w-xs pl-6 border-l-2 border-border-default">
              <p className="text-text-muted text-sm font-medium leading-relaxed">
                Wide selection of automotive parts, tools, and hardware supplies
                tailored for durability.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <div
                key={product.name}
                className="group relative bg-brand-gold-light/30 rounded-3xl overflow-hidden transition-all duration-500 hover:brand-gold-light/50 hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer border border-transparent hover:border-border-default"
              >
                {/* Image Structure */}
                <div className="relative h-56 overflow-hidden m-3 rounded-2xl shadow-inner">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/0 to-transparent opacity-80" />

                  {/* Tag Refinement */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-[9px] font-black text-brand-navy tracking-wider uppercase bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                </div>

                {/* Content Configuration */}
                <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Segment: Floating Icon Mapping */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-navy group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm border border-border-light">
                        {iconMap[product.name] || (
                          <Package className="h-5 w-5" />
                        )}
                      </div>
                      <span className="font-heading font-black text-sm tracking-widest text-text-muted/30">
                        // 0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-md text-text-heading uppercase tracking-wide mb-3 line-clamp-2 min-h-[3rem] group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-text-body font-normal leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Subtle Interactive Element indicator */}
                  <div className="pt-4 mt-4 border-t border-border-light/60 flex items-center gap-2 text-xs font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SPECIAL SERVICES — Alternating Modern Panels
          ========================================== */}
      <section className="py-24 lg:py-36 bg-brand-navy relative overflow-hidden">
        {/* Abstract Architectural Vectors */}
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold text-xs font-black uppercase tracking-[0.4em]">
                Added Value
              </span>
              <span className="w-6 h-[1px] bg-brand-gold" />
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
              Special <span className="text-gradient">Services</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mt-4 max-w-xl mx-auto font-light">
              Extra benefits that make shopping with us the best choice for your
              vehicle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 transition-all duration-500 hover:bg-white hover:border-white rounded-3xl flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Floating Accent Identity Counter */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-lg group-hover:bg-brand-navy transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-heading font-black text-5xl text-white/5 group-hover:text-brand-navy/5 transition-colors duration-500">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <span className="inline-block text-[9px] font-black text-brand-gold tracking-widest uppercase bg-brand-gold/10 px-3 py-1 rounded border border-brand-gold/20 group-hover:bg-brand-orange/10 group-hover:text-brand-orange group-hover:border-brand-orange/20">
                        {service.tag}
                      </span>

                      <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide group-hover:text-brand-navy transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-sm text-white/70 font-normal leading-relaxed group-hover:text-text-body transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 group-hover:border-brand-navy/10 w-full h-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT & STORE INFO — Layout Grid Revamp
          ========================================== */}
      <section className="py-24 lg:py-36 bg-surface-gray">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-12 items-stretch">
            {/* LEFT SIDE: Clean Info Containers */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-brand-orange" />
                  <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                    Get In Touch
                  </span>
                </div>
                <h2 className="font-heading font-black text-4xl sm:text-5xl text-text-heading uppercase tracking-tight leading-none">
                  Visit Our <span className="text-gradient">Shop</span>
                </h2>
                <p className="text-text-muted text-sm max-w-sm pt-2 font-normal">
                  Stop by the shop or give us a call. We are here to help you
                  find exactly what you need.
                </p>
              </div>

              <div className="space-y-4 w-full">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "346 W Main St\nCarlisle, KY 40311",
                  },
                  { icon: Phone, label: "Phone", value: "(859) 405-4083" },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    value:
                      "Monday – Friday\n8:00 AM – 5:00 PM\nSaturday – Sunday: Closed",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-border-default shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-surface-gray flex items-center justify-center text-brand-navy shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">
                          {item.label}
                        </div>
                        <div className="text-sm text-text-heading font-semibold whitespace-pre-line leading-relaxed">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: Transformed Compact Premium Segment Banner */}
            <div className="lg:col-span-6">
              <div className="h-full bg-white rounded-[40px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl border border-border-default group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-surface-warm rounded-full blur-2xl pointer-events-none group-hover:bg-brand-orange/5 transition-colors duration-500" />

                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-md">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-black text-3xl text-text-heading uppercase tracking-tight">
                    Need a Part?
                  </h3>
                  <p className="text-text-body leading-relaxed text-base font-normal max-w-sm">
                    Call us or stop by. Our team will help you find exactly what
                    you need with fast sourcing pipelines.
                  </p>
                </div>

                <div className="space-y-4 pt-12 relative z-10">
                  <a href="tel:8594054083" className="block">
                    <Button
                      size="md"
                      variant="gradient"
                      className="w-full gap-3 cursor-pointer  py-6 font-bold"
                    >
                      <Phone className="h-5 w-5" />
                      Call Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                  <Link to="/booking" className="block">
                    <Button
                      size="md"
                      variant="outline"
                      className="w-full gap-2 border-2 border-border-default text-text-heading hover:border-text-heading bg-transparent hover:bg-surface-gray py-6 font-bold transition-all duration-300"
                    >
                      Book Service
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA BANNER — High Impact Wide Footer Banner
          ========================================== */}
      <section className="py-12 lg:py-20 bg-surface-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light rounded-[40px] p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
            {/* Background Texture elements */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-orange/10 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-6 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Installation Service
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
                Need Installation Too?
              </h2>
              <p className="text-white/60 text-base font-light max-w-lg">
                Buy your parts here and get them installed by our certified
                technicians without stress.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full lg:w-auto">
              <Link to="/booking" className="block w-full text-center">
                <Button
                  size="md"
                  variant="gradient"
                  className="gap-3 cursor-pointer  justify-center px-8 py-6 font-bold"
                >
                  Book Installation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Structured Rings */}
            <div className="absolute -bottom-24 -right-24 w-72 h-72 border border-white/5 rounded-full pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
