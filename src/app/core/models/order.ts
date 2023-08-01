import { Price, Size, Value } from 'src/app/pages/product/product-details/product-details.component';
import { ICuponCode, IUser } from './';

export interface IOrder {
  _id?: string;
  user?: IUser;
  quantity:number;
  orderItems: IOrderItem[];
  shippingAddress?: IShippingAddress;
  paymentResult?: string;
  coupon?: ICuponCode;
  // numberOfItems: number;
  // subTotal: number;
  // tax: number;
  total: number;
  isDelivery: boolean | false;
  isPaid?: boolean | false;
  paidAt?: string;
  paidMetod?: 'paypal' | 'square';
  delivery?: IDelivery;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
  orderState?: 'pending' | 'processing' | 'completed' | 'unPaid';
}

export interface IDelivery {
  price: number;
  required: boolean;
}

export interface IOrderItem {
      productId: any;
      productName: string;
      slug: string;
      image: string;
      price: {
        sizeTitle: string;
        sizes: Size[];
        price: number;
      };
      optionComposes: [
        {
          productComposeId: any;
          values: Value[];
          increment: number;
        },
      ];
      quantity: number;
      total: number;
    
}

interface IUserImages {
  image: string;
  quantity: number;
  information?: any;
}

export interface IShippingAddress {
  _id?: string;
  user?: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
}
