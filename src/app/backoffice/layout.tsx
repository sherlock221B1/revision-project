import { Box } from "@mui/material";
import { ReactNode } from "react";
import TopBar from "../components/topBar";
import SideBar from "../components/sideBar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <Box sx={{ width: "100%", height: "100vh", bgcolor: "#fefae0" }}>
          {children}{" "}
        </Box>
      </Box>
    </Box>
  );
}
