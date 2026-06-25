export interface UseAnimationResult {
	readonly enter: string;
	readonly exit: string;
	readonly slideUp: string;
	readonly fadeIn: string;
	readonly scaleIn: string;
	readonly slideDown: string;
	readonly slideLeft: string;
	readonly slideRight: string;
}

export function useAnimation(): UseAnimationResult {
	return {
		get enter() {
			return "animate-enter";
		},
		get exit() {
			return "animate-exit";
		},
		get slideUp() {
			return "animate-slide-up";
		},
		get fadeIn() {
			return "animate-fade-in";
		},
		get scaleIn() {
			return "animate-scale-in";
		},
		get slideDown() {
			return "animate-slide-down";
		},
		get slideLeft() {
			return "animate-slide-left";
		},
		get slideRight() {
			return "animate-slide-right";
		},
	};
}
