export default function SearchResults({searchResults}) {

    return (
        <>
            {searchResults.map((result, i) => {
                return (
                    <div key={i} className="resultsDiv">
                        <p>{result.name}</p>
                        {/* If the result is one item, its image will be rendered */}
                        <img className="resultImg" src={result.img} />
                        {/* If the result is an outfit, all outfit items will be rendered */}
                        {result?.items?.map((item, i) => {
                            return (
                                <div key={i}>
                                    <img className="resultImg" src={item.f1.img} />
                                </div>
                            );
                        })}
                    </div>
                );
            })}

        </>
    );

}