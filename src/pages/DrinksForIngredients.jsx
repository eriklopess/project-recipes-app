import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import { fetchIngredientsDrinksList } from '../service/fetchAPI';
import AppContext from '../context/AppContext';

function DrinksForIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setIngredient } = useContext(AppContext);
  useEffect(() => {
    const getIngredientsList = async () => {
      const ingredientsArray = [];
      const ingredientsData = await fetchIngredientsDrinksList();
      const TWELVE = 12;
      for (let i = 0; i < TWELVE; i += 1) {
        ingredientsArray.push(ingredientsData.drinks[i]);
      }
      setIngredients(ingredientsArray);
    };
    getIngredientsList();
  }, []);
  const history = useHistory();
  const handleClick = ({ strIngredient1 }) => {
    setIngredient(strIngredient1);
    return history.push('/bebidas');
  };
  return (
    <>
      <div>
        <Header />
      </div>
      {ingredients.map((ingredient, index) => (
        <button
          type="button"
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          onClick={ () => handleClick(ingredient) }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt="Ingredient"
            data-testid={ `${index}-card-img` }
          />
          <h2 data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</h2>
        </button>
      ))}
      <div>
        <Footer />
      </div>
    </>
  );
}

export default DrinksForIngredients;
