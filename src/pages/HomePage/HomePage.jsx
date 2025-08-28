import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function RecipesListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://project-recipesback.onrender.com/api/recipes");
       
        setRecipes(Array.isArray(response.data.data.hits) ? response.data.data.hits : []);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити рецепти");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Список рецептів</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recipes.map((recipe) => (
          <li key={recipe._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description?.slice(0, 100)}...</p>
            <img src={recipe.thumb} alt={recipe.title} style={{ width: "200px", display: "block", marginBottom: "10px" }} />
            <Link to={`/recipe-view/${recipe._id}`}>
              <button>Переглянути рецепт</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

