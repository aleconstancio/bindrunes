export function hexToOklch(hex: string): string {
	const h = hex.replace("#", "");

	const r = parseInt(h.substring(0, 2), 16) / 255;
	const g = parseInt(h.substring(2, 4), 16) / 255;
	const b = parseInt(h.substring(4, 6), 16) / 255;

	const rl = r <= 0.04045 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
	const gl = g <= 0.04045 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
	const bl = b <= 0.04045 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

	const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
	const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
	const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	const C = Math.sqrt(a * a + b2 * b2);
	const H = Math.atan2(b2, a) * (180 / Math.PI);

	return `oklch(${L.toFixed(2)} ${C.toFixed(3)} ${((H + 360) % 360).toFixed(0)})`;
}

export function oklchToHex(oklchStr: string): string {
	const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return "#000000";

	const L = parseFloat(match[1]);
	const C = parseFloat(match[2]);
	const hDeg = parseFloat(match[3]);
	const hRad = hDeg * (Math.PI / 180);

	const a = C * Math.cos(hRad);
	const b = C * Math.sin(hRad);

	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;

	let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	let bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

	r = r <= 0.0031308 ? 12.92 * r : 1.055 * r ** (1 / 2.4) - 0.055;
	g = g <= 0.0031308 ? 12.92 * g : 1.055 * g ** (1 / 2.4) - 0.055;
	bl = bl <= 0.0031308 ? 12.92 * bl : 1.055 * bl ** (1 / 2.4) - 0.055;

	r = Math.max(0, Math.min(1, r));
	g = Math.max(0, Math.min(1, g));
	bl = Math.max(0, Math.min(1, bl));

	const toHex = (v: number) =>
		Math.round(v * 255)
			.toString(16)
			.padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}
