import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import Button from '@mui/material/Button';

export default function IndexPage() {
  return (<div>
    <Button variant="contained">Hello world</Button>
  </div>);
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
