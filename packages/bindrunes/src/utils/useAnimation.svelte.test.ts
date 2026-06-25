import { describe, expect, it } from "vitest";
import { useAnimation } from "./useAnimation";

describe("useAnimation", () => {
	it("returns CSS class names for all animation types", () => {
		const anim = useAnimation();

		expect(anim.enter).toBe("animate-enter");
		expect(anim.exit).toBe("animate-exit");
		expect(anim.slideUp).toBe("animate-slide-up");
		expect(anim.fadeIn).toBe("animate-fade-in");
		expect(anim.scaleIn).toBe("animate-scale-in");
		expect(anim.slideDown).toBe("animate-slide-down");
		expect(anim.slideLeft).toBe("animate-slide-left");
		expect(anim.slideRight).toBe("animate-slide-right");
	});
});
