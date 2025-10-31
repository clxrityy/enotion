"use client";
import { notFound } from "next/navigation";
import { getPackageBySlug } from "@enotion/core";
import { PackageOverview } from "./components";
import { use, useEffect, useState } from "react";
import { SkeletonWrapper } from "@enotion/components";
import { useColorPalette, useIsMounted, useTheme } from "@enotion/hooks";

export default function PackagePage({
  params,
}: {
  params: Promise<{ package: string }>;
}) {
  const pkg = getPackageBySlug(use(params).package);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMounted = useIsMounted();
  const { palette } = useColorPalette();
  const { theme } = useTheme();

  useEffect(() => {
    if (isMounted()) {
      setIsLoading(false);
    }
  }, []);

  if (!pkg) {
    notFound();
  }

  return (
    <SkeletonWrapper theme={theme} palette={palette} isLoading={isLoading}>
      <PackageOverview package={pkg} />
    </SkeletonWrapper>
  );
}
