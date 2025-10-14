import { render, screen, waitFor } from "@testing-library/react";
import {
  NotificationProvider,
  useNotificationContext,
} from "../src/context/NotificationContext";
import { describe, it, expect } from "@jest/globals";

function TestComponent() {
  const {
    addNotification,
    dismissNotification,
    dismissAll,
    updateNotification,
    state,
  } = useNotificationContext();

  return (
    <div>
      <div data-testid="count">{state.notifications.length}</div>
      <button
        type="button"
        onClick={() => {
          addNotification({
            message: "Test notification",
            type: "info",
            duration: 5000,
            timestamp: Date.now(),
          });
        }}
      >
        Add Notification
      </button>
      <button
        type="button"
        onClick={() => {
          const id = addNotification({
            message: "Notification to update",
            type: "info",
            duration: 5000,
            timestamp: Date.now(),
          });
          setTimeout(() => {
            updateNotification(id, { message: "Updated notification" });
          }, 100);
        }}
      >
        Add and Update
      </button>
      <button
        type="button"
        onClick={() => {
          if (state.notifications.length > 0) {
            dismissNotification(state.notifications[0].id);
          }
        }}
      >
        Dismiss First
      </button>
      <button type="button" onClick={dismissAll}>
        Dismiss All
      </button>
    </div>
  );
}

describe("NotificationContext", () => {
  it("provides context to children", () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );
    expect(screen.getByTestId("count")).toBeDefined();
  });

  it("adds notifications", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    const addButton = screen.getByText("Add Notification");
    addButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("1");
    });
  });

  it("dismisses specific notification", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    const addButton = screen.getByText("Add Notification");
    addButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("1");
    });

    const dismissButton = screen.getByText("Dismiss First");
    dismissButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("0");
    });
  });

  it("dismisses all notifications", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    const addButton = screen.getByText("Add Notification");
    addButton.click();
    addButton.click();
    addButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("3");
    });

    const dismissAllButton = screen.getByText("Dismiss All");
    dismissAllButton.click();

    await waitFor(() => {
      expect(screen.getByTestId("count").textContent).toBe("0");
    });
  });

  it("updates notification", async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>,
    );

    const updateButton = screen.getByText("Add and Update");
    updateButton.click();

    await waitFor(() => {
      expect(screen.getByText("Notification to update")).toBeDefined();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Updated notification")).toBeDefined();
      },
      { timeout: 500 },
    );
  });

  it("respects maxNotifications limit", async () => {
    render(
      <NotificationProvider maxNotifications={2}>
        <TestComponent />
      </NotificationProvider>,
    );

    const addButton = screen.getByText("Add Notification");
    addButton.click();
    addButton.click();
    addButton.click();

    await waitFor(() => {
      // Should only have 2 notifications due to maxNotifications limit
      expect(screen.getByTestId("count").textContent).toBe("2");
    });
  });
});
