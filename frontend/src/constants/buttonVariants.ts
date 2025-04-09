export const buttonVariants = {
    primary: `
      bg-[var(--btn-primary-bg)]
      text-[var(--btn-primary-text)]
      hover:bg-[var(--btn-primary-hover-bg)]
      active:bg-[var(--btn-primary-active-bg)]
      border-none
    `,
    secondary: `
      bg-[var(--btn-secondary-bg)]
      text-[var(--btn-secondary-text)]
      hover:bg-[var(--btn-secondary-hover-bg)]
      hover:text-[var(--btn-secondary-hover-text)]
      active:bg-[var(--btn-secondary-active-bg)]
      active:text-[var(--btn-secondary-active-text)]
      border border-[var(--btn-secondary-border)]
      active:border-[var(--btn-secondary-active-border)]
      focus-visible:ring-2
      focus-visible:ring-[var(--btn-active-ring)]
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[var(--btn-inner-shadow-color)]
    `,
    outlined: `
      bg-[var(--btn-outlined-bg)]
      text-[var(--btn-outlined-text)]
      hover:bg-[var(--btn-outlined-hover-bg)]
      hover:text-[var(--btn-outlined-hover-text)]
      active:bg-[var(--btn-outlined-active-bg)]
      active:text-[var(--btn-outlined-active-text)]
      border border-[var(--btn-outlined-border)]
      active:border-[var(--btn-outlined-active-border)]
      focus-visible:ring-2 focus-visible:ring-[var(--btn-active-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--btn-inner-shadow-color)]
    `,
    warning: `
      bg-[var(--btn-warning-bg)]
      text-[var(--btn-warning-text)]
      hover:bg-[var(--btn-warning-hover-bg)]
      active:bg-[var(--btn-warning-active-bg)]
      border-none
    `,
    text: `
      bg-transparent
      p-[4px]
    `,
    icon: `
      bg-transparent
      p-[4px]
  `,
} as const;
  

export type ButtonVariant = keyof typeof buttonVariants;
