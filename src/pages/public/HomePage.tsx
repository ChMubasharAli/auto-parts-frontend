import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { Button } from "../../components/ui/Button";
import {
  Wrench,
  Clock,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Car,
  Droplets,
  RotateCcw,
  Calculator,
  Hammer,
  Droplet,
  Fan,
  Dog,
  HeartHandshake,
  Calendar,
  Store,
  CheckCircle2,
  Award,
  BadgeCheck,
  HardHat,
  ChevronRight,
  Quote,
  Navigation,
  Shield,
  Sparkles,
  ArrowDown,
  Layers,
  Package,
  Scissors,
  Settings,
} from "lucide-react";

const stats = [
  { value: "1955", label: "Serving Since", icon: Calendar },
  { value: "70+", label: "Years of Trust", icon: Award },
  { value: "Local", label: "Community Landmark", icon: Store },
  { value: "1-Stop", label: "Shop for Everything", icon: CheckCircle2 },
];

const features = [
  {
    icon: BadgeCheck,
    title: "Exclusive AutoValue Dealer",
    description:
      "As an exclusive AutoValue auto parts dealer, we provide premium quality parts backed by industry-leading warranties. From routine maintenance to major repairs, we have the parts you need.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: HardHat,
    title: "Hardware, Plumbing & More",
    description:
      "Beyond auto parts, we are your trusted source for household hardware, plumbing supplies, hot water heaters, and indoor/outdoor faucets. Supporting local farmers and homeowners with all their project needs.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: HeartHandshake,
    title: "Custom Hydraulic Services",
    description:
      "Save yourself a trip out of town. We offer custom hydraulic hose fabrication and repairs right here in Carlisle. Fast turnaround, expert craftsmanship, and fair pricing.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
  },
];

const productCategories = [
  {
    name: "Auto Parts",
    icon: Car,
    description:
      "Exclusive AutoValue dealer. Quality parts for every make and model.",
    highlight: "AutoValue",
    image: "/images/IMG-6950.webp",
  },
  {
    name: "Hardware & Plumbing",
    icon: Hammer,
    description:
      "Household hardware, plumbing supplies, hot water heaters & faucets.",
    highlight: "Projects",
    image: "/images/IMG-6944.webp",
  },
  {
    name: "Hydraulic Hoses",
    icon: Droplet,
    description:
      "Custom fabrication and repairs. No need to drive out of town.",
    highlight: "Custom",
    image: "/images/West-Main-Open-Bay.webp",
  },
  {
    name: "Echo Power Equipment",
    icon: Fan,
    description:
      "Weed eaters, blowers, mowers, and chainsaws. Exclusive Echo dealer.",
    highlight: "Echo",
    image: "/images/IMG-6945.webp",
  },
  {
    name: "Pet & Livestock Feed",
    icon: Dog,
    description: "Quality feed for your livestock and domestic pets.",
    highlight: "Feed",
    image: "/images/IMG-7273.webp",
  },
];

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

const iconMap: Record<string, React.ReactNode> = {
  "Oil Change": <Droplets className="h-6 w-6" />,
  "Tire Rotation": <RotateCcw className="h-6 w-6" />,
  "Mount & Balance": <Car className="h-6 w-6" />,
  Estimates: <Calculator className="h-6 w-6" />,
};

