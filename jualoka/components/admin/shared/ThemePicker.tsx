import { CheckCircle2 } from "lucide-react"
import {
    BannerTheme,
    THEME_COLORS,
    THEME_LABELS,
} from "@/lib/bannerStore"

const THEMES: BannerTheme[] = ["green", "blue", "purple", "orange", "red", "custom"]

export function ThemePicker({ value, onChange }: { value: BannerTheme; onChange: (t: BannerTheme) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {THEMES.map((theme) => (
                <button
                    key={theme}
                    type="button"
                    title={THEME_LABELS[theme]}
                    onClick={() => onChange(theme)}
                    className={`relative h-9 w-9 rounded-xl transition-all duration-200 ring-offset-2 ${value === theme ? "ring-2 ring-primary scale-110" : "hover:scale-105"}`}
                    style={{
                        background:
                            theme === "custom"
                                ? "linear-gradient(135deg, #888, #bbb)"
                                : `linear-gradient(135deg, ${THEME_COLORS[theme]}, ${THEME_COLORS[theme]}99)`,
                    }}
                >
                    {theme === "custom" && (
                        <span className="text-[8px] text-white font-bold leading-none">✎</span>
                    )}
                    {value === theme && (
                        <CheckCircle2 className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                    )}
                </button>
            ))}
        </div>
    )
}
