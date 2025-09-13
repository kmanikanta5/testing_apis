export interface CustomerUsersByAccountFilterQuery {
    page?: string | number
    perPage?: string | number
    accountIds?: string
    first_name?: string
    last_name?: string
    email?: string
    status?: string
    is_customer_user?: string | boolean
    user_role_id?: string | number
}
export interface UserFilterDTO {
    page?: string | number
    perPage?: string | number
    first_name?: string
    last_name?: string
    email?: string
    phone_number?: string
    designation?: string
    status?: string
    user_role_id?: string | number
    customer_id?: string | number
    accountIds?: string
}