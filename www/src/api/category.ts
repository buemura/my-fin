import axios from "axios";

import { ICategory } from "@/types";
import { env } from "@/utils";

const apiUser = env.VITE_BACKEND_URL;

export class CategoryService {
  static async getCategoryList(): Promise<ICategory[]> {
    const url = `${apiUser}/category`;
    const { data } = await axios.get<ICategory[]>(url);
    return data;
  }
}
