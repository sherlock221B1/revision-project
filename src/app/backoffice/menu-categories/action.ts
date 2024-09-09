"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addingMenuCategory(formData: any) {
  const name = formData.get("menuCategoryName");
  await prisma.menuCategories.create({ data: { name: name } });

  redirect("/backoffice/menu-categories");
}

export async function updatingMenuCategory(formData: any) {
  const name = formData.get("menuCategoryName");
  const id = formData.get("id");
  await prisma.menuCategories.update({
    data: { name: name },
    where: { id: Number(id) },
  });

  redirect("/backoffice/menu-categories");
}
export async function deleteMenuCategory(formData: any) {
  const id = formData.get("id");
  await prisma.menuCategories.delete({
    where: { id: Number(id) },
  });

  redirect("/backoffice/menu-categories");
}
