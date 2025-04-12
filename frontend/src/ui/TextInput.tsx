import { ReactNode } from "react";
import clsx from "clsx";

export interface TextInputProps {
  /** onChange */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** main label text */
  label?: string;
  /** sub-label text */
  subLabel?: string | ReactNode;
  /** default value */
  name?: string;
  /* value for controlled input */
  value?: string;
  /** input placeholder */
  placeholder?: string;
  /** optional icon at start */
  startIcon?: ReactNode;
  /** optional icon button at end */
  endIcon?: ReactNode;
  /** disable the input */
  disabled?: boolean;
  /** error object */
  error?: { message?: string };
  /** informational text (shown when no error) */
  infoText?: string;
}

const TextInput = ({
  onChange,
  label,
  subLabel,
  name,
  value,
  placeholder = "",
  startIcon,
  endIcon,
  error,
  infoText,
  disabled = false,
}: TextInputProps) => {
  const hasError = Boolean(error?.message);
  const borderColorClass = hasError
    ? "border border-[var(--warning-color)]"
    : "border border-[var(--input-field-border)]";

  // choose the message to show
  const message = hasError ? error!.message : infoText ? infoText : "";

  return (
    <div className="w-full flex flex-col gap-[2px]">
      <div className="mb-[2px] flex justify-between items-center">
        {label && (
          <span className="text-preset-4 text-[var(--input-field-label-color)]">
            {label}
          </span>
        )}
        {subLabel && (
          <span className="text-preset-7 text-[var(--input-field-subLabel-color)]">
            {subLabel}
          </span>
        )}
      </div>

      <div
        className={clsx(
          "flex items-center rounded-[12px] h-[44px]",
          disabled
            ? "bg-[var(--input-field-disabled-bg)]"
            : "hover:bg-[var(--input-field-hover-bg)]",
          borderColorClass,
          "active:ring-[2px] active:ring-[var(--btn-outer-shadow-color)] active:ring-offset-[2px] active:ring-offset-[var(--btn-inner-shadow-color)]"
        )}
      >
        {startIcon && <span className="ml-3 mr-2">{startIcon}</span>}

        <input
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className="
            flex-1 
            bg-transparent 
            outline-none 
            h-full 
            px-[8px] 
            text-preset-5"
        />

        {endIcon && (
          <button
            type="button"
            className={clsx("p-2", disabled && "cursor-not-allowed")}
            disabled={disabled}
          >
            {endIcon}
          </button>
        )}
      </div>

      <p
        className={clsx(
          "mt-1 min-h-[16px]",
          hasError
            ? "text-[var(--warning-color)]"
            : "text-[var(--input-field-info-text)]",
          "text-preset-7"
        )}
      >
        {message}
      </p>
    </div>
  );
};

export default TextInput;
