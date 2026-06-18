export interface Product {
	id: string;
	name: string;
	price: number;
	description?: string;
	image?: string;
	rating?: number;
	inStock?: boolean;
}

export interface CartItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
}
