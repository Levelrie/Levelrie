import { useEffect } from "react";

export default function SearchResults({searchResults}) {

    // useEffect(() => {
    //     return () => {

    //     }
    // }, [])

    return (
        <>
            {searchResults.map((result, i) => {
                return (
                    <p key={i}>{result.name}</p>
                );
            })}

        </>
    );

}