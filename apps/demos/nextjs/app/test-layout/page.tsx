"use client";
import { LayoutContainer, Button, Card } from "@enotion/components";

export default function TestLayoutPage() {
  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h1>LayoutContainer Test</h1>

      <h2>Test 1: Direct children with solarized palette</h2>
      <LayoutContainer
        colorPalette="solarized"
        renderChildren={
          <>
            <Card>
              <h3>Card inside LayoutContainer</h3>
              <p>This card should have the solarized palette automatically injected</p>
              <Button>Button inside Card</Button>
            </Card>
            <Button>Direct Button child</Button>
          </>
        }
      />

      <h2>Test 2: Card OUTSIDE LayoutContainer (should use default styling)</h2>
      <Card>
        <h3>Card outside LayoutContainer</h3>
        <p>This card should NOT have any palette (default styling)</p>
        <Button>Button inside</Button>
      </Card>

      <h2>Test 3: Deeply nested with moodyRose palette</h2>
      <LayoutContainer
        colorPalette="moodyRose"
        renderChildren={
          <div>
            <Card>
              <h3>Outer Card</h3>
              <div>
                <Card>
                  <h4>Nested Card</h4>
                  <Button>Deeply nested button</Button>
                </Card>
              </div>
            </Card>
          </div>
        }
      />
    </div>
  );
}
