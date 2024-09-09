import { prisma } from "@/libs/prisma";
import { Box, Button } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";

export default async function MenuPage() {
  const menus: Menus[] = await prisma.menus.findMany();

  console.log("data is", menus.length);

  if (menus.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "10vh",
            justifyContent: "flex-end",
          }}
        >
          <Link href={"/backoffice/menus/addingMenu"}>
            {" "}
            <Button
              variant="contained"
              sx={{
                height: "fit-content",
                bgcolor: "#283618",
                ":hover": { bgcolor: "#606c38" },
              }}
            >
              Create New
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#bc6c25",
              color: "#fefae0",
              width: "fit-content",
              padding: "10px",
              borderRadius: "7px",
              marginTop: "25px",
            }}
          >
            There is no menu yet !
          </h1>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "10vh",
          justifyContent: "flex-end",
        }}
      >
        <Link href={"/backoffice/menus/addingMenu"}>
          {" "}
          <Button
            variant="contained"
            sx={{
              height: "fit-content",
              bgcolor: "#283618",
              ":hover": { bgcolor: "#606c38" },
            }}
          >
            Create New
          </Button>
        </Link>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {menus.map((menu) => {
          return (
            <Link key={menu.id} href={`/backoffice/menus/${menu.id}`}>
              <Box
                sx={{
                  cursor: "pointer",
                  ml: 2.5,
                  mt: 3,
                  bgcolor: "#dda15e",
                  color: "#283618",
                  width: "180px",
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <h2 style={{ textAlign: "center" }}>{menu.name}</h2>
                <span style={{ margin: "10px 0px" }}>{menu.price}</span>
                <span style={{ color: menu.isAvailable ? "green" : "#FF0000" }}>
                  {menu.isAvailable ? "Available" : "Not Available"}
                </span>
              </Box>{" "}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
