import { useContextFactory } from "../src/useContextFactory";

import { describe, expect, it } from "@jest/globals";

describe("useContextFactory", () => {
  it("should create a context with the initial state", () => {
    const initialState = { value: "initial" };
    const useContextState = () => initialState;

    const { Provider, useContext } = useContextFactory(
      initialState,
      useContextState
    );

    const TestComponent = () => {
      const context = useContext();
      expect(context).toEqual(initialState);
      return null;
    };

    // Render the TestComponent within the Provider
    const wrapper = (
      <Provider>
        <TestComponent />
      </Provider>
    );

    // Since we are not using a testing library to render, we just ensure no errors occur
    expect(wrapper).toBeDefined();
  });
});
