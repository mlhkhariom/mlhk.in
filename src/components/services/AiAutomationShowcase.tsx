"use client";

import { useState } from "react";
import {
  Bot,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  Database,
  Send,
  Layers,
  ArrowRight,
} from "lucide-react";

export function AiAutomationShowcase() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const runPipeline = () => {
    setIsRunning(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 500);
    setTimeout(() => setActiveStep(3), 1000);
    setTimeout(() => setActiveStep(4), 1500);
    setTimeout(() => {
      setActiveStep(5);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0c10] via-[#07080a] to-[#050607] p-6 md:p-10 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff9f1c]/10 blur-[120px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb84d]">
                <Bot className="size-3 text-[#ff9f1c]" />
                Autonomous Workflow Orchestration
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                n8n + WhatsApp Cloud API
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Deterministic AI Pipelines &amp; Instant Conversational Bots
            </h3>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-400">
              Interactive execution engine. Watch an incoming lead trigger real-time AI classification,
              database state updates, and an instant WhatsApp response in under 2 seconds.
            </p>
          </div>

          <button
            type="button"
            onClick={runPipeline}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ff9f1c]/40 bg-[#ff9f1c]/10 px-4 py-2 text-xs font-semibold text-[#ffb84d] transition-all hover:bg-[#ff9f1c]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RotateCcw className="size-3.5 animate-spin" />
                Executing Pipeline...
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                Simulate Autonomous Pipeline
              </>
            )}
          </button>
        </div>

        {/* Pipeline & WhatsApp Chat Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left: n8n Node Workflow Diagram */}
          <div className="lg:col-span-7 space-y-3">
            {[
              {
                step: 1,
                title: "01. Inbound Webhook Listener",
                desc: "Captures lead payload from website form or WhatsApp webhook in 12ms.",
                icon: Zap,
              },
              {
                step: 2,
                title: "02. LLM Intent & Budget Classifier",
                desc: "Analyzes client scope: extracts enterprise intent, budget, and city location.",
                icon: Bot,
              },
              {
                step: 3,
                title: "03. PostgreSQL State Sync & De-duplication",
                desc: "Verifies GSTIN/phone history and locks record into ACID database.",
                icon: Database,
              },
              {
                step: 4,
                title: "04. WhatsApp Business Cloud API Dispatch",
                desc: "Pushes personalized brochure and calendar booking link in 140ms.",
                icon: Send,
              },
              {
                step: 5,
                title: "05. Executive Team Dispatch & Escalation",
                desc: "Transmits qualified lead dossier directly to founder's phone.",
                icon: CheckCircle2,
              },
            ].map((node) => {
              const Icon = node.icon;
              const isPassed = activeStep >= node.step;
              const isCurrent = activeStep === node.step;
              return (
                <div
                  key={node.step}
                  className={`rounded-xl border p-3.5 transition-all duration-300 flex items-start gap-3.5 ${
                    isCurrent
                      ? "border-[#ff9f1c] bg-[#ff9f1c]/15 shadow-[0_0_20px_rgba(255,159,28,0.2)]"
                      : isPassed
                      ? "border-emerald-500/40 bg-emerald-500/5 text-zinc-300"
                      : "border-white/10 bg-white/[0.01] text-zinc-500 opacity-60"
                  }`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg border text-xs font-mono font-bold ${
                      isCurrent
                        ? "border-[#ff9f1c] bg-[#ff9f1c] text-black"
                        : isPassed
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-white/10 bg-white/5 text-zinc-500"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isPassed || isCurrent ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {node.title}
                      </span>
                      {isPassed && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          Execution: OK
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-zinc-400 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Simulated WhatsApp Chat Bubble */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#07090c] p-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                <MessageSquare className="size-5" />
              </div>
              <div>
                <span className="font-display text-xs font-bold text-white block">
                  MLHK Infotech Automated Desk
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Official WhatsApp Cloud API
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {/* User message */}
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#005c4b] p-3 text-white">
                <p>
                  Hello MLHK, we need a custom CRM and Android app for our Indore operations.
                </p>
                <span className="text-[9px] text-white/60 block text-right mt-1">09:42 AM</span>
              </div>

              {/* Bot response */}
              {activeStep >= 4 ? (
                <div className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm bg-[#202c33] p-3.5 text-zinc-200 space-y-2 border border-white/5 animate-in fade-in">
                  <p>
                    Namaste! 🙏 Thank you for reaching out to <strong>MLHK Infotech</strong>.
                  </p>
                  <p className="text-[11px] text-zinc-300">
                    We specialize in custom enterprise ERP/CRM and native Android engineering with
                    zero recurring SaaS fees.
                  </p>
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <div className="rounded-lg bg-black/40 p-2 text-[10px] font-mono text-[#ffb84d] text-center border border-white/10">
                      [1] Download Enterprise Capabilities PDF
                    </div>
                    <div className="rounded-lg bg-black/40 p-2 text-[10px] font-mono text-[#ffb84d] text-center border border-white/10">
                      [2] Schedule Architecture Call with Hariom
                    </div>
                  </div>
                  <span className="text-[9px] text-zinc-500 block text-right">09:42 AM • Instant</span>
                </div>
              ) : (
                <div className="mr-auto rounded-2xl bg-[#202c33]/50 p-3 text-zinc-500 italic text-[11px]">
                  Waiting for pipeline execution...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

