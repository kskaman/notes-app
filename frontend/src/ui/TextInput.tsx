import { ReactNode } from "react";
import clsx from "clsx";

export interface TextInputProps {
  /** onChange */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** main label text (bold, 14px) */
  label?: string;
  /** sub-label text (normal, 14px) */
  subLabel?: string;
  /** default value */
  name?: string;
  /** input placeholder */
  placeholder?: string;
  /** optional icon at start */
  startIcon?: ReactNode;
  /** optional icon button at end */
  endIcon?: ReactNode;
  /** disable the input */
  disabled?: boolean;
  /* Error object */
  error?: { message?: string };
}

export function TextInput({
  onChange,
  label,
  subLabel,
  name,
  placeholder = "",
  startIcon,
  endIcon,
  error,
  disabled = false,
}: TextInputProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        {label && <span className="text-[14px] text-bold">{label}</span>}

        {subLabel && <span className="text-[14px]">{subLabel}</span>}
      </div>

      <div
        className={clsx(
          "flex items-center border rounded-[12px]",
          "h-[44px]",
          disabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : "bg-white border-gray-300 hover:bg-gray-50",
          error && "border-red-500",
          `active:ring-[2px]
            active:ring-[var(--btn-outer-shadow-color)]
            active:ring-offset-[2px]
            active:ring-offset-[var(--btn-inner-shadow-color)]`
        )}
      >
        {startIcon && <span className="ml-3 mr-2">{startIcon}</span>}

        <input
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className="flex-1 bg-transparent 
          outline-none h-full 
          text-[14px] px-[8px]"
        />

        {endIcon && (
          <button
            type="button"
            className={clsx("p-3", disabled && "cursor-not-allowed")}
            disabled={disabled}
          >
            {endIcon}
          </button>
        )}
      </div>

      {/* keep in DOM; hide when no error */}
      <p
        className={clsx(
          "mt-1 text-[12px] min-h-[16px]",
          error ? "text-red-500" : "text-transparent"
        )}
      >
        {error?.message || ""}
      </p>
    </div>
  );
}
