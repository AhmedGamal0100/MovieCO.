import { IMovie } from "./movie"
import { ITv } from "./tv"

export interface IAccount {
    sub: string,
    email: string,
    name: string,
    given_name: string,
    family_name?: string,
    picture?: string,
    lang?: string,
    password: string,
    passConfirm?: string,
    isPassGoogle: boolean,
    address?: {
        building: string,
        street: string,
        country: string,
        city: string
    },
    wishList?: {
        moviesIds: number[],
        tvShowsIds: number[]
    }
}
