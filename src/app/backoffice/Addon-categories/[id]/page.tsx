import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import {
  addingMenuCategory,
  deleteMenuCategory,
  updatingMenuCategory,
} from "../action";
import { prisma } from "@/libs/prisma";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingMenu({ params }: Props) {
  const id = Number(params.id);
  const menuCategoryToBeUpdated = await prisma.menuCategories.findFirst({
    where: { id: id },
  });
  return (
    <Box
      sx={{
        width: "100",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#bc6c25",
          width: "320px",
          height: "320px",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component={"form"}
          action={updatingMenuCategory}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Updating Menu Category</h1>
          <TextField
            placeholder="Name"
            type="string"
            defaultValue={menuCategoryToBeUpdated?.name}
            name="menuCategoryName"
            sx={{ mt: 3, width: "100%" }}
          />
          <input type="hidden" value={menuCategoryToBeUpdated?.id} name="id" />
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              bgcolor: "#283618",
              color: "#fefae0",
              ":hover": { bgcolor: "#606c38", color: "black" },
            }}
          >
            Update Menu
          </Button>
        </Box>
        <Box component={"form"} action={deleteMenuCategory} sx={{ mt: 3 }}>
          <input type="hidden" value={menuCategoryToBeUpdated?.id} name="id" />
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ ":hover": { opacity: "0.5" } }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
