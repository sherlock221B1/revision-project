import { Box } from "@mui/material";

export default function BackofficePage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <h1
        style={{
          backgroundColor: "#bc6c25",
          color: "#fefae0",
          padding: "10px",
          borderRadius: "7px",
        }}
      >
        Orders Page
      </h1>
    </Box>
  );
}
