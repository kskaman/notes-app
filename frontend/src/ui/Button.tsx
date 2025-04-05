import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outlined" | "warning";
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
    focus:outline-none rounded-[8px]
    transition-colors duration-200 ease
    active:ring-1 active:ring-btn-active-ring
  `;

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = `
        bg-btn-primary
        text-btn-primary-text
        hover:bg-btn-primary-hover
        active:bg-btn-primary-active
        border-none
      `;
      break;
    case "secondary":
      variantClasses = `
        bg-btn-secondary
        text-btn-secondary-text
        hover:bg-btn-secondary-hover
        hover:text-btn-secondary-hover-text
        active:bg-btn-secondary-active
        active:text-btn-secondary-active-text
        border border-btn-secondary-border
      `;
      break;
    case "outlined":
      variantClasses = `
        bg-btn-outlined
        text-btn-outlined-text
        border border-btn-outlined-border
        hover:bg-btn-outlined-hover
        hover:text-btn-outlined-hover-text
        active:bg-btn-outlined-active
        active:text-btn-outlined-active-text
      `;
      break;
    case "warning":
      variantClasses = `
        bg-btn-warning
        text-btn-warning-text
        hover:bg-btn-warning-hover
        active:bg-btn-warning-active
        border-none
      `;
      break;
    default:
      variantClasses = "";
  }

  const disabledClasses = disabled
    ? `
      bg-btn-disabled-bg
      text-btn-disabled-text
      cursor-not-allowed
      border-none
    `
    : "";

  const activeShadowClass = `
    active:shadow-[inset_0_0_0_4px_white,0_0_0_6px_btn-outer-shadow]
  `;

  return (
    <button
      disabled={disabled}
      style={{ width, height }}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses}
        ${activeShadowClass}
        ${disabledClasses}
      `}
    >
      {icon && <span>{icon}</span>}
      <span className="text-base">{children}</span>
    </button>
  );
};

export default Button;
