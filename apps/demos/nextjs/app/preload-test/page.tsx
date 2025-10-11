"use client";
import { useContext } from "@/components/ContextProvider";
import { Test } from "@/components/Test";

export default function PreloadTestPage() {
  const context = useContext();
  return (
    <div>
      preload-test page
      <Test context={context} />
    </div>
  );
}
