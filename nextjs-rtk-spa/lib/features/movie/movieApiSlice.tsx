
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Movie} from "@/lib/types";
import {quotesApiSlice} from "@/lib/features/quotes/quotesApiSlice";
import {draftMode} from "next/dist/server/request/draft-mode";
console.log('base Url', process.env.NEXT_PUBLIC_BASE_URL);
export const movieApiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api"}),
    reducerPath :"moviesApi",
    tagTypes : ["Movies"],
    endpoints : (build) => ({
        getAllMovies : build.query<Movie[], undefined>({
            query : ()=> `/movies`,
        }),
        //pessimistic update is server give Id condition Using..
        saveMovie : build.mutation<Movie, Partial<Movie>>({
            query : (movieToSave : Partial<Movie>) => ({
                url : `/movies`,
                method : 'POST',
                body : movieToSave,
            }),
            async onQueryStarted(movie : Partial<Movie>, {dispatch, queryFulfilled}){
                try {
                    const {data : savedMovie} = await queryFulfilled
                    const patchResult = dispatch(
                        movieApiSlice.util.updateQueryData('getAllMovies', undefined, (draft)=>{
                            draft.push(savedMovie);
                        })
                    )
                }catch {

                }
            }
        }),

        //optimistic updated
        updateMovie : build.mutation<Movie, Movie>({
            query : (movie : Movie) => ({
                url : `/movies/${movie._id}`,
                method : 'PUT',
                body : movie,
            }),
            async onQueryStarted(movie : Movie, {dispatch , queryFulfilled}){
                const patchResult = dispatch(
                    movieApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {
                        console.log('Dratf : ', draft);
                        draft = draft.map((m : Movie) => m._id == movie._id ? movie : m);
                        return draft;
                    }),
                )
                try {
                    await queryFulfilled
                }catch {
                    patchResult.undo();
                }
            }
        }),

        //optimistic updated
        deleteMovie : build.mutation<Movie, Movie>({
            query : (movie : Movie) => ({
                url : `/movies/${movie._id}`,
                method : 'DELETE'
            }),
            async onQueryStarted(movie : Movie, {dispatch, queryFulfilled}){
                const patchResult = dispatch(
                    movieApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {
                        draft = draft.filter((m: Movie) => m._id != movie._id)
                        return draft;
                    })
                )
                try {
                    await queryFulfilled
                }catch {
                    patchResult.undo();
                }

            }
        })
    })
})

export const {
    useGetAllMoviesQuery,
    useSaveMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
} = movieApiSlice;