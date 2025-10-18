import { CSSProperties, ReactNode } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading"
  | "default";

export type Position =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface Notification {
  id: string;
  message: string | ReactNode;
  type: NotificationType;
  duration: number;
  timestamp: number;
  dismissible?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onDismiss?: () => void;
}

export interface NotifyOptions {
  type?: NotificationType;
  duration?: number;
  dismissible?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onDismiss?: () => void;
}

export interface NotificationState {
  notifications: Notification[];
  pauseOnHover: boolean;
  maxNotifications: number;
}

export interface NotificationProps {
  children: ReactNode;
  position?: Position;
  maxNotifications?: number;
  pauseOnHover?: boolean;
}
