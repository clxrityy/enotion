import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { jest } from "@jest/globals";
import { NotificationItem } from "../src/components/NotificationItem";
import { NotificationType } from "../src";

const baseNotification = {
  id: "test-id",
  message: "Test message",
  type: "success" as NotificationType,
  duration: 5000,
  dismissible: true,
  timestamp: Date.now(),
};

describe("NotificationItem", () => {
  it("renders the notification message", () => {
    render(
      <NotificationItem
        notification={baseNotification}
        onDismiss={jest.fn()}
        position="top-right"
        pauseOnHover={true}
      />,
    );
    expect(screen.getByText("Test message")).toBeDefined();
  });

  it("calls onDismiss when close button is clicked", async () => {
    const onDismiss = jest.fn();
    render(
      <NotificationItem
        notification={baseNotification}
        onDismiss={onDismiss}
        position="top-right"
        pauseOnHover={true}
      />,
    );
    fireEvent.click(screen.getByTitle("dismiss"));

    // Wait for the 300ms animation delay
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });

  it("is focusable and responds to keyboard", async () => {
    const onDismiss = jest.fn();
    render(
      <NotificationItem
        notification={baseNotification}
        onDismiss={onDismiss}
        position="top-right"
        pauseOnHover={true}
      />,
    );
    const item = screen.getByRole("alert");
    item.focus();
    fireEvent.click(item);

    // Wait for the 300ms animation delay
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });

  it("responds to Enter key press", async () => {
    const onDismiss = jest.fn();
    render(
      <NotificationItem
        notification={baseNotification}
        onDismiss={onDismiss}
        position="top-right"
        pauseOnHover={true}
      />,
    );
    const item = screen.getByRole("alert");
    item.focus();
    fireEvent.keyDown(item, { key: "Enter" });

    // Wait for the 300ms animation delay
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });

  it("responds to Space key press", async () => {
    const onDismiss = jest.fn();
    render(
      <NotificationItem
        notification={baseNotification}
        onDismiss={onDismiss}
        position="top-right"
        pauseOnHover={true}
      />,
    );
    const item = screen.getByRole("alert");
    item.focus();
    fireEvent.keyDown(item, { key: " " });

    // Wait for the 300ms animation delay
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalled();
      },
      { timeout: 500 },
    );
  });
});
