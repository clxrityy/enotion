import { createContext, useReducer, useContext, useMemo } from "react";
import type {
  Notification,
  NotificationState,
  Position,
} from "../types";
import { NotificationContainer } from "../components";
import { ColorPaletteType } from "@enotion/core";

const defaultState: NotificationState = {
  notifications: [],
  pauseOnHover: true,
  maxNotifications: 5,
};

// Action types
type Action =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: { id: string } }
  | {
    type: "UPDATE_NOTIFICATION";
    payload: Partial<Notification> & { id: string };
  }
  | { type: "DISMISS_ALL" };

// Create context
type NotificationContextValue = {
  state: NotificationState;
  addNotification: (notification: Omit<Notification, "id">) => string;
  dismissNotification: (id: string) => void;
  updateNotification: (id: string, partial: Partial<Notification>) => void;
  dismissAll: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

// Reducer function
function notificationReducer(
  state: NotificationState,
  action: Action,
): NotificationState {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload].slice(
          -state.maxNotifications,
        ),
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id,
        ),
      };
    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id
            ? { ...notification, ...action.payload }
            : notification,
        ),
      };
    case "DISMISS_ALL":
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
}

export function NotificationProvider({
  children,
  position = "top-right",
  maxNotifications = 5,
  pauseOnHover = true,
  colorPalette,
}: {
  children: React.ReactNode;
  position?: Position;
  maxNotifications?: number;
  pauseOnHover?: boolean;
  colorPalette?: ColorPaletteType;
}) {
  const [state, dispatch] = useReducer(notificationReducer, {
    ...defaultState,
    maxNotifications,
    pauseOnHover,
  });

  const contextValue = useMemo(
    () => ({
      state,
      addNotification: (notification: Omit<Notification, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        const timestamp = Date.now();
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: { ...notification, id, timestamp },
        });
        return id;
      },
      dismissNotification: (id: string) => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: { id } });
      },
      updateNotification: (id: string, partial: Partial<Notification>) => {
        dispatch({ type: "UPDATE_NOTIFICATION", payload: { id, ...partial } });
      },
      dismissAll: () => {
        dispatch({ type: "DISMISS_ALL" });
      },
    }),
    [state],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer
        position={position}
        pauseOnHover={state.pauseOnHover}
        colorPalette={colorPalette}
      />
    </NotificationContext.Provider>
  );
}

// Hook to use the context
export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
}
