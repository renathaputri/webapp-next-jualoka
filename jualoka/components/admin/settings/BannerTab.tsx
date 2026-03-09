"use client"

import { useState, useTransition } from "react"
import { Eye, RotateCcw, Save, Type, Palette, Layout, ImageIcon, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BannerConfig,
    BannerLayout as BannerLayoutType,
    getBannerConfig,
    saveBannerConfig,
    resetBannerConfig,
} from "@/lib/bannerStore"
import { BannerPreview } from "@/components/admin/shared/BannerPreview"
import { ThemePicker } from "@/components/admin/shared/ThemePicker"
import { Toast } from "@/components/admin/shared/Toast"

const INPUT = "w-full rounded-xl border border-border bg-[#f8fafb] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"

export function BannerTab() {
    const [config, setConfig] = useState<BannerConfig>(() => getBannerConfig())
    const [showPreview, setShowPreview] = useState(true)
    const [toast, setToast] = useState(false)
    const [, startTransition] = useTransition()

    function patch<K extends keyof BannerConfig>(key: K, value: BannerConfig[K]) {
        setConfig((prev) => ({ ...prev, [key]: value }))
    }

    function handleSave() {
        saveBannerConfig(config)
        setToast(true)
        setTimeout(() => setToast(false), 2800)
    }

    function handleReset() {
        startTransition(() => {
            resetBannerConfig()
            setConfig(getBannerConfig())
        })
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Action bar */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-muted-foreground text-sm">Atur tampilan banner di halaman toko Anda.</p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPreview((p) => !p)}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-white border border-border/60 rounded-xl px-3 py-2 transition-all hover:shadow-sm"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        {showPreview ? "Sembunyikan" : "Tampilkan"} Preview
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-white border border-border/60 rounded-xl px-3 py-2 transition-all hover:shadow-sm"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                        <Save className="h-3.5 w-3.5" />
                        Simpan
                    </button>
                </div>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between bg-white rounded-2xl border border-border/60 shadow-sm px-5 py-4">
                <div>
                    <p className="text-sm font-semibold">Tampilkan Banner</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Aktifkan atau sembunyikan banner di halaman toko.</p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={config.enabled}
                    onClick={() => patch("enabled", !config.enabled)}
                    className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-300 ${config.enabled ? "bg-primary" : "bg-muted"}`}
                >
                    <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 mt-0.5 ${config.enabled ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                </button>
            </div>

            {/* Preview */}
            {showPreview && (
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Eye className="h-3 w-3" /> Preview Langsung
                    </p>
                    {config.enabled ? (
                        <BannerPreview config={config} />
                    ) : (
                        <div className="rounded-2xl border-2 border-dashed border-border/60 bg-muted/30 flex items-center justify-center min-h-[100px] text-muted-foreground text-sm">
                            Banner dinonaktifkan.
                        </div>
                    )}
                </div>
            )}

            {/* Editor */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Content */}
                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader className="px-5 pt-5 pb-3">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Type className="h-4 w-4 text-primary" /> Konten Banner
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Teks Badge (opsional)</label>
                            <input type="text" className={INPUT} placeholder="Produk UMKM Pilihan" value={config.badge} onChange={(e) => patch("badge", e.target.value)} maxLength={40} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Judul Utama</label>
                            <textarea className={INPUT + " min-h-[80px] resize-none"} value={config.title} onChange={(e) => patch("title", e.target.value)} maxLength={120} rows={3} />
                            <p className="text-[11px] text-muted-foreground">Gunakan Enter untuk teks multi-baris</p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Deskripsi</label>
                            <textarea className={INPUT + " min-h-[60px] resize-none"} value={config.description} onChange={(e) => patch("description", e.target.value)} maxLength={180} rows={2} />
                        </div>
                    </CardContent>
                </Card>

                {/* Design */}
                <div className="flex flex-col gap-4">
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Palette className="h-4 w-4 text-primary" /> Tema Warna
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5 flex flex-col gap-3">
                            <ThemePicker value={config.theme} onChange={(t) => patch("theme", t)} />
                            {config.theme === "custom" && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground/80">Kelas Gradient (Tailwind)</label>
                                    <input type="text" className={INPUT} placeholder="from-[#1a7035] to-[#2ea855]" value={config.customGradient} onChange={(e) => patch("customGradient", e.target.value)} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Layout className="h-4 w-4 text-primary" /> Tata Letak
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <div className="flex gap-2">
                                {(["left", "center"] as BannerLayoutType[]).map((l) => (
                                    <button
                                        key={l}
                                        type="button"
                                        onClick={() => patch("layout", l)}
                                        className={`flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-all ${config.layout === l ? "border-primary bg-primary/10 text-primary" : "border-border bg-white text-muted-foreground hover:text-foreground hover:border-primary/40"}`}
                                    >
                                        {l === "left" ? "⬅ Kiri" : "⬛ Tengah"}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Image */}
            <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="px-5 pt-5 pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" /> Gambar Latar (Opsional)
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-foreground/80">URL Gambar</label>
                            <div className="flex gap-2">
                                <input type="url" className={INPUT} placeholder="https://images.unsplash.com/..." value={config.imageUrl} onChange={(e) => patch("imageUrl", e.target.value)} />
                                {config.imageUrl && (
                                    <button type="button" onClick={() => patch("imageUrl", "")} className="shrink-0 rounded-xl border border-border bg-white px-3 text-xs text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors">
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Transparansi: {config.imageOpacity}%</label>
                            <input type="range" min={0} max={60} step={5} value={config.imageOpacity} onChange={(e) => patch("imageOpacity", Number(e.target.value))} className="w-full accent-primary h-2 mt-1" />
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                                <span>Transparan</span><span>Kuat</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-blue-700">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <p className="text-xs leading-relaxed">
                    <strong>Catatan:</strong> Fungsi simpan masih <em>dummy (in-memory)</em> — pada versi produksi akan tersambung ke database.
                </p>
            </div>

            <Toast visible={toast} message="Banner berhasil disimpan! ✨" />
        </div>
    )
}
