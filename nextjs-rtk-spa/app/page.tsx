'use client'
import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import Button from '@mui/material/Button';
import {withAuth} from "@/app/components/withAuth";

 function IndexPage() {
  return (<div>
    <Button variant="contained">Home Page</Button>
  </div>);
}

// export const metadata: Metadata = {
//   title: "SPA MOVIE PROJECT",
// };

const HomeWithAuth = withAuth(IndexPage);
export default HomeWithAuth;