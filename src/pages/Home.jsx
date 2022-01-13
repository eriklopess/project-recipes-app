import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import RadioButtons from '../components/RadioButtons';
import { fetchFoods,
  fetchFoodCategoryButtons,
  fetchFoodIngredient } from '../service/fetchAPI';
import AppContext from '../context/AppContext';
import FoodsCategoryButtons from '../components/FoodsCategoryButtons';

function Home() {
  const {
    setRecipe,
    setCategory,
    togleFilter,
    setClicou,
    ingredient } = useContext(AppContext);
  const location = useLocation();
  const foodLength = 9;

  useEffect(() => {
    async function setFoodByIngredient() {
      if (!ingredient) return;
      const foods = await fetchFoodIngredient(ingredient);
      setRecipe(foods);
    }

    async function test() {
      const foods = await fetchFoods();
      const category = await fetchFoodCategoryButtons();
      if (!togleFilter) {
        setRecipe(foods);
        setClicou(false);
      }
      setCategory(category);
      setFoodByIngredient();
    }

    test();
  }, [setCategory, setRecipe, togleFilter, setClicou]);

  return (
    <>
      { location.pathname.length < foodLength && <div><Header /></div>}
      <div>
        <RadioButtons />
      </div>
      <div>
        <FoodsCategoryButtons />
      </div>
      <div>
        <CardFood />
      </div>
      { location.pathname.length < foodLength && <div><Footer /></div>}
    </>
  );
}

export default Home;
