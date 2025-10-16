import { ColorPalettes, type ColorPaletteType } from "@enotion/core/constants";
import { cn } from "@enotion/core/utils";
import {
  ComponentProps,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import "./styles/navbar.css";

export type NavbarPosition = "top" | "bottom" | "left" | "right";

export interface NavbarContainerProps extends ComponentProps<"nav"> {
  children?: ReactNode;
  colorPalette?: ColorPaletteType;
  position?: NavbarPosition;
}

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  colorPalette?: ColorPaletteType;
}

const TopNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
  const palette = colorPalette && ColorPalettes[colorPalette];

  return (
    <nav
      className={cn("navbar-top enotion-navbar", props.className)}
      style={{
        borderBottom: palette ? `1px solid ${palette.border}` : undefined,
        backgroundColor: palette ? palette.background : undefined,
        color: palette ? palette.foreground : "inherit",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </nav>
  );
};

const BottomNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
  const palette = colorPalette && ColorPalettes[colorPalette];

  return (
    <nav
      className={cn("navbar-bottom enotion-navbar", props.className)}
      style={{
        borderTop: palette ? `1px solid ${palette.border}` : undefined,
        backgroundColor: palette ? palette.background : undefined,
        color: palette ? palette.foreground : "inherit",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </nav>
  );
};

const LeftNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
  const palette = colorPalette && ColorPalettes[colorPalette];

  return (
    <nav
      className={cn("navbar-left enotion-navbar", props.className)}
      style={{
        borderRight: palette ? `1px solid ${palette.border}` : undefined,
        backgroundColor: palette ? palette.background : undefined,
        color: palette ? palette.foreground : "inherit",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </nav>
  );
};

const RightNavbar = ({ children, colorPalette, ...props }: NavbarProps) => {
  const palette = colorPalette && ColorPalettes[colorPalette];

  return (
    <nav
      className={cn("navbar-right enotion-navbar", props.className)}
      style={{
        borderLeft: palette ? `1px solid ${palette.border}` : undefined,
        backgroundColor: palette ? palette.background : undefined,
        color: palette ? palette.foreground : "inherit",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </nav>
  );
};

const NavbarContainer = ({
  position = "top",
  children,
  colorPalette,
  ...props
}: NavbarContainerProps) => {
  const palette = colorPalette && ColorPalettes[colorPalette];

  const style = {
    "--navbar-box-shadow-color": palette ? palette.muted : undefined,
    "--navbar-shadow-color": palette ? palette.border : undefined,
    "--navbar-before-bg-color-start": palette ? palette.accent : undefined,
    "--navbar-before-bg-color-end": palette ? palette.background : undefined,
    "--navbar-after-bg-color": palette ? palette.background : undefined,
    color: palette ? palette.foreground : "inherit",
    ...props.style,
  } as CSSProperties;

  const render = () => {
    switch (position) {
      case "top":
        return (
          <TopNavbar style={style} colorPalette={colorPalette} {...props}>
            {children}
          </TopNavbar>
        );
      case "bottom":
        return (
          <BottomNavbar style={style} colorPalette={colorPalette} {...props}>
            {children}
          </BottomNavbar>
        );
      case "left":
        return (
          <LeftNavbar style={style} colorPalette={colorPalette} {...props}>
            {children}
          </LeftNavbar>
        );
      case "right":
        return (
          <RightNavbar style={style} colorPalette={colorPalette} {...props}>
            {children}
          </RightNavbar>
        );
      default:
        return (
          <TopNavbar style={style} colorPalette={colorPalette} {...props}>
            {children}
          </TopNavbar>
        );
    }
  };

  return render();
};

export { NavbarContainer as Navbar };
