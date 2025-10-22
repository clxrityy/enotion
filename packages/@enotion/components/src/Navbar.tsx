import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import { cn } from "@enotion/core";
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

const { Menu, MenuOpen, DarkMode, LightMode } = Icons;

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
  label: string;
  icon?: ComponentType<{
    size?: number;
    className?: string;
    'aria-hidden'?: boolean;
  }>;
  active?: boolean;
  subItems?: NavItem[];
  description?: string;
}

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
export const Navbar = (
  {
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
  }: NavbarProps,
) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  const size = useElementSize(ref);

  useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size]);

  const color = palette && palettes[palette];

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  }

  return (
    <header
      ref={ref}
      style={{
        "--navbar-background": color ? color.background : undefined,
        "--navbar-foreground": color ? color.foreground : "inherit",
        "--navbar-border": color ? color.border : undefined,
        "--navbar-accent": color ? color.accent : undefined,
        "--navbar-muted": color ? color.muted : undefined,
        "--navbar-primary": color ? color.primary : undefined,
        ...props.style,
      } as CSSProperties}
      className={cn(
        `enotion-navbar sticky top-0 z-50 w-full border-b-[var(--navbar-border)] bg-[var(--navbar-background)]/90 text-[var(--navbar-foreground)] backdrop-blur supports-[backdrop-filter]:bg-[var(--navbar-background)]/60 px-4 md:px-5 [&_*]:no-underline`,
        className
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
                <nav className="max-w-none enotion-mobile-nav" role="navigation" aria-label="Mobile navigation">
                  <ul className="flex flex-col items-start gap-0">
                    {items.map((item, index) => {
                      const Icon = item.icon;
                      const key = `mobile-${item.label}-${index}`;
                      return (
                        <li key={key} className="">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (onItemClick) onItemClick(item);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--navbar-muted)]/75 hover:text-[var(--navbar-foreground)] cursor-pointer no-underline",
                              item.active && "bg-[var(--navbar-muted)]/20 text-[var(--navbar-primary)]/90"
                            )}
                          >
                            {Icon &&
                              <Icon
                                size={16}
                                className="text-[var(--navbar-muted)]/90"
                                aria-hidden={true}
                              />}
                            <span>
                              {item.label}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              }
            >
              <span className="enotion-navbar-mobile-trigger h-8 w-8 flex items-center justify-center group hover:bg-[var(--navbar-muted)]/40 hover:text-[var(--navbar-foreground)] cursor-pointer rounded-md transition-colors" role="button" tabIndex={0} aria-label="Open mobile menu">
                {menuOpened ? <MenuOpen onClick={toggleMenu} size={20} /> : <Menu onClick={toggleMenu} size={20} />}
              </span>
            </Popover>
          )}

          <div className="flex items-center gap-6">
            {/* LOGO */}
            <button
              title="logo"
              type="button"
              style={{
                "--navbar-primary": color ? color.primary : undefined
              } as CSSProperties}
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 text-[var(--navbar-primary)] hover:text-[var(--navbar-primary)]/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">
                {logo}
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">
                {title}
              </span>
            </button>
            {/* DESKTOP MENU */}
            {!isMobile && (
              <nav className="flex" role="navigation" aria-label="Main navigation">
                <ul className="flex gap-2">
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const key = `desktop-${item.label}-${index}`;

                    return (
                      <li key={key} className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onItemClick) onItemClick(item);
                          }}
                          className={cn(
                            "enotion-navbar-item flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--navbar-foreground)]/90 cursor-pointer no-underline",
                            item.active && "bg-[var(--navbar-muted)]/20 text-[var(--navbar-foreground)]/95"
                          )}
                        >
                          {Icon &&
                            <Icon
                              size={16}
                              className="text-[var(--navbar-muted)]/90"
                              aria-hidden={true}
                            />}
                          <span>
                            {item.label}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* THEME TOGGLE */}
          {
            currentTheme && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
                className="p-2 rounded-md hover:bg-[var(--navbar-muted)]/20 transition-colors"
              >
                {currentTheme === "dark" ? <LightMode size={20} /> : <DarkMode size={20} />}
              </button>
            )
          }
          {/* PALETTE SELECTOR */}
          {
            palette && (
              <Select
                value={palette}
                onChange={(e) => onPaletteChange && onPaletteChange(e.target.value as ColorPaletteType)}
                options={Object.keys(palettes).map((paletteKey) => ({
                  label: paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1),
                  value: paletteKey,
                }))}
                aria-label="Select color palette"
                title="Select color palette"
              />
            )
          }
        </div>
      </div>
    </header>
  )
}
