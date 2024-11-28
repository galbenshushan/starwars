import { Categories } from "../enums/apiEnums";

export interface Result {
  category: Categories;
  data: any[];
}

export interface Option {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  created?: string;
  edited?: string;
  url?: string;
  [key: string]: any;
}
