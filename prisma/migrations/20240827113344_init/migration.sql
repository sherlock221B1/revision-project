-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "isAvailable" BOOLEAN DEFAULT true,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MenuCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenusAndMenuCategories" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,

    CONSTRAINT "MenusAndMenuCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenusAndMenuCategories" ADD CONSTRAINT "MenusAndMenuCategories_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusAndMenuCategories" ADD CONSTRAINT "MenusAndMenuCategories_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
