
export interface CreateProductRequest {
    name: string;
    type?: string;
    brand?: string;
    imageUrl?: string;
    rating?: number;
}


export interface ProductResponse {
    id: number;
    name: string;
    type?: string;
    brand?: string;
    imageUrl?: string;
    rating?: number;
    createdAt: Date;
    updatedAt: Date;
}