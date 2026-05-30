'use client'
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link'; // <--- Link ကို အရင် import လုပ်ပါ
import { withAuth } from "@/app/components/withAuth";

function IndexPage() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
            }}
        >
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Welcome to Movie Portal
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Explore the latest and greatest movies
                </Typography>

                {/* ဒီနေရာမှာ Button ကို Link နဲ့ ထုပ်ပေးလိုက်ပါ */}
                <Link href="/movies" passHref>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: '#e50914', '&:hover': { backgroundColor: '#b81d24' } }}
                    >
                        Explore Now
                    </Button>
                </Link>

            </Container>
        </Box>
    );
}

const HomeWithAuth = withAuth(IndexPage);
export default HomeWithAuth;