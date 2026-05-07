'use client';
import './movies.css';
import {Movie} from "@/lib/types";
import MovieList from "@/app/movies/components/MovieList";
import Button from "@mui/material/Button";
import MovieDialog from "@/app/movies/components/MovieDialog";
import NewMovieEntry from "@/app/movies/components/NewMovieEntry";
import {useGetAllMoviesQuery} from "@/lib/features/movie/movieApiSlice";
import {withAuth} from "@/app/components/withAuth";

const movies : Movie[] = [
    {
        "_id": "69f6d27693b9e73c665b1f20",
        "title": "Test 10",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d27693b9e73c665b1f21"
        },
        "year": 2025
    },
    {
        "_id": "69f6d27b93b9e73c665b1f23",
        "title": "Test 9",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d27b93b9e73c665b1f24"
        },
        "year": 2025
    },
    {
        "_id": "69f6d27f93b9e73c665b1f26",
        "title": "Test 8",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d27f93b9e73c665b1f27"
        },
        "year": 2025
    },
    {
        "_id": "69f6d28393b9e73c665b1f29",
        "title": "Test 7",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d28393b9e73c665b1f2a"
        },
        "year": 2025
    },
    {
        "_id": "69f6d28693b9e73c665b1f2c",
        "title": "Test 1",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d28693b9e73c665b1f2d"
        },
        "year": 2025
    },
    {
        "_id": "69f6d28a93b9e73c665b1f2f",
        "title": "Test 2",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d28a93b9e73c665b1f30"
        },
        "year": 2025
    },
    {
        "_id": "69f6d28d93b9e73c665b1f32",
        "title": "Test 3",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d28d93b9e73c665b1f33"
        },
        "year": 2025
    },
    {
        "_id": "69f6d29093b9e73c665b1f35",
        "title": "Test 4",
        "director": {
            "name": "Christopher Nolan",
            "phoneNo": "09993",
            "_id": "69f6d29093b9e73c665b1f36"
        },
        "year": 2025
    }
]

 function MoviePage(){
    const {data, isError, isLoading, isSuccess} = useGetAllMoviesQuery(undefined);
    return (<div className={'movies-page-container'}>
        <NewMovieEntry />
        {
            isSuccess && <MovieList movies={data} />
        }

    </div>)
}

const MovieWithAuth = withAuth(MoviePage);
export default MovieWithAuth;
