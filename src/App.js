import "./App.css";
import RecipeList from "./components/recipe/recipe.js";
import Searchbar from "./components/searchbar/searchbar.js";
import Navbar from "./components/nav/nav.js";
import React, { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("apple");

  useEffect(() => {
    // Define your API URL
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=11f2906f&app_key=355f530bd57a0559d74b7aec38163ec0&to=25`;

    // Make a fetch GET request
    fetch(apiUrl)
      .then((response) => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        // Handle the successful response
        setRecipes(data.hits);
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <main className="App-main">
        <Searchbar onSearch={handleSearch} />
        <Navbar />
        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}

export default App;
