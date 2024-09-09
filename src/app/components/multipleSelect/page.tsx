"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuCategories } from "@prisma/client";
import { it } from "node:test";
import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";

interface Props {
  title: string;
  selectedMenuCategoryIds: number[];
  setSelectedMenuCategoryIds: Dispatch<SetStateAction<number[]>>;
  items: MenuCategories[];
}

export default function MultipleSelect({
  title,
  selectedMenuCategoryIds,
  setSelectedMenuCategoryIds,
  items,
}: Props) {
  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedMenuCategoryIds}
          onChange={(e) => {
            selectedMenuCategoryIds = e.target.value as number[];
            setSelectedMenuCategoryIds(selectedMenuCategoryIds);
          }}
          input={<OutlinedInput label={title} />}
          renderValue={() => {
            return selectedMenuCategoryIds
              .map((selectedMenuCategoryId) =>
                items.find((item) => item.id === selectedMenuCategoryId)
              )
              .map((item) => item?.name)
              .join(",");
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selectedMenuCategoryIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
