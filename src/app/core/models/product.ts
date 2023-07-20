import { IProductComposeOption } from "./productComposeOption";

export interface IProduct {
  _id?: string;
  productName: string;
  description: string;
  images: string[];
  productComposeOptions?: IProductComposeOption;
  slug?: string;
  tags: string[];
  attributes: any[];
  createdAt?: string;
  updatedAt?: string;
}
