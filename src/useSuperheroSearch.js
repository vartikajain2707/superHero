import { useEffect, useRef, useState } from "react";

export default function useSuperheroSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef(null);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const debounceId = setTimeout(() => {
            const fetchHeroes = async () => {
                try {
                    setLoading(true);

                    if (abortRef.current) abortRef.current.abort();
                    abortRef.current = new AbortController();

                    const response = await fetch(
                        `https://www.superheroapi.com/api.php/e4714081bd7143259982b0c8c85dfd34/search/${query}`,
                        { signal: abortRef.current.signal }
                    );

                    const data = await response.json();
                    if (data.results) {
                        setResults(data.results)
                    }
                    else {
                        setResults([])
                    };

                } catch (error) {
                    if (error.name !== "AbortError") console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchHeroes();
        }, 400);

        return () => clearTimeout(debounceId);
    }, [query]);

    return { results, setResults, loading };
}
