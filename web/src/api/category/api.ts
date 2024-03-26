import axios from "axios";

import { env } from "@/env.mjs";
import { ICategory } from "@/types";

const apiUser = env.NEXT_PUBLIC_BACKEND_URL;
export const CATEGORY_QUERY_KEY = "categories";

export class CategoryService {
  static async getCategoryList(): Promise<ICategory[]> {
    const url = `${apiUser}/categories`;
    const { data } = await axios.get<ICategory[]>(url);
    return data;
  }
}
