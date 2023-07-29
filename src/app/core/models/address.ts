export interface IAddress {
  _id?: string;
  addressName: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  state: string;
  phone: string;

  createdAt?: string;
  updatedAt?: string;
}
