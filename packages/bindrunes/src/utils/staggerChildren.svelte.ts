export interface StaggerOptions {
	readonly delay?: number;
	readonly animation?: string;
}

export function staggerChildren(parent: HTMLElement, options: StaggerOptions = {}) {
	const { delay = 50, animation = "animate-slide-up" } = options;

	return {
		animate() {
			const children = parent.children;
			for (let i = 0; i < children.length; i++) {
				const child = children[i] as HTMLElement;
				setTimeout(() => {
					child.classList.add(animation);
					setTimeout(() => {
						child.classList.remove(animation);
					}, 300);
				}, i * delay);
			}
		},
	};
}
