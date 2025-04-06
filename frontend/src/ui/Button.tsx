import { ReactNode } from "react";
import clsx from "clsx";
import { ButtonVariant, buttonVariants } from "../constants/buttonVariants";

interface ButtonProps {
  variant?: ButtonVariant; // 👈 use generated type
  children: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  variant = "primary",
  children,
  icon,
  width = "100%",
  height = "44px",
  onClick = () => {},
  disabled = false,
}: ButtonProps) => {
  const baseClasses = `
    flex items-center justify-center gap-2
    rounded-[8px]
    transition-colors duration-200 ease
  `;

  const activeClasses = !disabled
    ? `
    active:ring-[2px]
    active:ring-[var(--btn-outer-shadow-color)]
    active:ring-offset-[2px]
    active:ring-offset-[var(--btn-inner-shadow-color)]
  `
    : "";

  const disabledClasses = disabled
    ? `
    bg-[var(--btn-disabled-bg)]
    text-[var(--btn-disabled-text)]
    border-none
  `
    : "";

  const variantClasses = !disabled ? buttonVariants[variant] : "";

  return (
    <button
      disabled={disabled}
      style={{ width, height }}
      onClick={onClick}
      className={clsx(
        baseClasses,
        variantClasses,
        disabledClasses,
        activeClasses
      )}
    >
      {icon && <span>{icon}</span>}
      <span className="text-base">{children}</span>
    </button>
  );
};

export default Button;
