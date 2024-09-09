"use client";

import MultipleSelect from "@/app/components/multipleSelect/page";
import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { addingMenus, getMenuCategories } from "../action";
import { prisma } from "@/libs/prisma";
import { MenuCategories } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AddingMenu() {
  useEffect(() => {
    handleGetMenuCategories();
  }, []);
  const [selectedMenuCategoryIds, setSelectedMenuCategoryIds] = useState<
    number[]
  >([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);

  const handleGetMenuCategories = async () => {
    const menuCategories = await getMenuCategories();
    setMenuCategories(menuCategories);
  };
  console.log("ids are", selectedMenuCategoryIds);
  return (
    <Box
      component={"form"}
      action={addingMenus}
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
          color: "#283618",
          width: "400px",
          height: "450px",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Adding Menu</h1>
        <TextField
          placeholder="Name"
          type="string"
          name="name"
          sx={{ mt: 3, width: "100%" }}
        />
        <TextField
          placeholder="Price"
          type="number"
          name="price"
          sx={{ mt: 3, mb: 2, width: "100%" }}
        />
        <Box sx={{ width: "100%", mt: 1, mb: 1 }}>
          <MultipleSelect
            title="MenuCategories"
            selectedMenuCategoryIds={selectedMenuCategoryIds}
            setSelectedMenuCategoryIds={setSelectedMenuCategoryIds}
            items={menuCategories}
          />{" "}
        </Box>
        <input
          type="hidden"
          value={JSON.stringify(selectedMenuCategoryIds)}
          name="ids"
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {" "}
          <Checkbox
            name="isAvailable"
            defaultChecked
            sx={{
              color: "black",
              "&.Mui-checked": {
                color: "#283618",
              },
            }}
          />
          <label>Is Available</label>{" "}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
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
