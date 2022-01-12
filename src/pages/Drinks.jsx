import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import RadioButtons from '../components/RadioButtons';
import CardDrinks from '../components/CardDrinks';
import DrinksCategoryButtons from '../components/DrinksCategoryButtons';
import {
  fetchDrinks,
  fetchDrinkCategoryButtons,
} from '../service/fetchAPI';
import AppContext from '../context/AppContext';

export default function Drinks() {
  const { setDrink, setDrinkCategory, togleFilter, setClicou } = useContext(AppContext);
  const location = useLocation();
  const drinkLength = 9;

  useEffect(() => {
    async function test() {
      const drink = await fetchDrinks();
      const category = await fetchDrinkCategoryButtons();
      console.log(location.pathname.length);

      if (!togleFilter) {
        setDrink(drink);
        setClicou(false);
      }
      setDrinkCategory(category);
    }

    test();
  }, [setDrink, setDrinkCategory, togleFilter, setClicou]);

  return (
    <>
      { location.pathname.length < drinkLength && <div><Header /></div>}
      <div>
        <RadioButtons />
      </div>
      <div>
        <DrinksCategoryButtons />
      </div>
      <div>
        <CardDrinks />
      </div>
      { location.pathname.length < drinkLength && <div><Footer /></div>}
    </>
  );
}
