export interface TransitionOptions {
	readonly enter?: string;
	readonly exit?: string;
	readonly duration?: number;
}

export function createTransition(element: HTMLElement, options: TransitionOptions = {}) {
	const { enter = "animate-enter", exit = "animate-exit", duration = 200 } = options;

	return {
		enter() {
			element.classList.add(enter);
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					element.classList.remove(enter);
					resolve();
				}, duration);
			});
		},

		exit() {
			element.classList.add(exit);
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					element.classList.remove(exit);
					resolve();
				}, duration);
			});
		},

		toggle(isVisible: boolean) {
			if (isVisible) {
				return this.enter();
			}
			return this.exit();
		},
	};
}
