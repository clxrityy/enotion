import { ReactNode, useCallback } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import type { NotifyOptions } from "../types";

export function useNotify() {
  const {
    addNotification,
    dismissNotification,
    updateNotification,
    dismissAll,
  } = useNotificationContext();

  const notify = useCallback(
    (message: string | React.ReactNode, options?: NotifyOptions) => {
      const id = addNotification({
        message,
        type: options?.type || "default",
        duration: options?.duration || 2500,
        timestamp: Date.now(),
        dismissible: options?.dismissible ?? true,
        icon: options?.icon,
        className: options?.className,
        style: options?.style,
        onDismiss: options?.onDismiss,
      });

      return {
        id,
        dismiss: () => dismissNotification(id),
        update: (
          newMessage: string | React.ReactNode,
          newOptions?: Partial<NotifyOptions>,
        ) => {
          updateNotification(id, {
            message: newMessage,
            ...newOptions,
          });
        },
      };
    },
    [addNotification, dismissNotification, updateNotification],
  );

  // Convenience methods for different notification types
  const success = useCallback(
    (
      message: string | React.ReactNode,
      options?: Omit<NotifyOptions, "type">,
    ) => notify(message, { ...options, type: "success" }),
    [notify],
  );

  const error = useCallback(
    (
      message: string | React.ReactNode,
      options?: Omit<NotifyOptions, "type">,
    ) => notify(message, { ...options, type: "error" }),
    [notify],
  );

  const info = useCallback(
    (
      message: string | React.ReactNode,
      options?: Omit<NotifyOptions, "type">,
    ) => notify(message, { ...options, type: "info" }),
    [notify],
  );

  const warning = useCallback(
    (
      message: string | React.ReactNode,
      options?: Omit<NotifyOptions, "type">,
    ) => notify(message, { ...options, type: "warning" }),
    [notify],
  );

  const loading = useCallback(
    (
      message: string | React.ReactNode,
      options?: Omit<NotifyOptions, "type">,
    ) =>
      notify(message, {
        ...options,
        type: "loading",
        duration: options?.duration || Infinity,
      }),
    [notify],
  );

  const promise = useCallback(
    (
      promise: Promise<any>,
      {
        loading,
        success,
        error,
        options,
      }: {
        loading: string | ReactNode;
        success: string | ReactNode | ((data: any) => string | ReactNode);
        error: string | ReactNode | ((err: any) => string | ReactNode);
        options?: Omit<NotifyOptions, "type">;
      },
    ) => {
      const notificationId = notify(loading, {
        ...options,
        type: "loading",
        duration: Infinity,
      });

      promise
        .then((data) => {
          const message =
            typeof success === "function" ? success(data) : success;

          notificationId.update(message, {
            type: "success",
            duration: options?.duration || 2500,
          });
          return data;
        })
        .catch((err) => {
          const message = typeof error === "function" ? error(err) : error;

          notificationId.update(message, {
            type: "error",
            duration: options?.duration || 2500,
          });
          return err;
        });

      return promise;
    },
    [notify],
  );

  return {
    notify,
    success,
    error,
    info,
    warning,
    loading,
    promise,
    dismissAll,
  };
}
