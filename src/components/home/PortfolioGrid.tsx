"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/home/utils";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  tags?: string | null;
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced || projects.length === 0) return;

    const cards = Array.from(
      container.querySelectorAll(".portfolio-card"),
    ) as HTMLElement[];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
            markers: false,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [projects, reduced]);

  if (projects.length === 0) {
    return (
      <section className="py-20 md:py-28 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500">No portfolio items yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            <span>Selected work that moved</span>
            <br />
            <span>markets, users, and metrics.</span>
          </h2>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-zinc-400 leading-relaxed">
            A curated selection of products we shipped — each one measured by
            the outcomes it delivered.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {projects.length > 6 && (
          <div className="mt-12 md:mt-16 text-center md:text-left">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
            >
              See all projects <ArrowRight className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);

  const tags = project.tags?.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <article className={cn("portfolio-card group relative overflow-hidden rounded-2xl", "bg-zinc-950 border border-zinc-800")}>
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
        {project.image ? (
          <>
            {!imgLoaded && (
              <div
                aria-hidden
                className="absolute inset-0 animate-pulse bg-zinc-800"
              />
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-500",
                imgLoaded ? "scale-100" : "scale-105",
                !reduced && "group-hover:scale-110",
              )}
              onLoad={() => setImgLoaded(true)}
            />
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-zinc-950 to-zinc-950 flex items-center justify-center"
          >
            <div className="text-cyan-500/30">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
                <path
                  className="stroke-current"
                  strokeWidth="1.5"
                  d="M3.75 12a8.25 8.25 0 0116.5 0M3.75 12a8.25 8.25 0 0016.5 0m-16.5 0a8.25 8.25 0 0116.5 0M12 5.25a6.75 6.75 0 016.75 6.75M12 5.25a6.75 6.75 0 00-6.75 6.75M12 18.75a6.75 6.75 0 01-6.75-6.75M12 18.75a6.75 6.75 0 006.75-6.75"
                />
              </svg>
            </div>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60"
        />
      </div>

      <div className="relative p-5">
        <h3 className="text-lg font-semibold text-white leading-snug mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-blue-300/80 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
