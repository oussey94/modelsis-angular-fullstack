import { ProductType } from "./productType.model";
export class Product {
    id: number;
    name: string;
    created_at: Date;
    type: ProductType;
}