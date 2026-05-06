import {movieApiSlice} from "@/lib/features/movie/movieApiSlice";
import {Review} from "@/lib/types";
import build from "next/dist/build";
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;

export const reviewApiSlice = movieApiSlice.injectEndpoints({
    endpoints : (build) => ({
        getAllReviewByMovieId : build.query<Review[], string>({
            query : (movieId : string) => `/reviews/movies/${movieId}`
    }),
        //pessimistic update work done is server return
        saveReview : build.mutation<Review, Partial<Review>>({
            query : (reviewToSave : Partial<Review>) => ({
                url : `/reviews`,
                method : 'POST',
                body : reviewToSave,
            }),
            async onQueryStarted(review : Partial<Review>, {dispatch, queryFulfilled}){
                try {
                    const {data : savedReview} = await queryFulfilled
                    const patchResult = dispatch(
                        reviewApiSlice.util.updateQueryData('getAllReviewByMovieId', savedReview.movie,draft=>{
                            draft.push(savedReview);
                        } )
                    )
                }
                catch {

                }
            }
        }),

        //optimistic update is Ui first show
        deleteReview : build.mutation<Review, Review>({
            query : (review :Review
            ) => ({
                url : `/reviews/${review._id}`,
                method : 'DELETE',
            }),
            async onQueryStarted(review : Review , {dispatch, queryFulfilled}){

                    const patchResult = dispatch(
                        reviewApiSlice.util.updateQueryData('getAllReviewByMovieId', review.movie ,draft => {
                           console.log('draft ', draft);
                           return  draft.filter((r: Review) => r._id != review._id);

                        }),
                    )
                    try {
                        await queryFulfilled
                    }catch {
                        patchResult.undo();
                    }
            }
        }),
        //optimistic update is Ui first show
        updateReview : build.mutation<Review, Review>({
            query : (review : Review) => ({
                url : `/reviews/${review._id}`,
                method : 'PUT',
                body : review,
            }),
            async onQueryStarted(review : Review , {dispatch , queryFulfilled}) {
                const patchResult = dispatch(
                    reviewApiSlice.util.updateQueryData('getAllReviewByMovieId', review.movie, (draft)=>{
                        console.log('Draft : ', draft);
                        draft = draft.map((r: Review) => r._id == review._id?  review : r)
                        return draft;
                    })
                )
}
        })
    }),


})

export const {
    useGetAllReviewByMovieIdQuery,
    useSaveReviewMutation,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
} = reviewApiSlice;

