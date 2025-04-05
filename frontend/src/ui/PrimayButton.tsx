import { ReactNode } from "react";
import { Box, Button, ButtonProps } from "@mui/material";

export interface PrimaryButtonProps extends ButtonProps {
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  disabledBgColor?: string;
  disabledTextColor?: string;
  height?: string;
  radius?: string;
  children: ReactNode;
  maxWidth?: string;
  onClick?: () => void;
}

const PrimaryButton = ({
  bgColor,
  hoverBgColor,
  textColor,
  hoverTextColor,
  disabledBgColor,
  disabledTextColor,
  children,
  radius,
  maxWidth,
  onClick = () => {},
}: PrimaryButtonProps) => {
  return (
    <Box maxWidth={maxWidth} width="100%">
      <Button
        onClick={onClick}
        disableRipple
        disableElevation
        sx={{
          textTransform: "none",
          boxShadow: "none",
          backgroundColor: bgColor || "primaryButton.bg",
          color: textColor || "primaryButton.text",
          height: { xs: "56px", md: "48px" },
          width: "100%",
          maxWidth: maxWidth || "100%",
          borderRadius: radius || "auto",
          "&:hover": {
            backgroundColor: hoverBgColor || "primaryButton.hoverBg",
            color: hoverTextColor || "primaryButton.hoverText",
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: disabledBgColor || "primaryButton.disabledBg",
            color: disabledTextColor || "primaryButton.disabledText",
          },
          "&:active": {
            boxShadow: `inset 0 0 0 2px #ffffff, 0 0 0 4px #99a0ae`,
          },
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default PrimaryButton;
