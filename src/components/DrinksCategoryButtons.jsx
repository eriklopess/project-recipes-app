import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { fetchDrinkFilter } from '../service/fetchAPI';

export default function DrinksCategoryButtons() {
  const { drinkCategory,
    togleFilter,
    setTogleFilter,
    setClicou,
    setDrink,
  } = useContext(AppContext);

  const testId = [
    'Ordinary Drink-category-filter',
    'Cocktail-category-filter',
    'Milk / Float / Shake-category-filter',
    'Other/Unknown-category-filter',
    'Cocoa-category-filter',
  ];

  async function handleClick({ target }) {
    if (togleFilter) {
      setTogleFilter(false);
    } else {
      setTogleFilter(true);
    }

    setClicou(true);
    const data = await fetchDrinkFilter(target.value);
    setDrink(data);
  }

  function renderCategory() {
    const four = 4;
    return (
      drinkCategory.drinks.map((button, index) => {
        if (index > four) return null;
        return (
          <div key={ button.strCategory }>
            <button
              type="button"
              data-testid={ testId[index] }
              value={ button.strCategory }
              onClick={ handleClick }
            >
              {button.strCategory}
            </button>
          </div>
        );
      })
    );
  }

  return (
    <div className="d-flex justify-content-center">
      {drinkCategory.drinks && renderCategory()}
    </div>
  );
}
