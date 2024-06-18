import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import HomePage from "@/templates/HomePage";

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('_id');
        const name = localStorage.getItem('name');

        if (!token || !userId || !name) {
            router.push('/sign-in');
        }

        // console.log('token', token);
    }, [router]);

    return <HomePage />;
};

export default Home;
