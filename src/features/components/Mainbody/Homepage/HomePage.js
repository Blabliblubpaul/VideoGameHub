import CategoryPreview from "./CategoryPreview"

export default function HomePage() {
    return (
        <div id="homePage">
            <h1 id="homePageHeader">HomePage</h1>
            <div id="categoryPreviews">
                <CategoryPreview title="Most Popular" query="where version_parent = null & total_rating_count > 1000; sort rating desc; limit 20;"/>
                <CategoryPreview title="Shooters" query="where version_parent = null & genres = 5; sort total_rating_count desc; limit 20;"/>
                <CategoryPreview title="RPGs" query="where version_parent = null & genres = 12; sort total_rating_count desc; limit 20;"/>
                {/* Includes Genres Strategy (15), Turn-bases strategy (16). */}
                <CategoryPreview title="Strategy" query="where version_parent = null & genres = (15, 16); sort total_rating_count desc; limit 20;"/>
            </div>
        </div>
    )
}
