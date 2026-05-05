'use client';
import '../movies.css';
import {useParams} from "next/dist/client/components/navigation";
import MovieDetailsUI from "@/app/movies/[id]/MovieDetailsUI";
import {Movie} from "@/lib/types";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";

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

export default function MovieDetail(){
    const params = useParams<{id : string}>();
    const router = useRouter();
    const onBackHandler = () => {
        router.push("/movies");
    }
    return(<div className={'movies-page-container'}>
        <Button variant="contained" onClick={onBackHandler} >Back</Button>
        <MovieDetailsUI movie={movie} />
    </div>)
}