export const HomePage = () => {
  const { data: services, isLoading } = useServices();

  const scrollToProducts = () => {
    const productsSection = document.getElementById("product-catalog");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* ==========================================
          HERO SECTION   Completely New Premium Design
          ========================================== */}
      <section className="relative w-full bg-surface-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/[0.03] rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/[0.04] rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-custom relative z-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT: Content */}
            <div className="lg:col-span-6 space-y-8 relative">
              {/* Vertical Accent Line */}
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-gold to-transparent rounded-full hidden lg:block" />

              <div className="space-y-6">
                {/* Pill Badge */}

                {/* Main Heading */}
                <h1 className="font-heading   font-black text-4xl sm:text-5xl lg:text-6xl text-text-heading uppercase tracking-tight leading-[1.05]">
                  Dee Jay Auto Parts{" "}
                  <span className="text-gradient">& Hardware</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl text-text-body/80 font-light normal-case tracking-normal">
                  of Carlisle, Kentucky
                </p>

                {/* Description */}
                <p className="text-base md:text-lg text-text-body/70 font-light leading-relaxed max-w-lg">
                  Serving the Carlisle, KY community since 1955, Dee Jay is more
                  than just a store. It is a local landmark where community
                  members connect. From auto parts to hardware, plumbing to
                  power equipment, we have everything you need under one roof.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="https://maps.google.com/?q=328+W+Main+St+Carlisle+KY+40311"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="md"
                    variant="gradient"
                    className="gap-2 w-full md:w-auto justify-center cursor-pointer text-base px-8 "
                  >
                    <MapPin className="h-5 w-5" />
                    Visit Us Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <button onClick={scrollToProducts}>
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full md:w-auto justify-center gap-2 border-2 border-border-default text-text-heading hover:border-brand-orange hover:bg-surface-warm cursor-pointer text-base px-8"
                  >
                    <Store className="h-5 w-5" />
                    Browse Our Products
                  </Button>
                </button>
              </div>
            </div>

            {/* RIGHT: Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full max-w-xl mx-auto lg:max-w-none lg:ml-auto">
                {/* Main Large Image */}
                <div className="relative z-10 rounded-[36px] overflow-hidden shadow-2xl shadow-brand-navy/10 aspect-[4/3] border border-border-light">
                  <img
                    src="/images/IMG-6941.webp "
                    alt="Dee Jay Auto Parts & Hardware Storefront"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Card   Bottom Left Overlap */}
                <div className="absolute -bottom-8 -left-4 lg:-left-10 z-20 bg-white rounded-2xl p-5 shadow-xl border border-border-light/50 w-60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange border-2 border-brand-orange/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-text-heading text-sm">
                        Mon – Sat
                      </div>
                      <div className="text-xs text-text-muted">
                        7:00 AM – 5:30 PM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circular Badge   Center Right */}
                <div className="absolute top-1/2 -right-6 lg:-right-14 z-20 hidden sm:block">
                  <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                    <div className="absolute inset-0 border-2 border-dashed border-brand-orange/30 rounded-full animate-[spin_30s_linear_infinite]" />
                    <div className="absolute inset-2 bg-white rounded-full shadow-lg border border-border-light flex flex-col items-center justify-center">
                      <span className="font-heading font-black text-xl lg:text-2xl text-brand-orange">
                        70+
                      </span>
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold">
                        Years
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80V40C240 70 480 80 720 70C960 60 1200 30 1440 20V80H0Z"
              fill="#FAFAF8"
            />
          </svg>
        </div>
      </section>

      {/* ==========================================
          STATS STRIP   Sleek Minimal Ticker
          ========================================== */}
      <section className="py-12 bg-surface-warm border-y border-border-light">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center gap-3 ${
                    i < stats.length - 1
                      ? "md:border-r md:border-border-default"
                      : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-border-default shadow-sm flex items-center justify-center">
                    <Icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-heading font-black text-text-heading leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider font-bold mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section className=" lg:py-32 bg-surface-warm">
        <div className="container-custom">
          <div className="max-w-2xl mb-16 lg:mb-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                What We Carry
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
              Everything You Need,{" "}
              <span className="text-gradient">All in One Place</span>
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              From auto parts to power equipment, hardware to pet feed, we are
              your true one-stop shop. No need to drive out of town.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 group relative rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[400px] cursor-pointer">
              <img
                src={productCategories[0].image}
                alt={productCategories[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center text-white mb-4 shadow-lg">
                  <Car className="h-6 w-6" />
                </div>

                <h3 className="font-heading font-black text-2xl lg:text-3xl text-white uppercase tracking-wide mb-2">
                  {productCategories[0].name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  {productCategories[0].description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 group relative rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[400px] cursor-pointer">
              <img
                src={productCategories[1].image}
                alt={productCategories[1].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white mb-4">
                  <Hammer className="h-6 w-6" />
                </div>

                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wide mb-2">
                  {productCategories[1].name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {productCategories[1].description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 group relative rounded-[24px] overflow-hidden min-h-[260px] cursor-pointer">
              <img
                src={productCategories[2].image}
                alt={productCategories[2].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/90 flex items-center justify-center text-white mb-3">
                  <Droplet className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-1">
                  {productCategories[2].name}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {productCategories[2].description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 group relative rounded-[24px] overflow-hidden min-h-[260px] cursor-pointer">
              <img
                src={productCategories[3].image}
                alt={productCategories[3].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white mb-3">
                  <Fan className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-1">
                  {productCategories[3].name}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {productCategories[3].description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 group relative rounded-[24px] overflow-hidden min-h-[260px] cursor-pointer">
              <img
                src={productCategories[4].image}
                alt={productCategories[4].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/90 flex items-center justify-center text-white mb-3">
                  <Dog className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide mb-1">
                  {productCategories[4].name}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {productCategories[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ==========================================
          PRODUCTS GRID — Geometric Display Panels
          ========================================== */}
      <section id="product-catalog" className="py-24 lg:py-36 bg-gray-100">
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
                className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500  hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer border border-transparent hover:border-border-default"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          WHY CHOOSE US   Zigzag Editorial Layout
          ========================================== */}
      {/* <section className="py-24 lg:py-32 bg-surface-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16 lg:mb-24">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1]">
                The Dee Jay <span className="text-gradient">Difference</span>
              </h2>
            </div>
            <p className="text-text-body text-lg leading-relaxed lg:pb-1">
              Three generations of service, thousands of neighbors helped, and
              an unwavering commitment to keeping Carlisle running strong.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                >
                  <div
                    className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3]">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-6 ${
                        isEven ? "-right-4 lg:right-8" : "-left-4 lg:left-8"
                      } w-20 h-20 bg-brand-orange rounded-2xl shadow-xl flex items-center justify-center`}
                    >
                      <span className="font-heading font-black text-3xl text-white">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`${isEven ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8"}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-lg mb-6">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading font-black text-2xl lg:text-3xl text-text-heading uppercase tracking-wide mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-text-body leading-relaxed text-lg mb-6">
                      {feature.description}
                    </p>
                    <Link
                      to={"/booking"}
                      className="flex items-center gap-2 text-brand-orange text-sm font-black uppercase tracking-wider cursor-pointer group"
                    >
                      <span>Explore Services</span>
                      <ArrowRight
                        size={16}
                        strokeWidth={3}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/West-Main-Open-Bay.webp"
            alt="Dee Jay Auto Parts & Hardware Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-brand-orange" />
                  <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                    Visit Us
                  </span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.1] mb-5">
                  Ready to Get Started on{" "}
                  <span className="text-gradient">Your Next Project?</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                  Drop by the shop or give us a call. Walk-ins are always
                  welcome, and our friendly team is ready to help you find
                  exactly what you need.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=328+W+Main+St+Carlisle+KY+40311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    size="md"
                    variant="gradient"
                    className="w-full gap-2 cursor-pointer"
                  >
                    <Navigation className="h-5 w-5" />
                    Get Directions
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <a href="tel:8592892208" className="flex-1">
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full gap-2 border-2 border-white/25 text-white hover:bg-white/10 cursor-pointer"
                  >
                    <Phone className="h-5 w-5" />
                    (859) 289-2208
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "328 W Main St\nCarlisle, KY 40311",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "(859) 289-2208",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Monday – Saturday\n7:00 AM – 5:30 PM\nSunday: Closed",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white/50 uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-white font-medium whitespace-pre-line leading-relaxed">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA   Premium Card Design
          ========================================== */}
      <section className="relative py-24 lg:py-32 bg-surface-white overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className=" mx-auto">
            <div className="relative bg-white rounded-[40px] border border-border-light shadow-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

              <div className="grid lg:grid-cols-5 items-stretch">
                <div className="lg:col-span-3 p-10 lg:p-16 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full border border-brand-orange/20">
                    <HeartHandshake className="h-4 w-4 text-brand-orange" />
                    <span className="text-brand-orange text-xs font-black uppercase tracking-[0.2em]">
                      Since 1955
                    </span>
                  </div>

                  <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1]">
                    Experience the Friendly Service{" "}
                    <span className="text-gradient">
                      That Made Us a Favorite
                    </span>
                  </h2>

                  <p className="text-text-body text-lg leading-relaxed max-w-lg">
                    From auto parts to hardware, hydraulic hoses to pet feed we
                    are your one-stop shop. Stop by and see why Carlisle has
                    trusted us for over 70 years.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://maps.google.com/?q=328+W+Main+St+Carlisle+KY+40311"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="md"
                        variant="gradient"
                        className="gap-2 w-full sm:w-auto cursor-pointer"
                      >
                        <MapPin className="h-5 w-5" />
                        Visit Us Today
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </a>
                    <button onClick={scrollToProducts}>
                      <Button
                        size="md"
                        variant="outline"
                        className="gap-2 border-2 w-full sm:w-auto border-border-default text-text-heading hover:border-brand-orange hover:bg-surface-warm cursor-pointer"
                      >
                        <Store className="h-5 w-5" />
                        Browse Our Products
                      </Button>
                    </button>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-border-light">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-brand-orange" />
                      <span className="text-sm text-text-muted font-medium">
                        AutoValue Dealer
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-brand-orange" />
                      <span className="text-sm text-text-muted font-medium">
                        Echo Dealer
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="h-4 w-4 text-brand-orange" />
                      <span className="text-sm text-text-muted font-medium">
                        Family Owned
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-0">
                  <img
                    src="/images/Dee-Jay-Auto-External.webp"
                    alt="Dee Jay Store"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
