'use client';
import '../movies.css';
import {useParams} from "next/dist/client/components/navigation";
import MovieDetailsUI from "@/app/movies/[id]/MovieDetailsUI";
import {Movie} from "@/lib/types";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {useGetAllMoviesQuery} from "@/lib/features/movie/movieApiSlice";

const movie : Movie = {
    "_id": "69f6d27693b9e73c665b1f20",
    "title": "Test 10",
    "director": {
        "name": "Christopher Nolan",
        "phoneNo": "09993",
        "_id": "69f6d27693b9e73c665b1f21"
    },
    "year": 2025
};

export default function MovieDetailPage(){
    const {id} : {id : string} = useParams<{id : string}>();
    console.log('movie id ', id)
    const router = useRouter();
    const {movie, isLoading} = useGetAllMoviesQuery(undefined, {
        selectFromResult : ({data, isLoading}) => {
            return {
                movie : (data ?? []).filter(m => m._id == id)[0] as Movie,
                isLoading
            }
        }
    })
    console.log('movie data', movie)
    const onBackHandler = () => {
        router.push("/movies");
    }
    if(isLoading){
        return (<div>Loading...</div>)
    }else if(movie) {
        return(<div className={'movies-page-container'}>
            <Button variant="contained" onClick={onBackHandler} >Back</Button>
            <MovieDetailsUI movie={movie} />
        </div>)
    }
}