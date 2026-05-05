'use client';

import styles from './MovieUI.module.css';
import {Movie} from "@/lib/types";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation'

interface MovieUIProps{
    movie : Movie;
    render? : (movie : Movie) => JSX.Element;
}

export default function MovieUi({movie, render}: MovieUIProps){

    return <div className={styles["movie-ui-container"]} >
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 231, height: 280,objectFit: "fill",  }}
                image="/poster.png"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography component="div" variant="h3">
                        {movie.title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {movie.year}
                    </Typography>
                    <Typography component="div" variant="h5">
                        {movie.director.name}
                    </Typography>
                    {
                        render?.(movie)
                    }
                </CardContent>
            </Box>

        </Card>
    </div>
}