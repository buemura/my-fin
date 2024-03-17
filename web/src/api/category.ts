import axios from "axios";

import { ICategory } from "@/types";
import { env } from "@/env.mjs";

const apiUser = env.NEXT_PUBLIC_BACKEND_URL;

export class CategoryService {
  static async getCategoryList(): Promise<ICategory[]> {
    const url = `${apiUser}/categories`;
    const { data } = await axios.get<ICategory[]>(url);
    return data;
  }
}
