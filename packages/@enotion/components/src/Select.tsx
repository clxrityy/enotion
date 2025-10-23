import { ColorPalettes, ColorPaletteType } from "@enotion/core/constants";
import { CSSProperties, SelectHTMLAttributes } from "react";
import "./styles/select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  palette?: ColorPaletteType;
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
export function Select({ options, palette, ...rest }: SelectProps) {
  const color = palette ? ColorPalettes[palette] : null;

  return (
    <div className="select-container">
      <select
        style={
          {
            "--select-border-color": color?.border,
            "--select-focus-border-color": color?.primary,
            "--select-background-color": color?.background,
            "--select-text-color": color?.foreground,
            "--select-placeholder-color": color?.muted,
            "--select-disabled-background-color": color?.muted,
            "--select-disabled-text-color": color?.background,
            "--select-option-hover-background-color": color?.muted,
            "--select-option-hover-text-color": color?.foreground,
            "--select-disabled-borer-color": color?.muted,
            "--select-option-selected-background-color": color?.primary,
            "--select-option-selected-text-color": color?.background,
            "--select-hover-border-color": color?.primary,
            "--select-invalid-border-color": color?.warning,
            "--select-invalid-focus-ring-color": color?.warning,
            "--select-option-background-color": color?.background,
            "--select-option-text-color": color?.foreground,
            "--select-option-disabled-background-color": color?.muted,
            "--select-option-disabled-text-color": color?.background,
            "--select-icon-color": color?.foreground,
            "--select-icon-disabled-color": color?.muted,
            "--select-icon-hover-color": color?.foreground,
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
    </div>
  );
}
