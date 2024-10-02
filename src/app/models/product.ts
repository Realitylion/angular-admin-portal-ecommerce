export interface APIResponseModel {
    message: string
    result: boolean
    data: any
}

export interface ProductModel {   
    productSku: string
    productId: number
    productName: string
    productPrice: number
    productDescription: string
    productImageUrl: string
    categoryId: number
    categoryName: string
}

export interface CategoryModel {
    categoryId: number
    categoryName: string
}