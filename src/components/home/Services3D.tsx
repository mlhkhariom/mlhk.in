"use client";

import { useRef, useEffect, useState, MutableRefObject } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Cloud, Zap, Shield, BarChart3 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
}

const ICONS: Record<string, React.JSX.Element> = {
  SoftwareDevelopment: <Code2 className="size-5" />,
  MobileApps: <Smartphone className="size-5" />,
  CloudInfra: <Cloud className="size-5" />,
  AIIntegration: <Zap className="size-5" />,
  CyberSecurity: <Shield className="size-5" />,
  DataAnalytics: <BarChart3 className="size-5" />,
};

export function Services3D({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced || services.length === 0) return;

    const cards = Array.from(
      container.querySelectorAll(".service-card"),
    ) as HTMLElement[];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 78%",
            once: true,
            markers: false,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [services, reduced]);

  if (services.length === 0) {
    return (
      <section className="py-20 md:py-28 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500">No services configured yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            <span>
              Solutions engineered,
              <br />
              delivered end to end.
            </span>
          </h2>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-zinc-400 leading-relaxed">
            Every product we ship is built for scale, security, and the long
            haul — from the first prototype to enterprise rollout.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <div className="mt-10 md:mt-14 text-center md:text-left">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
          >
            View all services <ArrowRight className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const Icon = ICONS[service.title] || <Code2 className="size-5" />;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateZ(0)`,
      transformStyle: "preserve-3d",
    });
    const intensity = 1 - Math.abs(y - cy) / cy;
    setGlowStyle({
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,${0.06 + intensity * 0.08}), 0 25px 50px -12px rgba(59, 130, 246, ${0.09 + intensity * 0.08})`,
    });
  };

  const handleLeave = () => {
    setTiltStyle({ transform: "perspective(800px) rotateX(0) rotateY(0) translateZ(0)" });
    setGlowStyle({ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleLeave}
      className={cn(
        "service-card relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 md:p-7",
        "transition-colors duration-300",
        "hover:bg-zinc-900",
      )}
      style={{
        ...tiltStyle,
        ...glowStyle,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-cyan-400 mb-5">
        {Icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
        {service.title}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}
