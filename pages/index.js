import SearchOnOMDb from '../components/SearchOnOMDb';
import Head from 'next/head';

export default function App() {
    return <>
        <Head>
            <title>Movies from OMDB</title>
        </Head>
        <SearchOnOMDb />
    </>
}