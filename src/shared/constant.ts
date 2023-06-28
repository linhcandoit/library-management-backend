export const ROLE = {
    admin: "admin",
    user: "user"
}

export enum BORROWING_STATUS {
    borrowed = "borrowed",
    returned = "returned",
    expired = "expired"
}

export const A_DAY_TIME = 24 * 60 * 60 * 1000;
export const A_MONTH_TIME = 30 * A_DAY_TIME;