import { IProductComposeOption } from "./productComposeOption";

export interface IProduct {
  _id?: string;
  productName: string;
  description: string;
  images: string[];
  needOptionsCompose:boolean,
  needDocumentOfPrint:boolean,
  needFieldsToOrder: boolean,
  composeOptions?: any;
  slug?: string;
  tags: string[];
  attributes: any[];
  createdAt?: string;
  updatedAt?: string;
}
