import { prisma } from "@/libs/prisma";
import { Box, Button, Link } from "@mui/material";
import { MenuCategories } from "@prisma/client";

export default async function MenuCategoriesPage() {
  const menuCategories: MenuCategories[] =
    await prisma.menuCategories.findMany();

  if (menuCategories.length === 0) {
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
          <Link href={"/backoffice/menu-categories/addingMenuCategories"}>
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
            There is no menu categories yet !
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
        padding: "10px 25px",
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
        <Link href={"/backoffice/menu-categories/addingMenuCategories"}>
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
        {menuCategories.map((menuCategory) => {
          return (
            <Link
              key={menuCategory.id}
              href={`/backoffice/menu-categories/${menuCategory.id}`}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  cursor: "pointer",
                  ml: 2.5,
                  mt: 3,
                  bgcolor: "#bc6c25",
                  color: "#283618",
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <h2>{menuCategory.name}</h2>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
