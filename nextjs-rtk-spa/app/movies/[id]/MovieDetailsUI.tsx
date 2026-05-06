'use client';

import MovieUi from "@/app/movies/components/MovieUi";
import {Movie, Review} from "@/lib/types";
import ReviewUI from "@/app/movies/[id]/components/ReviewUI";
import Button from "@mui/material/Button";
import EditMovie from "@/app/movies/components/EditMovie";
import ReviewEntry from "@/app/movies/[id]/components/ReviewEntry";
import {useGetAllReviewByMovieIdQuery} from "@/lib/features/review/reviewApiSlice";

interface MovieDetailsUI{
    movie : Movie;
}

const reviews : Review[] = [
    {
        "_id": "69f6d2b193b9e73c665b1f3b",
        "movie": "69f6d27693b9e73c665b1f20",
        "rating": 4,
        "review": "second review for 21 day laters"
    },
    {
        "_id": "69f6d2b693b9e73c665b1f3e",
        "movie": "69f6d27693b9e73c665b1f20",
        "rating": 5,
        "review": "second review for 21 day laters"
    }
];

function renderAciton(movie: Movie){
    return(<div>
        <EditMovie movie={movie} />
    </div>)
}

export default function MovieDetailsUI({movie}:MovieDetailsUI){
    const {data: reviews, isError, isLoading, isSuccess} = useGetAllReviewByMovieIdQuery(movie._id);
    return (<div>
        <MovieUi movie={movie} render={renderAciton} />
        <ReviewEntry movieId={movie._id} />
        {
           isSuccess && reviews.length > 0 && reviews.map(review => <ReviewUI
                            key={review._id}
                            review={review}
            />)
        }
    </div>)
}