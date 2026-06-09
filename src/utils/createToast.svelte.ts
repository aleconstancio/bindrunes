import { toast as sonnerToast } from 'svelte-sonner';

type ToastOptions = {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

type CreateToastOptions = {
  defaultDuration?: number;
  position?: ToastOptions['position'];
};

export function createToast(options?: CreateToastOptions) {
  const defaults = {
    duration: options?.defaultDuration ?? 4000,
    position: options?.position ?? 'bottom-right',
  };

  return {
    success(message: string, opts?: ToastOptions) {
      return sonnerToast.success(message, { ...defaults, ...opts });
    },
    error(message: string, opts?: ToastOptions) {
      return sonnerToast.error(message, { ...defaults, duration: opts?.duration ?? 5000, ...opts });
    },
    warning(message: string, opts?: ToastOptions) {
      return sonnerToast.warning(message, { ...defaults, ...opts });
    },
    info(message: string, opts?: ToastOptions) {
      return sonnerToast.info(message, { ...defaults, ...opts });
    },
    dismiss(toastId?: string | number) {
      return sonnerToast.dismiss(toastId);
    },
  };
}
