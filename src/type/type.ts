export type categoryProps = {
    id: number
    title: string
    image: string
    product_qty: string
    created_at: string
}

export type productProps = {
    id: number
    title: string
    subtitle: string
    description: string
    price: string
    image: string
    gallery: string[]
    quantity: string
    discount: string
    category: categoryProps
    size: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    _2xl: string
    _3xl: string
    created_at: string
}

export type cartProps = {
    id: number
    product_id: productProps
    quantity: string
    size: string
    user_id: UserProps
    sizeQty: string
    created_at: string
}

export type purchaseHistoryProps = {
    id: number
    product_id: productProps
    user_id: string
    transaction_id:string
    status:string
    currency:string
    quantity:string
    size:string
    created_at: string
}

export type UserProps = {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    avatar?: string | undefined | null
    bio?: string | undefined | null
    token?: string
    created_at?: string
    updated_at?: string
}

export interface PaginatedResponseMetaLink {
    url: string | null
    label: string
    active: boolean
}

export interface PaginatedResponseMeta {
    current_page: number
    from: number
    last_page: number
    links: Array<PaginatedResponseMetaLink>
    path: string
    per_page: number
    to: number
    total: number
}

export interface PaginatedResponseData<T> {
    data: Array<T>
    links: {
        fitst: string
        last: string
        prev: string | null
        next: string | null
    }
    meta: PaginatedResponseMeta
}
