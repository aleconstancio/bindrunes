type ToastOptions = {
	duration?: number;
	action?: {
		label: string;
		onClick: () => void;
	};
	description?: string;
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
};

type CreateToastOptions = {
	defaultDuration?: number;
	position?: ToastOptions["position"];
};

async function getSonnerToast() {
	const { toast } = await import("svelte-sonner");
	return toast;
}

export function useToast(options?: CreateToastOptions) {
	const defaults = {
		duration: options?.defaultDuration ?? 4000,
		position: options?.position ?? "bottom-right",
	};

	return {
		async success(message: string, opts?: ToastOptions) {
			const toast = await getSonnerToast();
			return toast.success(message, { ...defaults, ...opts });
		},
		async error(message: string, opts?: ToastOptions) {
			const toast = await getSonnerToast();
			return toast.error(message, { ...defaults, duration: opts?.duration ?? 5000, ...opts });
		},
		async warning(message: string, opts?: ToastOptions) {
			const toast = await getSonnerToast();
			return toast.warning(message, { ...defaults, ...opts });
		},
		async info(message: string, opts?: ToastOptions) {
			const toast = await getSonnerToast();
			return toast.info(message, { ...defaults, ...opts });
		},
		async dismiss(toastId?: string | number) {
			const toast = await getSonnerToast();
			return toast.dismiss(toastId);
		},
	};
}
