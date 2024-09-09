"use server";

import { prisma } from "@/libs/prisma";
import { MenusAndMenuCategories } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMenuToBeUpdatedOrDeleted(id: number) {
  return await prisma.menus.findFirst({
    where: { id: id },
    include: { menusAndMenuCategories: true },
  });
}

export async function addingMenus(formData: any) {
  const name = formData.get("name");
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const menuCategoryIds: number[] = JSON.parse(formData.get("ids"));
  console.log("ids are", menuCategoryIds);

  const addedMenu = await prisma.menus.create({
    data: { name: name, price: Number(price), isAvailable: isAvailable },
  });

  const data: any = menuCategoryIds.map((menuCategoryId) => ({
    menuId: addedMenu.id,
    menuCategoryId: menuCategoryId,
  }));
  await prisma.menusAndMenuCategories.createMany({ data: data });
  redirect("/backoffice/menus");
}

export async function updatingMenus(formData: any) {
  const name = formData.get("name");
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const id = Number(formData.get("id"));
  const updatedMenuCategoryIds: number[] = JSON.parse(
    formData.get("selectedMenuCategoryIds")
  );

  await prisma.menus.update({
    data: { name: name, price: Number(price), isAvailable: isAvailable },
    where: { id: id },
  });

  const previousMenusAndMenuCategories =
    await prisma.menusAndMenuCategories.findMany({ where: { menuId: id } });
  const previousMenuCategoryIds: number[] = previousMenusAndMenuCategories.map(
    (item) => item.menuCategoryId
  );
  const isSameMenuCategoryIds =
    updatedMenuCategoryIds.length === previousMenuCategoryIds.length &&
    updatedMenuCategoryIds.every((updatedMenuCategoryId) =>
      previousMenuCategoryIds.includes(updatedMenuCategoryId)
    );
  if (!isSameMenuCategoryIds) {
    await prisma.menusAndMenuCategories.deleteMany({ where: { menuId: id } });
    const data = updatedMenuCategoryIds.map((updatedMenuCategoryId) => ({
      menuId: id,
      menuCategoryId: updatedMenuCategoryId,
    }));
    await prisma.menusAndMenuCategories.createMany({ data: data });
  }
  redirect("/backoffice/menus");
}

export async function deleteMenu(formData: any) {
  const id = Number(formData.get("id"));

  await prisma.menusAndMenuCategories.deleteMany({ where: { menuId: id } });

  await prisma.menus.delete({
    where: { id: id },
  });

  redirect("/backoffice/menus");
}

export async function getMenuCategories() {
  return await prisma.menuCategories.findMany();
}
