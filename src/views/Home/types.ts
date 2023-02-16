export interface Product {
    id: number
    title: string
    price: number
    image: string
}

export interface ProductFormatted extends Product {
    priceFormatted: string
}

export interface CartItemsAmount {
    [key: number]: number
}