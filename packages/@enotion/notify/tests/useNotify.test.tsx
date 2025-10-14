import { render, screen, waitFor } from "@testing-library/react";
import { NotificationProvider } from "../src/context/NotificationContext";
import { useNotify } from "../src/hooks/useNotify";
import { describe, it, expect } from "@jest/globals";
import { useState } from "react";

function NotifyTestComponent() {
  const { notify, success, error, info, warning, loading, dismissAll } =
    useNotify();

  return (
    <div>
      <button type="button" onClick={() => notify("Default notification")}>
        Notify
      </button>
      <button type="button" onClick={() => success("Success message")}>
        Success
      </button>
      <button type="button" onClick={() => error("Error message")}>
        Error
      </button>
      <button type="button" onClick={() => info("Info message")}>
        Info
      </button>
      <button type="button" onClick={() => warning("Warning message")}>
        Warning
      </button>
      <button type="button" onClick={() => loading("Loading message")}>
        Loading
      </button>
      <button type="button" onClick={dismissAll}>
        Dismiss All
      </button>
    </div>
  );
}

function PromiseTestComponent() {
  const { promise } = useNotify();

  const handleSuccess = () => {
    const successPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ data: "Success data" }), 100);
    });

    promise(successPromise, {
      loading: "Processing...",
      success: (data: any) => `Completed: ${data.data}`,
      error: "Failed",
    });
  };

  const handleError = () => {
    const errorPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Failed operation")), 100);
    });

    promise(errorPromise, {
      loading: "Processing...",
      success: "Success",
      error: (err: Error) => `Error: ${err.message}`,
    });
  };

  return (
    <div>
      <button type="button" onClick={handleSuccess}>
        Promise Success
      </button>
      <button type="button" onClick={handleError}>
        Promise Error
      </button>
    </div>
  );
}

function UpdateTestComponent() {
  const { success } = useNotify();

  const handleUpdate = () => {
    const toast = success("Initial message", { duration: 10000 });
    setTimeout(() => {
      toast.update("Updated message");
    }, 100);
  };

  return (
    <div>
      <button type="button" onClick={handleUpdate}>
        Update Toast
      </button>
    </div>
  );
}

describe("useNotify", () => {
  it("creates default notification", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Notify").click();

    await waitFor(() => {
      expect(screen.getByText("Default notification")).toBeDefined();
    });
  });

  it("creates success notification", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Success").click();

    await waitFor(() => {
      expect(screen.getByText("Success message")).toBeDefined();
    });
  });

  it("creates error notification", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Error").click();

    await waitFor(() => {
      expect(screen.getByText("Error message")).toBeDefined();
    });
  });

  it("creates info notification", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Info").click();

    await waitFor(() => {
      expect(screen.getByText("Info message")).toBeDefined();
    });
  });

  it("creates warning notification", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Warning").click();

    await waitFor(() => {
      expect(screen.getByText("Warning message")).toBeDefined();
    });
  });

  it("creates loading notification with infinite duration", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Loading").click();

    await waitFor(() => {
      expect(screen.getByText("Loading message")).toBeDefined();
    });
  });

  it("dismisses all notifications", async () => {
    render(
      <NotificationProvider>
        <NotifyTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Success").click();
    screen.getByText("Error").click();
    screen.getByText("Info").click();

    await waitFor(() => {
      expect(screen.getByText("Success message")).toBeDefined();
      expect(screen.getByText("Error message")).toBeDefined();
      expect(screen.getByText("Info message")).toBeDefined();
    });

    screen.getByText("Dismiss All").click();

    await waitFor(() => {
      expect(screen.queryByText("Success message")).toBeNull();
      expect(screen.queryByText("Error message")).toBeNull();
      expect(screen.queryByText("Info message")).toBeNull();
    });
  });

  it("handles promise success", async () => {
    render(
      <NotificationProvider>
        <PromiseTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Promise Success").click();

    await waitFor(() => {
      expect(screen.getByText("Processing...")).toBeDefined();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Completed: Success data")).toBeDefined();
      },
      { timeout: 500 },
    );
  });

  it("handles promise error", async () => {
    render(
      <NotificationProvider>
        <PromiseTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Promise Error").click();

    await waitFor(() => {
      expect(screen.getByText("Processing...")).toBeDefined();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Error: Failed operation")).toBeDefined();
      },
      { timeout: 500 },
    );
  });

  it("updates notification message", async () => {
    render(
      <NotificationProvider>
        <UpdateTestComponent />
      </NotificationProvider>,
    );

    screen.getByText("Update Toast").click();

    await waitFor(() => {
      expect(screen.getByText("Initial message")).toBeDefined();
    });

    await waitFor(
      () => {
        expect(screen.getByText("Updated message")).toBeDefined();
      },
      { timeout: 300 },
    );
  });

  it("allows manual dismiss via returned object", async () => {
    const ManualDismissComponent = () => {
      const { success } = useNotify();
      const [toastRef, setToastRef] = useState<any>(null);
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              const ref = success("Dismissible message", { duration: 10000 });
              setToastRef(ref);
            }}
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              if (toastRef) {
                toastRef.dismiss();
              }
            }}
          >
            Dismiss
          </button>
        </div>
      );
    };

    render(
      <NotificationProvider>
        <ManualDismissComponent />
      </NotificationProvider>,
    );

    screen.getByText("Create").click();

    await waitFor(() => {
      expect(screen.getByText("Dismissible message")).toBeDefined();
    });

    screen.getByText("Dismiss").click();

    await waitFor(
      () => {
        expect(screen.queryByText("Dismissible message")).toBeNull();
      },
      { timeout: 600 },
    );
  });
});
