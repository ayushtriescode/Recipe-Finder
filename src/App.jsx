import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Look in the safe immediately!
    const saved = localStorage.getItem("myRecipes");
    return saved ? JSON.parse(saved) : [];
  });

  const searchRecipes = async () => {
    if (!search) return;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
    );

    const data = await response.json();

    setRecipes(data.meals || []);
  };

  const toggleFavorites = (recipe) => {
    if (!recipe) return;
    const isAlreadyFavourited = favorites.some(
      (fav) => fav.idMeal === recipe.idMeal,
    );

    if (isAlreadyFavourited) {
      const newFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipe.idMeal,
      );
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  useEffect(() => {
    localStorage.setItem("myRecipes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-8 text-slate-800">
      <header className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-black mb-4 tracking-tighter">
          RECIPE <span className="text-[#4f7942]">FINDER</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-2 p-2 bg-white/50 backdrop-blur-lg rounded-2xl border border-white shadow-xl">
          <input
            type="text"
            placeholder="Search for a Recipe... (ex: Pizza)"
            className="flex-1 bg-transparent p-4 outline-none text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchRecipes();
              }
            }}
          />
          <button
            onClick={searchRecipes}
            className="bg-[#4f7942] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3d5e33] transition-all shadow-lg active:scale-95"
          >
            Search
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white/40 p-4 rounded-3xl border border-white shadow-md backdrop-blur-sm"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-2xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold text-[#2d4426]">
              {recipe.strMeal}
            </h3>
            <p className="text-sm opacity-70 mb-4">{recipe.strCategory}</p>

            <button
              onClick={() => toggleFavorites(recipe)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {favorites.some((fav) => fav.idMeal === recipe.idMeal)
                ? "❤️"
                : "🤍"}
            </button>
          </div>
        ))}
      </div>
      {favorites.length > 0 && (
        <div className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-black mb-8 text-[#4f7942] border-b-2 border-[#4f7942]/20 pb-2">
            MY SAVED RECIPES ❤️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favorites.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-[#4f7942]/10 p-3 rounded-2xl border border-[#4f7942]/20 relative"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="rounded-xl mb-2 w-full h-32 object-cover"
                />
                <h3 className="text-sm font-bold text-[#2d4426] leading-tight">
                  {recipe.strMeal}
                </h3>
                <button
                  onClick={() => toggleFavorites(recipe)}
                  className="absolute top-4 right-4 bg-white/80 rounded-full p-1 shadow-sm"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
