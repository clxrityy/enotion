import { useState, useEffect, useRef } from "react";
import type { Notification, Position } from "../types";
import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core";

interface NotificationItemProps {
  notification: Notification;
  onDismiss: () => void;
  position: Position;
  pauseOnHover: boolean;
  colorPalette?: ColorPaletteType;
}

export function NotificationItem({
  notification,
  onDismiss,
  position,
  pauseOnHover,
  colorPalette,
}: NotificationItemProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [isExisting, setIsExisting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number>(notification.duration);
  const startTimeRef = useRef<number | null>(null);

  const handleDismiss = () => {
    setIsExisting(true);

    // Call user's onDismiss callback if provided
    if (notification.onDismiss) {
      notification.onDismiss();
    }

    // Animate out before removing
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const startTimer = () => {
    if (notification.duration === Infinity) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    if (notification.duration === Infinity) return;

    if (startTimeRef.current) {
      const elapsedTime = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(
        0,
        remainingTimeRef.current - elapsedTime,
      );
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  useEffect(() => {
    // animate in
    requestAnimationFrame(() => {
      setVisible(true);
    });

    // set up timer for auto-dismiss
    if (notification.duration !== Infinity) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notification.duration]);

  // Handle pause on hover
  useEffect(() => {
    if (isPaused && pauseOnHover) {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [isPaused, pauseOnHover]);

  const getIconComponent = () => {
    switch (notification.type) {
      case "success":
        return <Icons.Success />;
      case "error":
        return <Icons.Error />;
      case "info":
        return <Icons.Info />;
      case "warning":
        return <Icons.Warning />;
      case "loading":
        return <Icons.Loading />;
      default:
        return notification.icon || <Icons.Notifications />;
    }
  };

  // Get animation classes based on position
  const getAnimationClass = () => {
    const positionToAnimationMap: Record<
      Position,
      { enter: string; exit: string }
    > = {
      "top-right": { enter: "slide-in-right", exit: "slide-out-right" },
      "top-left": { enter: "slide-in-left", exit: "slide-out-left" },
      "top-center": { enter: "slide-in-down", exit: "slide-out-up" },
      "bottom-right": { enter: "slide-in-right", exit: "slide-out-right" },
      "bottom-left": { enter: "slide-in-left", exit: "slide-out-left" },
      "bottom-center": { enter: "slide-in-up", exit: "slide-out-down" },
    };

    const animations = positionToAnimationMap[position];

    if (isExisting) {
      return animations.exit;
    }
    if (visible) {
      return animations.enter;
    }
    return "";
  };

  const palette = colorPalette && ColorPalettes[colorPalette];

  // Calculate theme-based styles
  const getStyles = () => {
    let baseTheme = {
      success: { background: "#10B981", color: "white" },
      error: { background: "#EF4444", color: "white" },
      info: { background: "#3B82F6", color: "white" },
      warning: { background: "#F59E0B", color: "white" },
      loading: { background: "#6B7280", color: "white" },
      default: { background: "white", color: "black" },
    };

    if (palette) {
      baseTheme = {
        success: { background: palette.success, color: palette.foreground },
        error: { background: palette.error, color: palette.foreground },
        info: { background: palette.info, color: palette.foreground },
        warning: { background: palette.warning, color: palette.foreground },
        loading: { background: palette.muted, color: palette.foreground },
        default: { background: palette.info, color: palette.foreground },
      };
    }

    const typeTheme = baseTheme[notification.type] || baseTheme.default;

    return {
      ...typeTheme,
      ...notification.style,
    };
  };

  return (
    <div
      className={`enotion-notification ${notification.className || ""} ${getAnimationClass()}`}
      style={{
        maxWidth: "350px",
        minWidth: "200px",
        margin: "0.5rem",
        padding: "0.75rem 1rem",
        borderRadius: "0.375rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        ...getStyles(),
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => notification.dismissible && handleDismiss()}
      role="alert"
      aria-live="polite"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          notification.dismissible && handleDismiss();
        }
      }}
    >
      {getIconComponent() && (
        <div
          className={`enotion-notification-icon ${notification.type === "loading" && "loading-spin"}`}
          style={{
            marginRight: "0.75rem",
          }}
        >
          {getIconComponent()}
        </div>
      )}
      <div className="enotion-notification-content">{notification.message}</div>
      {notification.dismissible && (
        <button
          type="button"
          title="dismiss"
          name="close"
          className="enotion-notification-dismiss"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          style={{
            background: "transparent",
            border: "none",
            marginLeft: "auto",
            padding: "0.25rem",
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
          }}
        >
          <Icons.Close />
        </button>
      )}
    </div>
  );
}
