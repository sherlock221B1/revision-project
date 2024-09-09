import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { addingMenuCategory } from "../action";

export default function AddingMenu() {
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
        component={"form"}
        action={addingMenuCategory}
        sx={{
          bgcolor: "#bc6c25",
          width: "300px",
          height: "300px",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Adding Menu Category</h1>
        <TextField
          placeholder="Name"
          type="string"
          defaultValue={""}
          name="menuCategoryName"
          sx={{ mt: 3, width: "100%" }}
        />
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
          Add Menu
        </Button>
      </Box>
    </Box>
  );
}
