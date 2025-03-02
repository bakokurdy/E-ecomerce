export class User{
  name!:string;
  mobilenumber!:number; 
  age!:number;
  dob!:Date;
  email!:string;
  password!:string;
  address!:Address;
  language!:string;
  gender!:string;
  uploadPhoto!:string;
  aboutyou!:string;
  agreetc!:boolean;
  role!:string;
}
export class Address{
    id!:number;
    addlin1!:string;
    addlin2!:string;
    city!:string;
    state!:string;
    zipcode!:number;
}
export class Product{
    id!:number;
    name!:string;
    onum!:string;
    uploadPhoto!:string;
    uploadDesc!:string;
    mrp!:number;
    db!:number;
    status!:boolean;
   // groupId!:string;
}
export class Order{
    id!:number;
  userId!:number;
  sellId!:number;
  product!:Product;
  deliveryAddress!:Address;
  contact!:number;
  dateTime!:string;
}
export interface MyContact{
  this: any;

  id?: string ;
  name :string ;
  onum :string;
  mrp :string ;
  db :string ;
  uploadPhoto :string;
  uploadDesc :string;
  status : string;
  Total :string;
  groupId:string;
 }
 export interface groupshops{
  id: string ;
  name : string ;
 shop_num:string ;
 }
