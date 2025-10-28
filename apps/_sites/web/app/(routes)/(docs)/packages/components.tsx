"use client";

import { CSSProperties, Suspense, useState, type ReactNode } from "react";
import {
  Button,
  Card,
  CopyButton,
  Search,
  Skeleton,
} from "@enotion/components";
import { useColorPalette } from "@enotion/hooks";
import {
  adjustHexColorOpacity,
  ColorPalettes,
  ColorPaletteType,
  Icons,
  SearchablePackageItems,
  packages,
  getSearchableItems,
  cn,
} from "@enotion/core";
import Link from "next/link";
import { useNotify } from "@enotion/notify";

interface DocLayoutProps {
  children: ReactNode;
}

export function DocLayout({
  children,
}: DocLayoutProps) {
  const [currentPackage, setCurrentPackage] = useState<string>("");
  const [currentModule, setCurrentModule] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { palette } = useColorPalette();

  const colors = palette ? ColorPalettes[palette] : ColorPalettes["default"];

  return (
    <div
      className="min-h-screen"
      style={
        {
          "--bg-color": colors?.background,
          "--border-color": colors?.border,
          "--muted": adjustHexColorOpacity(
            colors?.foreground ?? "#000000",
            0.75,
          ),
          "--foreground": colors?.foreground,
          "--active-color": adjustHexColorOpacity(
            colors?.primary ?? "#000000",
            0.45,
          ),
        } as CSSProperties
      }
    >
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r
            p-4 overflow-y-auto bg-(--bg-color) border-(--border-color) transition-transform
            ${sidebarOpen ? "translate-x-0" : "-translte-x-full"}
            `}
        >
          <div className="p-4 space-y-6">
            {/* Search */}
            <div>
              <Search
                palette={palette}
                data={getSearchableItems("/packages")}
                searchKey={["slug", "module", "description", "package"]}
                render={(item, idx) => (
                  <Suspense
                    key={`${item.slug}-${idx}`}
                    fallback={<Skeleton palette={palette} />}
                  >
                    <DocSearchResultItem
                      key={`${item.package}-${item.module.slug}`}
                      item={item}
                    />
                  </Suspense>
                )}
              />
            </div>
            {/* Packages Navigation */}
            <nav>
              <h3 className="font-semibold text-sm mb-2">Packages</h3>
              <ul className="space-y-1">
                {packages.map((pkg) => (
                  <li key={pkg.slug} onFocus={() => {
                    setCurrentPackage(pkg.slug);
                  }}
                    onBlur={() => {
                      setCurrentPackage("");
                      setCurrentModule("");
                    }}
                    onMouseEnter={(e) => {
                      if (e.currentTarget.contains(e.currentTarget)) {
                        return;
                      }
                      setCurrentPackage(pkg.slug);
                    }}
                  >
                    <span
                      className={cn("flex flex-row justify-between items-center px-3 py-2 rounded text-sm w-full",
                        currentPackage === pkg.slug ? "bg-(--active-color) font-semibold" : "")}
                    >
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className={`
                        `}
                      >
                        {pkg.name}
                      </Link>
                      <Button
                        onClick={() => {
                          setCurrentPackage((prev) => {
                            if (prev.length > 0 && prev !== pkg.slug) {
                              return ""
                            }

                            return prev;
                          })
                        }}>
                        <Icons.Selector
                        />
                      </Button>
                    </span>

                    {/* Show modules when package is active */}
                    {currentPackage === pkg.slug && (
                      <ul className="mt-2 space-y-1 backdrop:blur-sm p-2 border-l-2 border-(--border-color)/50 bg-(--muted)/5">
                        {pkg.modules.map((mod) => (
                          <li key={mod.slug}
                            onTouchMove={() => {
                              setCurrentModule(mod.slug);
                            }}
                          >
                            <Link
                              href={`/packages/${pkg.slug}/${mod.slug}`}
                              className={`
                                    block px-3 py-2 rounded text-sm
                                    ${currentModule === mod.slug ? "bg-(--active-color) font-semibold" : "hover:bg-(--border-color)/50"}
                                  `}
                            >
                              {mod.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div
          className={`
          flex-1 transition-all
          ${sidebarOpen ? "ml-64" : "ml-0"}
          `}
        >
          <div className="max-w-4xl mx-auto p-8">{children}</div>
        </div>

        {/* Toggle Sidebar Button */}
        <button
          type="button"
          aria-label="Toggle Sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 left-4 p-2 bg-(--bg-color) border border-(--border-color) rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          {sidebarOpen ? <Icons.SidebarOpen /> : <Icons.SidebarClose />}
        </button>
      </div>
    </div>
  );
}

export function DocSearchResultItem({
  item,
}: {
  item: SearchablePackageItems[number];
}) {
  return (
    <Link
      href={`/packages/${item.package}/${item.module.slug}`}
      className="block p-4 rounded"
    >
      <h3 className="font-semibold">{item.module.name}</h3>
      <p className="text-sm">{item.module.description}</p>
    </Link>
  );
}

interface PlaygroundProps {
  component: ReactNode;
  code: string;
  title: string;
  description?: string;
  palette?: ColorPaletteType;
}

export function Playground({
  component,
  code,
  title,
  description,
  palette,
}: PlaygroundProps) {
  const [showCode, setShowCode] = useState<boolean>(false);
  const { notify } = useNotify();

  return (
    <Card palette={palette} className="my-6">
      <div className="p-4 border-b border-(--border-color)">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-(--foreground)/75 mt-1">{description}</p>
        )}
      </div>

      {/* Component Preview */}
      <div className="p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          {component}
        </div>
      </div>

      {/* controls */}
      <div className="p-4 border-t border-(--border-color) flex items-center justify-between">
        <Button variant="outline" onClick={() => setShowCode(!showCode)}>
          {showCode ? "Hide Code" : "Show Code"}
        </Button>
        <CopyButton
          content={code}
          onCopied={(_) => {
            notify("Code copied to clipboard!", {
              type: "success",
              icon: <Icons.Copied />,
            });
          }}
          palette={palette}
        />
      </div>

      {/* Code */}
      {showCode && (
        <div className="border-t border-(--border-color)">
          <pre className="p-4 bg-(--bg-color)/95 text-(--foreground) overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </Card>
  );
}

export const PackagesComponent = () => {
  const [active, setActive] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {packages.map((pkg) => (
        <Card
          onClick={() =>
            setActive((prev) => (prev === pkg.name ? "" : pkg.name))
          }
          key={pkg.slug}
          className={cn(
            "cursor-pointer p-6 hover:shadow-lg transition-transform rounded-md hover:scale-[1.042] hover:border hover:border-(--active-color)/25",
            active === pkg.name &&
            "bg-(--active-color)/2.5 border-[1.5px] border-(--active-color)",
          )}
        >
          <h3 className="font-semibold text-lg mb-2">
            <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
          </h3>
          <p className="text-sm text-(--muted)">{pkg.description}</p>
        </Card>
      ))}
    </div>
  );
};
