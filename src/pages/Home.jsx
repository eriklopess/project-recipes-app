import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import CardFood from '../components/CardFood';
import RadioButtons from '../components/RadioButtons';
import { fetchFoods, fetchFoodCategoryButtons } from '../service/fetchAPI';
import AppContext from '../context/AppContext';
import FoodsCategoryButtons from '../components/FoodsCategoryButtons';

function Home() {
  const { setRecipe, setCategory, togleFilter, setClicou } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    async function test() {
      const foods = await fetchFoods();
      const category = await fetchFoodCategoryButtons();
      console.log(location.pathname.length);

      if (!togleFilter) {
        setRecipe(foods);
        setClicou(false);
      }
      setCategory(category);
    }

    test();
  }, [setCategory, setRecipe, togleFilter, setClicou]);

  return (
    <>
      { location.pathname.length < 9 && <div><Header /></div>}
      <div>
        <RadioButtons />
      </div>
      <div>
        <FoodsCategoryButtons />
      </div>
      <div>
        <CardFood />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
