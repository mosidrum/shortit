import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string, id?: string) =>
    sonnerToast.success(message, {
      id: id || `success-${Date.now()}`,
      className: 'toast-success'
    }),

  error: (message: string, id?: string) =>
    sonnerToast.error(message, {
      id: id || `error-${Date.now()}`,
      className: 'toast-error'
    }),

  info: (message: string, id?: string) =>
    sonnerToast.info(message, {
      id: id || `info-${Date.now()}`,
      className: 'toast-info'
    })
};
