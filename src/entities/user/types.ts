export type Address = {
    city: string
}

export type Company = {
    name: string
}

export type User = {
    id: number
    name: string
    username: string
    email: string
    phone: string
    avatar?: string
    address: Address
    company: Company
}
