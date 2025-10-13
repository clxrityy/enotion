import { ColorPalettes, ColorPaletteType } from "@enotion/config/constants";
import { CSSProperties, SelectHTMLAttributes } from "react";
import "./styles/select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  colorPalette?: ColorPaletteType;
}

/**
 * A customizable Select component with optional color palette support.
 * @param {Object[]} props.options - Array of option objects with value and label.
 * @param {ColorPaletteType} [props.colorPalette] - Optional color palette to style the select.
 * @example
 * ```tsx
 * const options = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2' },
 * ];
 * <Select options={options} colorPalette="dark" />
 * ```
 */
export function Select({ options, colorPalette, ...rest }: SelectProps) {
  const palette = colorPalette ? ColorPalettes[colorPalette] : null;

  if (palette) {
    return (
      <select
        style={
          {
            "--select-border-color": palette.border,
            "--select-focus-border-color": palette.primary,
            "--select-background-color": palette.background,
            "--select-text-color": palette.foreground,
            "--select-placeholder-color": palette.muted,
            "--select-disabled-background-color": palette.muted,
            "--select-disabled-text-color": palette.background,
            "--select-option-hover-background-color": palette.muted,
            "--select-option-hover-text-color": palette.foreground,
            "--select-disabled-borer-color": palette.muted,
            "--select-option-selected-background-color": palette.primary,
            "--select-option-selected-text-color": palette.background,
            "--select-hover-border-color": palette.muted,
            "--select-invalid-border-color": palette.warning,
            "--select-invalid-focus-ring-color": palette.warning,
            "--select-option-background-color": palette.background,
            "--select-option-text-color": palette.foreground,
            "--select-option-disabled-background-color": palette.muted,
            "--select-option-disabled-text-color": palette.background,
            ...rest.style,
          } as CSSProperties
        }
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select {...rest}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
