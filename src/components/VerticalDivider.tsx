"use client";

import Box from "@mui/material/Box";

export type VerticalDividerProps = {
  height?: string | number;
  margin?: string;
};

export default function VerticalDivider({ height, margin }: VerticalDividerProps) {
  return (
    <Box
      sx={{
        display: "block",
        width: "1px",
        height,
        backgroundColor: "divider",
        margin,
      }}
    />
  );
}
