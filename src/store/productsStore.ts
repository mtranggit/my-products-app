import {create} from "zustand";

export type ProductType = {
  name: string;
  type: string;
  setProductName: (name: string) => void;
  setProductType: (type: string) => void;
};

export const useProductsStore = create<ProductType>((set) => ({
  name: "",
  type: "",
  setProductName: (name: string) => set({name}),
  setProductType: (type: string) => set({type}),
}));
