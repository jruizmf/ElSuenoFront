import { IAddress } from "./address";

export interface IUser {
  _id?: string | null;
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: string[] | ['client'];
  isActive?: boolean | true;
  addresses: IAddress[];
  role?: string | 'client',
  phoneNumber?: string | null;
  banner?: string | null;
  avatar?: string | null;
  __v?: number;
  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}
