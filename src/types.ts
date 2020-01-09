
export enum DealType {
    BulkDiscount,
    Free,
}

export type Deal = {
	DealType: DealType
	DiscountPrice ?: number //NOTE: typings to ensure either Discount or Free configuration is present is not implemented for the lack of time
	FreeSKU ?: string
	FreeQuantity ?: number
	Name: string
	Quantity: number
	SKU: string
}

export type Product = {
    sku: string,
    name: string,
    price: number
}