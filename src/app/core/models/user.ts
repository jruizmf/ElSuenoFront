
export interface IUser {
  _id?: string | null;
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: string[] | ['client'];
  isActive?: boolean | true;
  addresses?: any[] | null | undefined;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
}
