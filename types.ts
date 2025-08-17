export type ProductType = "Beer" | "Wine" | "Spirits" | "Cider";

export type Product = {
  index: number;
  isSale: boolean;
  price: string;
  productImage: string;
  productName: string;
  type: ProductType;
};
