"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Wifi,
  WifiOff,
  ScanBarcode,
  Fingerprint,
  Cpu,
  Layers,
  Battery,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  QrCode,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Database,
  Sparkles,
  ArrowUpRight,
  Activity,
  Terminal,
  Lock,
  Server,
  HardDrive,
  Play,
  Share2,
  Sliders,
  Radio,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & ARCHETYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type ArchetypeId = "logistics" | "consumer" | "kmp" | "fleet";

interface MobileArchetype {
  id: ArchetypeId;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  targetClients: string;
  stack: {
    coreLanguage: string;
    uiArchitecture: string;
    localPersistence: string;
    hardwareBindings: string;
  };
  metrics: {
    ramUsage: string;
    frameRate: string;
    offlineLatency: string;
    coldStartTime: string;
  };
  security: string;
}

const MOBILE_ARCHETYPES: MobileArchetype[] = [
  {
    id: "logistics",
    title: "Field Logistics & Offline POS",
    badge: "Industrial Grade",
    tagline: "Unbreakable Offline Data Collection & Hardware Scanning",
    description:
      "Engineered for field inspectors, warehouse operators, and delivery personnel working in rural dead zones, basements, and transit flights with zero internet.",
    targetClients:
      "Supply chain operators, warehouse inventories, agricultural surveys, and door-to-door distribution fleets.",
    stack: {
      coreLanguage: "Native Kotlin & Java 21",
      uiArchitecture: "Android Jetpack Views & Compose",
      localPersistence: "Room SQLite + SQLCipher 256-bit AES",
      hardwareBindings: "CameraX 1.4+, Zebra/Honeywell Barcode HAL, Bluetooth ESC/POS",
    },
    metrics: {
      ramUsage: "32 MB – 44 MB",
      frameRate: "60.0 FPS Locked",
      offlineLatency: "< 4 ms local write",
      coldStartTime: "0.38 seconds",
    },
    security: "Local database encrypted with SQLCipher; keys sealed in hardware Keystore.",
  },
  {
    id: "consumer",
    title: "Consumer Commerce & FinTech",
    badge: "Direct-to-Consumer",
    tagline: "Sub-Second Checkout, Biometric Vault & 60 FPS Fluidity",
    description:
      "Bespoke mobile commerce and financial applications designed for ultra-fast customer conversions, instant UPI intent payment routing, and zero transaction drops.",
    targetClients:
      "D2C brands, micro-lending portals, investment trackers, and digital membership clubs.",
    stack: {
      coreLanguage: "Kotlin / Swift",
      uiArchitecture: "Jetpack Compose (Android) & SwiftUI (iOS)",
      localPersistence: "Multiplatform Room & EncryptedDataStore",
      hardwareBindings: "BiometricPrompt StrongBox, Secure Enclave, UPI Intent Protocol",
    },
    metrics: {
      ramUsage: "48 MB – 58 MB",
      frameRate: "60.0 – 120.0 FPS ProMotion",
      offlineLatency: "< 8 ms cached catalog",
      coldStartTime: "0.45 seconds",
    },
    security: "Hardware-backed BiometricPrompt; biometric auth generates ephemeral RS256 JWTs.",
  },
  {
    id: "kmp",
    title: "Kotlin Multiplatform (KMP) Architecture",
    badge: "Unified Core",
    tagline: "Share 70% Logic • 100% Native Dual UI Performance",
    description:
      "A single type-safe Kotlin core for networking, domain models, and databases, paired with native Jetpack Compose on Android and native SwiftUI on iOS.",
    targetClients:
      "Fast-scaling startups, multi-platform SaaS products, and enterprise applications requiring dual-platform parity without WebView bloat.",
    stack: {
      coreLanguage: "Kotlin 2.0 (K2 Compiler) & Swift 6",
      uiArchitecture: "Compose (Android) & SwiftUI (iOS)",
      localPersistence: "Multiplatform Room + SQLite Bundled Driver",
      hardwareBindings: "Ktor Client Multiplatform, Swift Export Interop",
    },
    metrics: {
      ramUsage: "40 MB (Android) / 36 MB (iOS)",
      frameRate: "60.0 FPS Native GPU",
      offlineLatency: "< 5 ms local cache",
      coldStartTime: "0.42 seconds",
    },
    security: "Cross-platform encrypted storage with platform-specific secure enclaves.",
  },
  {
    id: "fleet",
    title: "Realtime Fleet & Telemetry Systems",
    badge: "GPS & IoT",
    tagline: "Continuous Battery-Optimized Geofencing & Fleet Radar",
    description:
      "Built for commercial transport fleets and emergency field responders, operating continuous background location batching compliant with Android 15 Doze mode.",
    targetClients:
      "Logistics transport, municipal service vehicles, emergency ambulances, and field technician dispatchers.",
    stack: {
      coreLanguage: "Native Kotlin & Android Jetpack",
      uiArchitecture: "Jetpack Compose with Mapbox / Google Maps SDK",
      localPersistence: "Room SQLite Spatial Indexing",
      hardwareBindings: "FusedLocationProvider, WorkManager, MQTT / WebSocket Gateway",
    },
    metrics: {
      ramUsage: "36 MB – 46 MB",
      frameRate: "60.0 FPS Smooth Canvas",
      offlineLatency: "Batch sync on signal recovery",
      coldStartTime: "0.40 seconds",
    },
    security: "End-to-end encrypted MQTT payload transmissions with TLS 1.3 client certificates.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CODE EXAMPLES FOR INSPECTOR
// ─────────────────────────────────────────────────────────────────────────────

interface MobileCodeSnippet {
  id: string;
  title: string;
  filename: string;
  language: string;
  code: string;
  description: string;
}

const MOBILE_CODE_SNIPPETS: MobileCodeSnippet[] = [
  {
    id: "dao",
    title: "Room SQLite KMP DAO",
    filename: "InspectionDao.kt",
    language: "kotlin",
    description:
      "Multiplatform Room SQLite DAO streaming local records using Coroutine Flow with conflict-free upsert rules.",
    code: `@Dao
interface InspectionDao {
    @Query("SELECT * FROM inspections ORDER BY timestamp DESC")
    fun observeAllInspections(): Flow<List<InspectionEntity>>

    @Query("SELECT * FROM inspections WHERE syncStatus = :pendingStatus")
    suspend fun getPendingUploads(pendingStatus: String = "PENDING"): List<InspectionEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertInspection(inspection: InspectionEntity): Long

    @Query("UPDATE inspections SET syncStatus = 'SYNCED', syncedAt = :timestamp WHERE id IN (:ids)")
    suspend fun markAsSynced(ids: List<String>, timestamp: Long)
}`,
  },
  {
    id: "scanner",
    title: "CameraX 1.4+ Barcode Pipeline",
    filename: "BarcodeAnalyzer.kt",
    language: "kotlin",
    description:
      "CameraX 1.4+ ImageAnalysis binding with Google ML Kit on-device neural parser for 12ms optical decoding.",
    code: `@androidx.annotation.OptIn(androidx.camera.core.ExperimentalGetImage::class)
class BarcodeAnalyzer(
    private val onBarcodeDetected: (String) -> Unit
) : ImageAnalysis.Analyzer {
    private val scanner = BarcodeScanning.getClient(
        BarcodeScannerOptions.Builder()
            .setBarcodeFormats(Barcode.FORMAT_QR_CODE, Barcode.FORMAT_CODE_128)
            .build()
    )

    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage != null) {
            val inputImage = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)
            scanner.process(inputImage)
                .addOnSuccessListener { barcodes ->
                    barcodes.firstOrNull()?.rawValue?.let { rawValue ->
                        onBarcodeDetected(rawValue)
                    }
                }
                .addOnCompleteListener { imageProxy.close() }
        } else {
            imageProxy.close()
        }
    }
}`,
  },
  {
    id: "biometric",
    title: "BiometricPrompt StrongBox Enclave",
    filename: "BiometricEnclave.kt",
    language: "kotlin",
    description:
      "Hardware-backed Android KeyStore cryptographic cipher validation for financial auth tokens.",
    code: `class BiometricEnclaveManager(private val activity: FragmentActivity) {
    fun authenticate(onSuccess: (Cipher) -> Unit, onError: (String) -> Unit) {
        val executor = ContextCompat.getMainExecutor(activity)
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("MLHK Enterprise Authorization")
            .setSubtitle("Authenticate hardware biometric sensor")
            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            .setNegativeButtonText("Cancel")
            .build()

        val biometricPrompt = BiometricPrompt(activity, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    val cipher = result.cryptoObject?.cipher
                    if (cipher != null) onSuccess(cipher)
                }
                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    onError(errString.toString())
                }
            })

        val cryptoObject = BiometricPrompt.CryptoObject(getHardwareKeyCipher())
        biometricPrompt.authenticate(promptInfo, cryptoObject)
    }
}`,
  },
  {
    id: "worker",
    title: "WorkManager Exponential Delta Sync",
    filename: "DeltaSyncWorker.kt",
    language: "kotlin",
    description:
      "Android WorkManager background worker with network constraints and exponential backoff retry logic.",
    code: `class DeltaSyncWorker(
    appContext: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val database = AppDatabase.getInstance(applicationContext)
        val pending = database.inspectionDao().getPendingUploads()

        if (pending.isEmpty()) return@withContext Result.success()

        try {
            val response = ApiClient.syncService.uploadDelta(pending)
            if (response.isSuccessful) {
                database.inspectionDao().markAsSynced(pending.map { it.id }, System.currentTimeMillis())
                Result.success()
            } else {
                Result.retry() // Triggers exponential backoff
            }
        } catch (e: IOException) {
            Result.retry()
        }
    }
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION VERIFICATION GATES
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTION_GATES = [
  {
    title: "Target SDK 35 (Android 15) Enforcement",
    tag: "Mandatory Compliance",
    description:
      "Full API level 35 compatibility ensuring access to predictive back animations, granular media permissions, and Google Play Store 2026 eligibility.",
  },
  {
    title: "16 KB Memory Page Size ELF Alignment",
    tag: "Hardware Stability",
    description:
      "All native shared libraries (.so files) verified with APK Analyzer for 16KB segment alignment, preventing crashes on modern ARM64 flagship devices.",
  },
  {
    title: "Android App Bundle (.AAB) with R8 Shrinking",
    tag: "Binary Optimization",
    description:
      "Automated ProGuard / R8 code shrinking and resource optimization, delivering compact download sizes under 15MB with full bytecode obfuscation.",
  },
  {
    title: "Apple Privacy Manifests (PrivacyInfo.xcprivacy)",
    tag: "App Store Ready",
    description:
      "Strict declaration of Required Reason APIs and zero unauthorized tracking SDKs, guaranteeing immediate approval on Apple App Store Connect.",
  },
  {
    title: "14-Day 20-Tester Closed Testing Cohort",
    tag: "Play Console Protocol",
    description:
      "MLHK Infotech manages the mandatory 14-day continuous closed testing phase with 20 opted-in testers for newly created Google Play developer accounts.",
  },
  {
    title: "Battery Doze Mode & WakeLock Optimization",
    tag: "Power Efficiency",
    description:
      "Eliminating continuous wake locks in favor of batched WorkManager jobs, preserving user battery health and maintaining high Play Console Android Vitals scores.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function MobileAppShowcase() {
  // Archetype state
  const [activeArchetype, setActiveArchetype] = useState<ArchetypeId>("logistics");
  const currentArchetype =
    MOBILE_ARCHETYPES.find((a) => a.id === activeArchetype) ?? MOBILE_ARCHETYPES[0];

  // Simulator state
  const [activeScreen, setActiveScreen] = useState<"offline" | "scanner" | "biometric" | "profiler">("offline");
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [offlineRecords, setOfflineRecords] = useState<string[]>([
    "INSP-2026-081 • Warehouse North Bay",
    "INSP-2026-082 • Cold Storage Unit 4",
    "INSP-2026-083 • Generator Backup Check",
  ]);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("dao");
  const [copiedCode, setCopiedCode] = useState(false);

  // Toggle Network State
  const toggleNetwork = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    if (!nextState && offlineRecords.length > 0) {
      // Reconnected!
      setSyncStatus("syncing");
      setTimeout(() => {
        setSyncStatus("synced");
        setTimeout(() => {
          setOfflineRecords([]);
          setSyncStatus("idle");
        }, 1500);
      }, 1200);
    }
  };

  // Add Local Record while in Field
  const addLocalRecord = () => {
    const id = `INSP-2026-0${84 + offlineRecords.length} • Sector ${String.fromCharCode(65 + offlineRecords.length)} Audit`;
    setOfflineRecords((prev) => [id, ...prev]);
  };

  // Barcode Scanner Trigger
  const triggerScan = () => {
    setIsScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult("MLHK-SKU-994182-MP-GSTIN23");
    }, 700);
  };

  // Biometric Auth Trigger
  const triggerBiometric = () => {
    setIsAuthenticating(true);
    setBiometricAuthenticated(false);
    setTimeout(() => {
      setIsAuthenticating(false);
      setBiometricAuthenticated(true);
    }, 850);
  };

  // Copy code snippet
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentSnippet =
    MOBILE_CODE_SNIPPETS.find((s) => s.id === activeCodeTab) ?? MOBILE_CODE_SNIPPETS[0];

  return (
    <div className="space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SHOWCASE CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#090b10] via-[#06070a] to-[#040507] p-6 md:p-12 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]">
        {/* Ambient atmospheric glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#ff9f1c]/10 blur-[140px]"
        />

        {/* Header Capsule */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <Smartphone className="size-3.5 text-emerald-400" />
                Native Mobile Engineering Lab
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono text-zinc-300">
                Android 15 • Target SDK 35 • iOS Swift
              </span>
              <span className="rounded-full border border-[#ff9f1c]/30 bg-[#ff9f1c]/10 px-3 py-1 text-[10px] font-mono text-[#ffb84d]">
                16 KB Page-Aligned
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Hardware-Accelerated Mobile Laboratory
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              Test how MLHK native mobile software handles extreme real-world operating conditions:
              complete cellular dropouts, hardware camera laser scanning, BiometricPrompt KeyStore
              vaults, and sub-40MB RAM execution.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "offline", label: "Offline Sync", icon: WifiOff },
              { id: "scanner", label: "CameraX 1.4+", icon: ScanBarcode },
              { id: "biometric", label: "Biometric Auth", icon: Fingerprint },
              { id: "profiler", label: "Android 15 RAM", icon: Cpu },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveScreen(s.id as typeof activeScreen)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                    activeScreen === s.id
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE DEVICE STUDIO (MOCKUP + CONTROLS)
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 items-center">
          {/* Realistic Phone Device Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[330px] rounded-[3.25rem] border-[7px] border-zinc-800 bg-[#07090c] p-3.5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.98)] ring-1 ring-white/15">
              {/* Antenna Band Highlights */}
              <div aria-hidden className="absolute left-[-7px] top-28 h-6 w-[2px] bg-white/20" />
              <div aria-hidden className="absolute right-[-7px] top-36 h-6 w-[2px] bg-white/20" />

              {/* Dynamic Island / Hardware Ear-Piece */}
              <div className="mx-auto mb-3 h-5 w-28 rounded-full bg-black flex items-center justify-between px-3 border border-white/10">
                <span className="size-2 rounded-full bg-zinc-900 border border-zinc-700" />
                <span className="text-[8px] font-mono font-semibold tracking-wider text-emerald-400">
                  {syncStatus === "syncing" ? "SYNCING..." : isOffline ? "OFFLINE" : "READY"}
                </span>
                <span className="size-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Mobile Status Bar */}
              <div className="flex items-center justify-between px-3 text-[10px] font-mono text-zinc-400 mb-2.5">
                <span className="font-bold text-white">09:41</span>
                <div className="flex items-center gap-2">
                  {isOffline ? (
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <WifiOff className="size-3" /> Airplane
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Wifi className="size-3" /> 5G Edge
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    <span>98%</span>
                    <Battery className="size-3 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Smartphone Viewport Screen */}
              <div className="min-h-[420px] rounded-[2.25rem] border border-white/10 bg-[#030406] p-4 flex flex-col justify-between overflow-hidden relative">
                {/* 1. SCREEN: OFFLINE SYNC */}
                {activeScreen === "offline" && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="text-xs font-bold text-white block">Field Ops Desk</span>
                        <span className="text-[9px] text-zinc-500 font-mono">
                          Room SQLite • Local Encrypted
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-bold ${
                          isOffline
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {isOffline ? "DISCONNECTED" : "CONNECTED"}
                      </span>
                    </div>

                    <div
                      className={`rounded-xl border p-3 transition-colors ${
                        isOffline
                          ? "border-amber-500/30 bg-amber-500/10"
                          : "border-emerald-500/30 bg-emerald-500/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isOffline ? (
                          <WifiOff className="size-4 text-amber-400" />
                        ) : (
                          <Wifi className="size-4 text-emerald-400" />
                        )}
                        <span className="text-xs font-semibold text-white">
                          {isOffline ? "Offline Storage Active" : "Edge Synchronized"}
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-400 leading-relaxed">
                        {isOffline
                          ? "Cellular signal dropped. Mutations write directly to local SQLite DB with zero latency."
                          : "Connected to Cloudflare D1 gateway. WorkManager background worker idle."}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span>Queued Local Records:</span>
                        <span className="font-mono font-bold text-white">
                          {offlineRecords.length} Mutations
                        </span>
                      </div>

                      <div className="max-h-32 space-y-1 overflow-y-auto pr-1">
                        {offlineRecords.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-white/10 p-3 text-center text-[10px] text-zinc-500">
                            Queue is empty. All records synced.
                          </div>
                        ) : (
                          offlineRecords.map((rec, i) => (
                            <div
                              key={rec}
                              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[10px]"
                            >
                              <span className="truncate text-zinc-300">{rec}</span>
                              <span className="font-mono text-[9px] text-[#ffb84d]">
                                {isOffline ? "PENDING" : "SYNCED"}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addLocalRecord}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 text-center text-[11px] font-semibold text-white transition-all hover:bg-white/[0.08]"
                    >
                      + Add Inspection Record
                    </button>

                    {syncStatus === "syncing" && (
                      <div className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-2 text-center text-[10px] font-mono text-cyan-300 flex items-center justify-center gap-2">
                        <RefreshCw className="size-3 animate-spin" />
                        Delta Replaying Mutations...
                      </div>
                    )}
                    {syncStatus === "synced" && (
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2 text-center text-[10px] font-mono text-emerald-300 flex items-center justify-center gap-2">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        Sync Completed in 118ms!
                      </div>
                    )}
                  </div>
                )}

                {/* 2. SCREEN: CAMERAX BARCODE SCANNER */}
                {activeScreen === "scanner" && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="text-xs font-bold text-white block">CameraX Optical HAL</span>
                        <span className="text-[9px] text-zinc-500 font-mono">Google ML Kit Model</span>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-mono text-emerald-300 border border-emerald-500/30">
                        60.0 FPS
                      </span>
                    </div>

                    {/* Viewfinder HUD */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl border border-cyan-500/40 bg-cyan-950/20 p-3 flex flex-col items-center justify-center overflow-hidden">
                      {/* Corner HUD Brackets */}
                      <div className="absolute left-3 top-3 size-4 border-l-2 border-t-2 border-cyan-400" />
                      <div className="absolute right-3 top-3 size-4 border-r-2 border-t-2 border-cyan-400" />
                      <div className="absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-cyan-400" />
                      <div className="absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-cyan-400" />

                      <QrCode className="size-16 text-cyan-400/70" />

                      {/* Laser Sweep */}
                      <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] animate-pulse" />
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">
                        Decoded Optical Payload:
                      </span>
                      <span className="font-mono text-[11px] font-bold text-emerald-400 block mt-0.5">
                        {scannedResult || (isScanning ? "Decoding neural matrix..." : "Align barcode within HUD")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={triggerScan}
                      disabled={isScanning}
                      className="w-full rounded-xl border border-cyan-500/40 bg-cyan-500/10 py-2 text-center text-[11px] font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
                    >
                      {isScanning ? "Processing Lens Frame..." : "Trigger Camera Shutter"}
                    </button>
                  </div>
                )}

                {/* 3. SCREEN: BIOMETRIC AUTH */}
                {activeScreen === "biometric" && (
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 text-left">
                      <div>
                        <span className="text-xs font-bold text-white block">BiometricPrompt</span>
                        <span className="text-[9px] text-zinc-500 font-mono">StrongBox KeyStore</span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400">Class 3 (Strong)</span>
                    </div>

                    <div className="py-4 flex flex-col items-center">
                      <div
                        className={`flex size-16 items-center justify-center rounded-full border transition-all ${
                          biometricAuthenticated
                            ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.4)]"
                            : "border-[#ff9f1c]/40 bg-[#ff9f1c]/10 text-[#ffb84d]"
                        }`}
                      >
                        <Fingerprint className="size-9" />
                      </div>
                      <span className="mt-3 text-xs font-semibold text-white">
                        {biometricAuthenticated ? "Identity Cryptographically Valid" : "Touch Sensor"}
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">
                        {biometricAuthenticated
                          ? "RS256 JWT Signed by KeyStore"
                          : "Authenticate with fingerprint or FaceID"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/60 p-2 text-left font-mono text-[9px] text-zinc-400 break-all">
                      <code>
                        {biometricAuthenticated
                          ? "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLW1saGstOTgyMSIsImtleVNpZyI6IjE2a2Itc3Ryb25nYm94In0..."
                          : "Awaiting hardware keystore authorization..."}
                      </code>
                    </div>

                    <button
                      type="button"
                      onClick={triggerBiometric}
                      disabled={isAuthenticating}
                      className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2 text-center text-[11px] font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20"
                    >
                      {isAuthenticating ? "Validating Sensor Enclave..." : "Simulate Biometric Sensor"}
                    </button>
                  </div>
                )}

                {/* 4. SCREEN: ANDROID 15 MEMORY PROFILER */}
                {activeScreen === "profiler" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className="text-xs font-bold text-white block">Android 15 Profiler</span>
                        <span className="text-[9px] text-zinc-500 font-mono">Target SDK 35 • ARM64</span>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-mono text-emerald-300 border border-emerald-500/30">
                        16 KB ELF
                      </span>
                    </div>

                    {/* Native Stats */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-zinc-300 font-semibold">MLHK Native Kotlin/Java:</span>
                        <span className="font-mono font-bold text-emerald-400">38 MB RAM</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[16%] rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex justify-between text-[9px] text-zinc-400 pt-0.5">
                        <span>Frame Rate: 60.0 FPS Locked</span>
                        <span>Battery: 1.2% / hr</span>
                      </div>
                    </div>

                    {/* Webview Stats */}
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-zinc-300 font-semibold">Generic WebView Wrapper:</span>
                        <span className="font-mono font-bold text-rose-400">240 MB RAM</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[85%] rounded-full bg-rose-500" />
                      </div>
                      <div className="flex justify-between text-[9px] text-zinc-400 pt-0.5">
                        <span>Frame Rate: 34–48 FPS Lag</span>
                        <span>Battery: 8.4% / hr</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[10px] text-zinc-400 text-center font-mono">
                      Cold Start: 0.38s (Native) vs 2.80s (WebView)
                    </div>
                  </div>
                )}

                {/* Bottom App Bar Navigation Dots */}
                <div className="mt-2 pt-2 border-t border-white/5 flex justify-around text-zinc-600">
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/40" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Controller & Live Diagnostics */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
                Simulator Remote Controller
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Real-Time Hardware Stress Test
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Trigger physical device events to see how our native application handles intermittent
                connections, hardware optical decoders, and secure biometrics without crashing.
              </p>
            </div>

            {/* Interactive Controller Buttons */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={toggleNetwork}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  {isOffline ? (
                    <WifiOff className="size-4 text-amber-400" />
                  ) : (
                    <Wifi className="size-4 text-emerald-400" />
                  )}
                  <span>Signal Dropout</span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold ${
                    isOffline
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {isOffline ? "OFFLINE" : "5G ONLINE"}
                </span>
              </button>

              <button
                type="button"
                onClick={triggerScan}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <ScanBarcode className="size-4 text-cyan-400" />
                  <span>Optical Barcode</span>
                </div>
                <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                  SCAN SHUTTER
                </span>
              </button>

              <button
                type="button"
                onClick={triggerBiometric}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-emerald-500/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <Fingerprint className="size-4 text-emerald-400" />
                  <span>Biometric Enclave</span>
                </div>
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  VERIFY KEY
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveScreen("profiler")}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-semibold text-white transition-all hover:border-[#ff9f1c]/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="size-4 text-[#ffb84d]" />
                  <span>RAM &amp; Battery Audit</span>
                </div>
                <span className="rounded-md bg-[#ff9f1c]/20 px-2 py-0.5 text-[10px] font-mono text-[#ffb84d]">
                  38 MB NATIVE
                </span>
              </button>
            </div>

            {/* Technical Hardware Capsule */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Database className="size-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Android Jetpack &amp; 16 KB Page Alignment Specs
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">
                Targeting Android 15 (API Level 35) requires 16 KB ELF segment alignment for all native
                shared libraries (<code className="text-emerald-300 font-mono">.so</code> files) to prevent system crashes on modern ARM64 chips.
                Our Room SQLite database persists transactions locally with automated migrations,
                while WorkManager batches delta syncs to respect Android Doze mode and preserve battery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ENTERPRISE PROJECT CLASS ARCHITECTURE SELECTOR
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <Layers className="size-3.5" />
            Project Class Architectures
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Choose Your Mobile Architecture Blueprint
          </h3>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            We don’t treat an offline warehouse inventory app the same as a consumer fintech checkout.
            Explore our architectural recipes tailored for specific enterprise workloads.
          </p>
        </div>

        {/* Archetype Selector Pills */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MOBILE_ARCHETYPES.map((arch) => (
            <button
              key={arch.id}
              type="button"
              onClick={() => setActiveArchetype(arch.id)}
              className={`flex flex-col text-left rounded-2xl border p-5 transition-all duration-300 ${
                activeArchetype === arch.id
                  ? "border-emerald-500/60 bg-emerald-500/10 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                {arch.badge}
              </span>
              <h4 className="mt-2 font-display text-base font-bold text-white">{arch.title}</h4>
              <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{arch.tagline}</p>
            </button>
          ))}
        </div>

        {/* Detailed Active Archetype Card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Selected Blueprint: {currentArchetype.badge}
                </span>
                <h4 className="mt-2 font-display text-2xl font-bold text-white">
                  {currentArchetype.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {currentArchetype.description}
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-1.5">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Ideal Commercial Demographics:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {currentArchetype.targetClients}
                </p>
              </div>

              {/* Stack Specs Grid */}
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    Core Language:
                  </span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {currentArchetype.stack.coreLanguage}
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    UI Framework:
                  </span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {currentArchetype.stack.uiArchitecture}
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    Local Persistence:
                  </span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {currentArchetype.stack.localPersistence}
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    Hardware / HAL:
                  </span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {currentArchetype.stack.hardwareBindings}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Benchmarks Rail */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block">
                  Measured Performance Benchmarks
                </span>
                <h5 className="mt-1 font-display text-lg font-bold text-white">
                  Hardware Metrics &amp; Constraints
                </h5>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400">RAM Footprint:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {currentArchetype.metrics.ramUsage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400">Frame Rendering:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {currentArchetype.metrics.frameRate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400">Offline DB Latency:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {currentArchetype.metrics.offlineLatency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400">Cold Start Time:</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {currentArchetype.metrics.coldStartTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/20">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  Security Guarantee:
                </span>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  {currentArchetype.security}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PRODUCTION APP STORE & PLAY STORE READINESS MATRIX
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <FileCheck2 className="size-3.5" />
            2026 Store Compliance
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Google Play Store &amp; Apple App Store Production Gates
          </h3>
          <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
            Zero rejections. Every release binary undergoes automated pre-flight checks for Android 15
            16KB page size alignment, Target SDK 35, Apple Privacy Manifests, and 14-day tester cohorts.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTION_GATES.map((gate) => (
            <div
              key={gate.title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  {gate.tag}
                </span>
                <CheckCircle2 className="size-4 text-emerald-400" />
              </div>
              <h4 className="mt-4 font-display text-base font-bold text-white">{gate.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{gate.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: PRODUCTION MOBILE CODE STACK INSPECTOR
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              <Code2 className="size-3.5" />
              Code Stack Inspector
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Inspect Our Production Native Code
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-xl">
              Clean, modular Kotlin architecture. Zero third-party spyware SDKs. Inspect how our DAOs,
              CameraX image analyzers, and biometric enclaves are authored.
            </p>
          </div>

          {/* Code Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {MOBILE_CODE_SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setActiveCodeTab(snippet.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                  activeCodeTab === snippet.id
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                {snippet.filename}
              </button>
            ))}
          </div>
        </div>

        {/* Code Terminal Display */}
        <div className="relative rounded-2xl border border-white/10 bg-[#06080b] p-6 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-500/80" />
              <span className="size-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-zinc-400 text-[11px]">{currentSnippet.filename}</span>
            </div>

            <button
              type="button"
              onClick={() => handleCopyCode(currentSnippet.code)}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-white/[0.08]"
            >
              {copiedCode ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 mb-3">{currentSnippet.description}</p>

          <pre className="overflow-x-auto text-zinc-200 leading-relaxed text-[11px] p-2 bg-black/40 rounded-xl">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
