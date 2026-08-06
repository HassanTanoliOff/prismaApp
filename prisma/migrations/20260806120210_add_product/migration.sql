-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
