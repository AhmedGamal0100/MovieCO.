import { IMovie } from "./movie"
import { IMovieDetails } from "./movie-details"
import { ITv } from "./tv"
import { ITvDetails } from "./tv-details"

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
        movies: IMovieDetails[],
        tvShows: ITvDetails[]
    }
}
