import { CSSProperties, useEffect, useState } from "react";
import { useNotificationContext } from "../context";
import { createPortal } from "react-dom";
import type { Position } from "../types";
import "../styles/animations.css";
import { NotificationItem } from "./NotificationItem";
import { ColorPaletteType } from "@enotion/core";

interface NotificationContainerProps {
  position?: Position;
  colorPalette?: ColorPaletteType;
  pauseOnHover?: boolean;
}

export function NotificationContainer({
  position = "top-right",
  pauseOnHover = true,
  colorPalette,
}: NotificationContainerProps) {
  const { state, dismissNotification } = useNotificationContext();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const containerStyles: CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: getFlexDirection(position),
    ...(position.includes("top") ? { top: "1rem" } : { bottom: "1rem" }),
    ...(position.includes("right") ? { right: "1rem" } : {}),
    ...(position.includes("left") ? { left: "1rem" } : {}),
    ...(position.includes("center")
      ? {
        left: "50%",
        transform: "translateX(-50%)",
        alignItems: "center",
      }
      : {}),
  };

  const container = (
    <div
      className="enotion-notification-conainter"
      style={containerStyles as CSSProperties}
      role="alert"
    >
      {state.notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
          pauseOnHover={pauseOnHover}
          position={position}
          colorPalette={colorPalette}
        />
      ))}
    </div>
  );

  return createPortal(container, document.body);
}

function getFlexDirection(position: Position): CSSProperties["flexDirection"] {
  return position.includes("bottom") ? "column-reverse" : "column";
}
