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
  Quote,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import { useServices } from "../../hooks/useServices";

const specialServices = [
  {
    icon: Clock,
    tag: "Save Time",
    title: "Fast Turnaround",
    description:
      "Most routine services are completed quickly, including oil changes in about 30 minutes and tire rotations in as little as 15 minutes, helping you get back on the road faster.",
  },
  {
    icon: ShieldCheck,
    tag: "Trusted Experts",
    title: "25+ Years Experience",
    description:
      "Our team brings more than 25 years of combined automotive experience, delivering dependable maintenance, accurate recommendations, and quality workmanship.",
  },
  {
    icon: Phone,
    tag: "Easy Process",
    title: "Convenient Service",
    description:
      "From quick estimates to scheduling repairs, we make vehicle maintenance simple with friendly support, transparent communication, and hassle-free service.",
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
  const { data: services, isLoading } = useServices();
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
                  src="/images/West-Main-Open-Bay.webp"
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
          POPULAR SERVICES   Dynamic from useServices Hook
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
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
              Professional services to keep your vehicle and equipment running
              at peak performance.
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
                    className="group relative bg-white border-2 border-border-default p-7 transition-all duration-500 hover:border-brand-orange hover:shadow-lg flex flex-col overflow-hidden rounded-[28px_28px]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

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

                    <div className="space-y-3 flex-1">
                      <span className="inline-block text-[10px] font-black text-brand-orange tracking-[0.2em] uppercase bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                        {"Service"}
                      </span>

                      <h3 className="font-heading font-black text-lg text-text-heading uppercase tracking-wide group-hover:text-brand-orange transition-colors duration-300">
                        {service.name}
                      </h3>

                      <p className="text-sm text-text-body font-medium leading-relaxed line-clamp-3">
                        {service?.description ||
                          "Professional service by certified technicians with quality guarantee."}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-border-default group-hover:border-brand-orange/20 transition-colors">
                      <div
                        className={`flex items-center ${service.price ? "justify-between" : "justify-end"}`}
                      >
                        {service.price && (
                          <div>
                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold block mb-0.5">
                              Starting at
                            </span>
                            <span className="text-xl font-heading font-black text-brand-orange tracking-tight">
                              ${Number(service.price).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xl font-heading font-black text-brand-orange tracking-tight">
                          <Clock className="h-3.5 w-3.5" />
                          {service.duration} min
                        </div>
                      </div>
                    </div>

                    <Link to={"/booking"} className="mt-4 ">
                      <Button
                        size="sm"
                        variant="gradient"
                        className="w-full gap-3 justify-center cursor-pointer  font-black text-sm uppercase tracking-wider"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Book Now
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/booking">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer w-full sm:w-auto"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
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
                Why Choose Us
              </span>
              <span className="w-6 h-[1px] bg-brand-gold" />
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
              Auto Care Made <span className="text-gradient">Simple</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mt-4 max-w-xl mx-auto font-light">
              Fast service, experienced technicians, and a customer-first
              approach that makes maintaining your vehicle easier than ever.
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
          TESTIMONIALS   Masonry Board Style
          ========================================== */}
      <section className="py-24 lg:py-32 bg-surface-warm">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-xs font-black uppercase tracking-[0.3em]">
                Customer Reviews
              </span>
              <span className="w-8 h-[2px] bg-brand-orange" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-tight leading-[1.1] mb-5">
              Trusted for <span className="text-gradient">Every Mile</span>
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              Providing reliable auto maintenance and repair services with over
              25 years of combined experience serving Carlisle and surrounding
              areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-white rounded-[28px] p-8 border border-border-default shadow-sm relative overflow-hidden">
              <div className="absolute top-6 right-6 text-brand-orange/10">
                <Quote className="h-16 w-16" />
              </div>
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-brand-gold"
                    fill="currentColor"
                  />
                ))}
              </div>
              <blockquote className="text-text-heading text-lg font-medium leading-relaxed mb-8 relative z-10">
                "I brought my truck in for an oil change and tire rotation, and
                the team had everything completed faster than expected. Friendly
                service, honest recommendations, and quality work every time."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-gold flex items-center justify-center text-white font-bold">
                  RJ
                </div>
                <div>
                  <div className="font-bold text-text-heading">
                    Robert Jennings
                  </div>
                  <div className="text-sm text-text-muted">
                    Carlisle Resident & Long-Time Customer
                  </div>
                </div>
              </div>
            </div>

            {[
              {
                name: "Sarah Mitchell",
                text: "Needed a quick oil change before a road trip. The team got me in and out in about 30 minutes and made sure my vehicle was ready for the drive.",
                tag: "Oil Change",
              },
              {
                name: "Mike Torres",
                text: "Had all four tires mounted and balanced here. The process was smooth, the staff was professional, and the ride feels better than ever.",
                tag: "Mount & Balance",
              },
              {
                name: "Lisa Chen",
                text: "Stopped by for a tire rotation and inspection. They explained everything clearly and helped extend the life of my tires.",
                tag: "Tire Rotation",
              },
              {
                name: "James Wright",
                text: "I needed an estimate for some repair work. They provided honest advice, fair pricing, and answered all of my questions without pressure.",
                tag: "Vehicle Estimate",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-[24px] p-6 border border-border-default hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-3 w-3 text-brand-gold"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-2 py-1 rounded-full">
                    {review.tag}
                  </span>
                </div>
                <p className="text-text-body text-sm leading-relaxed mb-5">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange/15 to-brand-gold/15 flex items-center justify-center text-brand-orange font-bold text-xs">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="font-bold text-sm text-text-heading">
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
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
