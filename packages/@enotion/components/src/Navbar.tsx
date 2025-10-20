import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import { cn } from "@enotion/core";
import {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useId,
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
  colorPalette?: ColorPaletteType;
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
    colorPalette,
    onPaletteChange,
    currentTheme,
    toggleTheme,
    ...props
  }: NavbarProps,
) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  const size = useElementSize(ref);

  useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size]);

  const palette = colorPalette && palettes[colorPalette];

  return (
    <header
      ref={ref}
      style={{
        "--navbar-background": palette ? palette.background : undefined,
        "--navbar-foreground": palette ? palette.foreground : "inherit",
        "--navbar-border": palette ? palette.border : undefined,
        "--navbar-accent": palette ? palette.accent : undefined,
        "--navbar-muted": palette ? palette.muted : undefined,
        ...props.style,
      } as CSSProperties}
      className={cn(
        `sticky top-0 z-50 w-full border-b-[var(--navbar-border)] bg-[var(--navbar-background)]/90 text-[var(--navbar-foreground)] backdrop-blur supports-[backdrop-filter]:bg-[var(--navbar-background)]/60 px-4 md:px-5 [&_*]:no-underline`,
        className
      )}
      {...props}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex flex-1 items-cener gap-2">
          {/* MOBILE MENU TRIGGER */}
          {isMobile && (
            <Popover
              colorPalette={colorPalette}
              className="w-64 p-1"
              popoverContent={
                <nav className="max-w-none">
                  <ul className="flex flex-col items-start gap-0">
                    {items.map((item, index) => {
                      const Icon = item.icon;
                      const key = useId().concat(index.toString());
                      return (
                        <li key={key} className="w-full">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (onItemClick) onItemClick(item);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--navbar-accent)] hover:text-[var(--navbar-foreground)]/90 cursor-pointer no-underline",
                              item.active && "bg-[var(--navbar-accent)]/20 text-[var(--navbar-foreground)]/90"
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
                  {/* {items.map((item) => {
                    const key = useId();
                    return (
                      <button
                        key={key}
                        onClick={(e) => {
                          e.preventDefault();
                          onItemClick?.(item);
                        }}
                        className={cn(
                          "block rounded-md px-3 py-2 text-base font-medium hover:bg-[var(--navbar-accent)]/10",
                          item.active ? "bg-[var(--navbar-accent)]/20 font-semibold" : "font-normal"
                        )}
                      >
                        {item.label}
                      </button>
                    )
                  })} */}
                </nav>
              }
            >
              <span className="h-8 w-8 flex items-center justify-center group hover:bg-[var(--navbar-accent)]/40 hover:text-[var(--navbar-foreground)] cursor-pointer">
                <Menu size={24} />
              </span>
            </Popover>
          )}

          <div className="flex items-center gap-6">
            {/* LOGO */}
            <button
              title="logo"
              type="button"
              style={{
                "--navbar-primary": palette ? palette.primary : undefined
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
              <nav className="flex">
                <ul className="gap-2">
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const key = useId().concat(index.toString());

                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onItemClick) onItemClick(item);
                          }}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--navbar-accent)] hover:text-[var(--navbar-foreground)]/90 cursor-pointer no-underline",
                            item.active && "bg-[var(--navbar-accent)]/20 text-[var(--navbar-foreground)]/90"
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
            currentTheme && toggleTheme && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
                className="p-2 rounded-md hover:bg-[var(--navbar-accent)]/20 transition-colors"
              >
                {currentTheme === "dark" ? <LightMode size={20} /> : <DarkMode size={20} />}
              </button>
            )
          }
          {/* PALETTE SELECTOR */}
          {
            colorPalette && onPaletteChange && (
              <Select
                value={colorPalette}
                onChange={(e) => onPaletteChange(e.target.value as ColorPaletteType)}
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

// export type NavbarPosition = "top" | "bottom" | "left" | "right";

// export interface NavbarContainerProps extends ComponentProps<"nav"> {
//   children?: ReactNode;
//   colorPalette?: ColorPaletteType;
//   position?: NavbarPosition;
// }

// export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
//   children?: ReactNode;
//   colorPalette?: ColorPaletteType;
// }

// const TopNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
//   const palette = colorPalette && ColorPalettes[colorPalette];

//   return (
//     <nav
//       className={cn("navbar-top enotion-navbar", props.className)}
//       style={{
//         borderBottom: palette ? `1px solid ${palette.border}` : undefined,
//         backgroundColor: palette ? palette.background : undefined,
//         color: palette ? palette.foreground : "inherit",
//         ...props.style,
//       }}
//       {...props}
//     >
//       {children}
//     </nav>
//   );
// };

// const BottomNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
//   const palette = colorPalette && ColorPalettes[colorPalette];

//   return (
//     <nav
//       className={cn("navbar-bottom enotion-navbar", props.className)}
//       style={{
//         borderTop: palette ? `1px solid ${palette.border}` : undefined,
//         backgroundColor: palette ? palette.background : undefined,
//         color: palette ? palette.foreground : "inherit",
//         ...props.style,
//       }}
//       {...props}
//     >
//       {children}
//     </nav>
//   );
// };

// const LeftNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
//   const palette = colorPalette && ColorPalettes[colorPalette];

//   return (
//     <nav
//       className={cn("navbar-left enotion-navbar", props.className)}
//       style={{
//         borderRight: palette ? `1px solid ${palette.border}` : undefined,
//         backgroundColor: palette ? palette.background : undefined,
//         color: palette ? palette.foreground : "inherit",
//         ...props.style,
//       }}
//       {...props}
//     >
//       {children}
//     </nav>
//   );
// };

// const RightNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
//   const palette = colorPalette && ColorPalettes[colorPalette];

//   return (
//     <nav
//       className={cn("navbar-right enotion-navbar", props.className)}
//       style={{
//         borderLeft: palette ? `1px solid ${palette.border}` : undefined,
//         backgroundColor: palette ? palette.background : undefined,
//         color: palette ? palette.foreground : "inherit",
//         ...props.style,
//       }}
//       {...props}
//     >
//       {children}
//     </nav>
//   );
// };

// const NavbarContainer = ({
//   position = "top",
//   children,
//   colorPalette,
//   ...props
// }: NavbarContainerProps) => {
//   const palette = colorPalette && ColorPalettes[colorPalette];

//   const style = {
//     "--navbar-box-shadow-color": palette ? palette.muted : undefined,
//     "--navbar-shadow-color": palette ? palette.border : undefined,
//     "--navbar-before-bg-color-start": palette ? palette.accent : undefined,
//     "--navbar-before-bg-color-end": palette ? palette.background : undefined,
//     "--navbar-after-bg-color": palette ? palette.background : undefined,
//     color: palette ? palette.foreground : "inherit",
//     ...props.style,
//   } as CSSProperties;

//   const render = () => {
//     switch (position) {
//       case "top":
//         return (
//           <TopNavbar style={style} colorPalette={colorPalette} {...props}>
//             {children}
//           </TopNavbar>
//         );
//       case "bottom":
//         return (
//           <BottomNavbar style={style} colorPalette={colorPalette} {...props}>
//             {children}
//           </BottomNavbar>
//         );
//       case "left":
//         return (
//           <LeftNavbar style={style} colorPalette={colorPalette} {...props}>
//             {children}
//           </LeftNavbar>
//         );
//       case "right":
//         return (
//           <RightNavbar style={style} colorPalette={colorPalette} {...props}>
//             {children}
//           </RightNavbar>
//         );
//       default:
//         return null;
//     }
//   };

//   return render();
// };

// export { NavbarContainer as Navbar };
