import { ColorPalettes, ColorPaletteType, Icons } from "@enotion/core";
import { useSVG } from "@enotion/hooks";

export const Logo = ({ palette }: { palette?: ColorPaletteType }) => {
  const color = palette ? ColorPalettes[palette] : undefined;

  const { svgContent, error } = useSVG({
    src: "/logo.svg",
    width: 20,
    height: 20,
    strokeColor: color?.foreground,
  });

  if (error) {
    return <Icons.Loading className="w-8 h-8 text-gray-400 animate-spin" />;
  }

  const svgMarkup = svgContent;

  return svgMarkup ? (
    <div
      style={{
        maxHeight: "2rem",
        maxWidth: "2rem",
        position: "relative",
        rotate: "-45deg",
        aspectRatio: "2 / 1.4142",
        animationFillMode: "forwards",
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  ) : (
    <></>
  );
};
