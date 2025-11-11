import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import { blendHexColors, cn } from "@enotion/core";
import {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "./styles/navbar.css";
import { Icons } from "@enotion/core/constants";
import { Theme, useElementSize } from "@enotion/hooks";
import { Popover } from "./Popover.js";
import { Select } from "./Select.js";

const { Menu, DarkMode, LightMode } = Icons;

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  title?: string;
  logoHref?: string;
  items?: NavItem[];
  onItemClick?: (item: NavItem) => void;
  palettes?: typeof ColorPalettes;
  palette?: ColorPaletteType;
  onPaletteChange?: (palette: ColorPaletteType) => void;
  currentTheme?: Theme;
  toggleTheme?: () => void;
}

export interface NavItem {
  href?: string;
  label?: string;
  icon?: ComponentType<{
    size?: number;
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  active?: boolean;
  subItems?: NavSubItem[];
  description?: string;
  main?: {
    heading: string;
    description?: string;
    icon?: ComponentType<{
      size?: number;
      className?: string;
      "aria-hidden"?: boolean;
    }>;
    href?: string;
    footer?: string;
  };
}

export type NavSubItem = Omit<NavItem, "subItems" & "main">;

/**
 * Navbar component
 * @param props {@link NavbarProps}
 * @returns Navbar JSX element
 *
 * @description Navbar component for site navigation with responsive design, theme toggling, and color palette selection.
 * @example
 * ```tsx
 * import { Navbar, NavItem } from "@enotion/components";
 *
 * const navItems: NavItem[] = [
 *   { label: "Home" },
 *   { label: "About" },
 *   { label: "Contact" },
 * ];
 *
 * <Navbar
 *   logo={<MyLogo />}
 *   title="My Site"
 *   items={navItems}
 *   currentTheme={theme}
 *   toggleTheme={toggleTheme}
 *   colorPalette={palette}
 *   onPaletteChange={setPalette}
 * />
 * ```
 */
export const Navbar = ({
  className,
  logo,
  title,
  logoHref,
  items = [],
  onItemClick,
  palettes = ColorPalettes,
  palette,
  onPaletteChange,
  currentTheme,
  toggleTheme,
  ...props
}: NavbarProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  const size = useElementSize(ref);

  useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size]);

  const color = palette && palettes[palette];

  return (
    <header
      ref={ref}
      style={
        {
          "--navbar-background": color ? color.background : undefined,
          "--navbar-foreground": color ? color.foreground : "inherit",
          "--navbar-border": color ? color.border : undefined,
          "--navbar-accent": color ? color.accent : undefined,
          "--navbar-muted": color ? color.muted : undefined,
          "--navbar-primary": color ? color.primary : undefined,
          backgroundColor: color
            ? blendHexColors(color.background, color.muted, 0.33)
            : undefined,
          boxShadow: color
            ? `0 1px 3px ${blendHexColors(color.muted, color.background, 0.5)}`
            : undefined,
          ...props.style,
        } as CSSProperties
      }
      className={cn(
        `enotion-navbar sticky top-0 z-50 w-full border-b-(--navbar-border) text-(--navbar-foreground) backdrop-blur supports-backdrop-filter:bg-(--navbar-background)/90 px-4 md:px-5 **:no-underline`,
        className,
      )}
      {...props}
    >
      <div className="enotion-navbar-container container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex flex-1 items-center gap-2">
          {/* MOBILE MENU TRIGGER */}
          {isMobile && (
            <Popover
              palette={palette}
              className="w-64 p-1"
              popoverContent={
                <nav
                  className="max-w-none enotion-mobile-nav"
                  aria-label="Mobile navigation"
                >
                  <ul className="flex flex-col items-start gap-0">
                    {items.map((item, index) => {
                      const Icon = item.icon;
                      const key = `mobile-${item.label}-${index}`;

                      // If item has subItems, render them in mobile view
                      if (item.subItems && item.subItems.length > 0) {
                        return (
                          <li key={key} className="w-full">
                            <div className="flex w-full flex-col gap-2">
                              <div
                                className={cn(
                                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors bg-(--navbar-muted)/10",
                                  item.active &&
                                  "bg-(--navbar-muted)/20 text-(--navbar-primary)/90",
                                )}
                              >
                                {Icon && (
                                  <Icon
                                    size={16}
                                    className="text-inherit"
                                    aria-hidden={true}
                                  />
                                )}
                                <span>{item.label}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center justify-between">
                                {item.main && (
                                  <div className="flex items-center gap-2 border-(--navbar-border) py-6 px-2 mb-2 sm:w-full shadow-xs rounded-lg bg-(linear-gradient(to right, var(--navbar-background), var(--navbar-muted)))/75 hover:bg-(linear-gradient(to right, var(--navbar-background), var(--navbar-muted)))/90 transition-shadow">
                                    <div className="flex flex-col">
                                      <a
                                        href={item.main.href ?? item.href}
                                        className="font-bold text-xl"
                                      >
                                        <div className="flex flex-row items-center justify-start gap-2">
                                          {item.main.icon && (
                                            <item.main.icon
                                              size={50}
                                              className=""
                                              aria-hidden={true}
                                            />
                                          )}
                                          {item.main.heading}
                                        </div>
                                      </a>
                                      {item.main.description && (
                                        <span className="text-xs text-(--navbar-foreground)/80 text-center mt-1 leading-tight">
                                          {item.main.description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                <div className="ml-4 mt-1 flex flex-col gap-1">
                                  {item.subItems.map((subItem, subIndex) => {
                                    const SubIcon = subItem.icon;
                                    const subKey = `mobile-sub-${subItem.label}-${subIndex}`;
                                    return (
                                      <button
                                        key={subKey}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (onItemClick) onItemClick(subItem);
                                        }}
                                        className={cn(
                                          "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-(--navbar-muted)/50 hover:invert-25 hover:saturate-105 hover:text-(--navbar-foreground) cursor-pointer no-underline text-left focus:outline-(--navbar-primary)/75",
                                          subItem.active &&
                                          "border-(--navbar-primary) border-2 text-(--navbar-primary)/90",
                                        )}
                                      >
                                        <div className="flex flex-col gap-0.5">
                                          <div className="flex items-center gap-1.5">
                                            {SubIcon && (
                                              <SubIcon
                                                size={14}

                                                aria-hidden={true}
                                              />
                                            )}
                                            <span className="font-medium">
                                              {subItem.label}
                                            </span>
                                          </div>
                                          {subItem.description && (
                                            <span className="text-xs text-(--navbar-foreground)/85 leading-tight">
                                              {subItem.description}
                                            </span>
                                          )}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      }

                      // Regular item without subItems
                      return (
                        <li key={key} className="">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (onItemClick) onItemClick(item);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-(--navbar-muted)/75 hover:text-(--navbar-foreground) cursor-pointer no-underline",
                              item.active &&
                              "bg-(--navbar-muted)/20 text-(--navbar-primary)/90",
                            )}
                          >
                            {Icon && (
                              <Icon
                                size={16}
                                aria-hidden={true}
                              />
                            )}
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              }
            >
              <span className="h-8 w-8 flex items-center justify-center group hover:text-(--navbar-foreground) cursor-pointer rounded-md transition-all">
                <Menu title="menu" size={20} />
              </span>
            </Popover>
          )}

          <div className="flex items-center gap-6">
            {/* LOGO */}
            <button
              title="logo"
              type="button"
              className="flex items-center space-x-2 text-(--navbar-foreground) transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (logoHref) {
                  globalThis.window.location.href = logoHref;
                }
              }}
            >
              <div>{logo}</div>
              <span className="hidden font-bold text-xl sm:inline-block">
                {title}
              </span>
            </button>
            {/* DESKTOP MENU */}
            {!isMobile && (
              <nav className="flex" aria-label="Main navigation">
                <ul className="flex gap-2 items-center">
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const key = `desktop-${item.label}-${index}`;

                    // If item has subItems, render as dropdown
                    if (item.subItems && item.subItems.length > 0) {
                      return (
                        <li key={key} className="relative">
                          <Popover
                            palette={palette}
                            className="w-80 p-2"
                            popoverContent={
                              <nav
                                className="max-w-none enotion-desktop-subnav"
                                aria-label={`${item.label} submenu`}
                              >
                                <div className="flex gap-2 items-center justify-between">
                                  {item.main && (
                                    <div className="flex flex-col mb-2 items-center gap-2 border-(--navbar-border) py-6 px-2 w-full sm:w-fit rounded-lg bg-(linear-gradient(to right, var(--navbar-background), var(--navbar-muted)))/75 hover:bg-(linear-gradient(to right, var(--navbar-background), var(--navbar-muted)))/90 transition-shadow shadow-xs">
                                      <a
                                        href={item.main.href ?? item.href}
                                        className="font-bold text-lg"
                                      >
                                        <div className="flex flex-row items-center justify-start gap-2">
                                          {item.main.icon && (
                                            <item.main.icon
                                              size={24}
                                              className="opacity-65"
                                              aria-hidden={true}
                                            />
                                          )}
                                          {item.main.heading}
                                        </div>
                                      </a>
                                      {item.main.description && (
                                        <span className="text-xs text-(--navbar-foreground)/80 mt-1 leading-tight">
                                          {item.main.description}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  <ul className="flex flex-col gap-1 items-center w-full">
                                    {item.subItems.map((subItem, subIndex) => {
                                      const SubIcon = subItem.icon;
                                      const subKey = `sub-${subItem.label}-${subIndex}`;
                                      return (
                                        <li key={subKey}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              if (onItemClick)
                                                onItemClick(subItem);
                                            }}
                                            className={cn(
                                              "flex w-full flex-col items-start gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-(--navbar-muted)/75 hover:text-(--navbar-foreground) cursor-pointer no-underline text-left",
                                              subItem.active &&
                                              "bg-(--navbar-muted)/20 text-(--navbar-primary)/90",
                                            )}
                                          >
                                            <div className="flex items-center gap-2">
                                              {SubIcon && (
                                                <SubIcon
                                                  size={16}
                                                  aria-hidden={true}
                                                />
                                              )}
                                              <span className="font-medium">
                                                {subItem.label}
                                              </span>
                                            </div>
                                            {subItem.description && (
                                              <span className="text-xs text-(--navbar-foreground)/80">
                                                {subItem.description}
                                              </span>
                                            )}
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </nav>
                            }
                          >
                            <span
                              className={cn(
                                "enotion-navbar-item flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-(--navbar-foreground)/90 cursor-pointer no-underline",
                                item.active && "bg-(--navbar-muted)/20",
                              )}
                            >
                              {Icon && (
                                <Icon
                                  size={16}
                                  aria-hidden={true}
                                />
                              )}
                              <span>{item.label}</span>
                              <Icons.Selector size={16} aria-hidden={true} />
                            </span>
                          </Popover>
                        </li>
                      );
                    }

                    // Regular item without subItems
                    return (
                      <li key={key} className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onItemClick) onItemClick(item);
                          }}
                          className={cn(
                            "enotion-navbar-item flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-(--navbar-foreground)/90 cursor-pointer no-underline",
                            item.active && "bg-(--navbar-muted)/20",
                          )}
                        >
                          {Icon && (
                            <Icon
                              size={16}
                              aria-hidden={true}
                            />
                          )}
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* THEME TOGGLE */}
          {currentTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
              className="p-2 rounded-md hover:bg-(--navbar-muted)/20 transition-colors"
            >
              {currentTheme === "dark" ? (
                <LightMode size={20} />
              ) : (
                <DarkMode size={20} />
              )}
            </button>
          )}
          {/* PALETTE SELECTOR */}
          {palette && (
            <Select
              value={palette}
              onChange={(e) =>
                onPaletteChange &&
                onPaletteChange(e.target.value as ColorPaletteType)
              }
              options={Object.keys(palettes).map((paletteKey) => ({
                label: paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1),
                value: paletteKey,
              }))}
              aria-label="Select color palette"
              title="Select color palette"
            />
          )}
        </div>
      </div>
    </header>
  );
};
