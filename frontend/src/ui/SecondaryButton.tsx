import { ReactNode } from "react";
import { Box, Button, ButtonProps } from "@mui/material";

export interface SecondaryButtonProps extends ButtonProps {
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

const SecondaryButton = ({
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
}: SecondaryButtonProps) => {
  return (
    <Box maxWidth={maxWidth} width="100%">
      <Button
        onClick={onClick}
        disableRipple
        disableElevation
        sx={{
          textTransform: "none",
          boxShadow: "none",
          backgroundColor: bgColor || "secondaryButton.bg",
          color: textColor || "secondaryButton.text",
          height: { xs: "56px", md: "48px" },
          width: "100%",
          maxWidth: maxWidth || "100%",
          borderRadius: radius || "auto",
          "&:hover": {
            backgroundColor: hoverBgColor || "secondaryButton.hoverBg",
            color: hoverTextColor || "secondaryButton.hoverText",
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: disabledBgColor || "secondaryButton.disabledBg",
            color: disabledTextColor || "secondaryButton.disabledText",
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

export default SecondaryButton;
