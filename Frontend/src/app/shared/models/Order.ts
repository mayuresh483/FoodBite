import { LatLng } from "leaflet";
import { CartItems } from "./CartItems";

export class Order{
    id!:number;
    items!:CartItems[];
    totalPrice!:number;
    name!:string;
    address!:string;
    addressLatLang?: LatLng;
    paymentId!:string;
    createdAt!:string;
    status!:string;
}