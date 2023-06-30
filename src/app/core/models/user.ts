import { IAddress } from "./address";

export interface IUser {
  _id?: string | null;
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: string[] | ['client'];
  isActive?: boolean | true;
  address?: IAddress[] | null | undefined;
  phoneNumber?: string | null;
  banner?: string | null;
  avatar?: string | null;
  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
}
