import { SubCategory } from "./sub-category";

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}
