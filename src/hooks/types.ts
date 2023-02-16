import { Product } from "src/types"

export interface CartProviderProps {
    children: React.ReactNode
}

export interface UpdateProductAmount {
    productId: number
    amount: number
}

export interface CartContextData {
    cart: Product[]
    addProduct: (productId: number) => Promise<void>
    removeProduct: (productId: number) => void
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}
