/*
  Warnings:

  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "product_description" SET DEFAULT 'No description',
ALTER COLUMN "quantity" SET DEFAULT 0;
