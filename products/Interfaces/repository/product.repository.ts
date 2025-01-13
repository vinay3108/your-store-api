
export interface IProductRequestModel {
    name: string;
    type?: string;
    brand?: string;
    imageUrl?: string;
    rating?: number;
}

export interface IProductResponseModel {
    id: number;
    name: string;
    type?: string;
    brand?: string;
    imageUrl?: string;
    rating?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductRepository {
    createProduct(product: IProductRequestModel): Promise<IProductResponseModel>;
    updateProduct(id: number, product: IProductRequestModel): Promise<IProductResponseModel>;
    getProducts(): Promise<IProductResponseModel[]>;
    getProduct(id: number): Promise<IProductResponseModel>;
    deleteProduct(id: number): Promise<void>;
}