"use client";

import MultipleSelect from "@/app/components/multipleSelect/page";
import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import {
  addingMenus,
  deleteMenu,
  getMenuCategories,
  getMenuToBeUpdatedOrDeleted,
  updatingMenus,
} from "../action";
import { prisma } from "@/libs/prisma";
import { useEffect, useState } from "react";
import { MenuCategories, Menus, MenusAndMenuCategories } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}
export default function AddingMenu({ params }: Props) {
  const id = Number(params.id);

  useEffect(() => {
    handleGetMenuCategories();
    handleGetMenuToBeUpdatedOrDeleted();
  }, []);
  const [selectedMenuCategoryIds, setSelectedMenuCategoryIds] = useState<
    number[]
  >([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const [menuToBeUpdatedOrDeleted, setMenuToBeUpdatedOrDeleted] =
    useState<Menus>();

  const handleGetMenuCategories = async () => {
    const menuCategories = await getMenuCategories();
    setMenuCategories(menuCategories);
  };

  const handleGetMenuToBeUpdatedOrDeleted = async () => {
    const menuToBeUpdatedOrDeleted: any = (await getMenuToBeUpdatedOrDeleted(
      id
    )) as Menus;
    setMenuToBeUpdatedOrDeleted(menuToBeUpdatedOrDeleted);
    console.log("boolen is", menuToBeUpdatedOrDeleted.isAvailable);
    console.log("menuToBeUpdatedOrDetlete is", menuToBeUpdatedOrDeleted);
    const selectedMenuCategoryIds =
      menuToBeUpdatedOrDeleted.menusAndMenuCategories.map(
        (item: MenusAndMenuCategories) => item.menuCategoryId
      );
    console.log("data is", selectedMenuCategoryIds);
    setSelectedMenuCategoryIds(selectedMenuCategoryIds);
  };

  if (!menuToBeUpdatedOrDeleted) return null;
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
          width: "400px",
          height: "450px",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          component={"form"}
          action={updatingMenus}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Updating Menu</h1>
          <TextField
            placeholder="Name"
            type="string"
            name="name"
            defaultValue={menuToBeUpdatedOrDeleted?.name}
            sx={{ mt: 3, width: "100%" }}
          />
          <TextField
            placeholder="Price"
            type="number"
            name="price"
            defaultValue={menuToBeUpdatedOrDeleted?.price}
            sx={{ mt: 3, mb: 1.5, width: "100%" }}
          />
          <Box sx={{ width: "100%" }}>
            {/*           <MultipleSelect />
             */}{" "}
          </Box>
          <Box sx={{ width: "100%" }}>
            {" "}
            <MultipleSelect
              title="MenuCategoryIds"
              selectedMenuCategoryIds={selectedMenuCategoryIds}
              setSelectedMenuCategoryIds={setSelectedMenuCategoryIds}
              items={menuCategories}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Checkbox
              name="isAvailable"
              defaultChecked={
                menuToBeUpdatedOrDeleted.isAvailable ? true : false
              }
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "#283618",
                },
              }}
            />
            <label>Is Available</label>{" "}
          </Box>
          <input type="hidden" value={id} name="id" />
          <input
            type="hidden"
            value={JSON.stringify(selectedMenuCategoryIds)}
            name="selectedMenuCategoryIds"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: "#283618",
              color: "#fefae0",
              ":hover": { bgcolor: "#606c38", color: "black" },
            }}
          >
            Update Menu
          </Button>
        </Box>
        <Box component={"form"} action={deleteMenu} sx={{ mt: 2 }}>
          <input type="hidden" value={menuToBeUpdatedOrDeleted?.id} name="id" />
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
