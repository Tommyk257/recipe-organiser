import "../../css/recipe.css";
import React from 'react';
import RecipeCard from './recipeCard'; 

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-cards">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe.label} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;