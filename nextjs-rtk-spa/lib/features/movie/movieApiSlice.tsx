
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Movie} from "@/lib/types";
import {quotesApiSlice} from "@/lib/features/quotes/quotesApiSlice";
console.log('base Url', process.env.NEXT_PUBLIC_BASE_URL);
export const movieApiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api"}),
    reducerPath :"moviesApi",
    tagTypes : ["Movies"],
    endpoints : (build) => ({
        getAllMovies : build.query<Movie[], undefined>({
            query : ()=> `/movies`,
        })
    })
})

export const {useGetAllMoviesQuery} = movieApiSlice;