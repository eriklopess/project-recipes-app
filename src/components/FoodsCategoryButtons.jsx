import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { fetchFoodFilter } from '../service/fetchAPI';

export default function FoodsCategoryButtons() {
  const { category,
    setRecipe,
    togleFilter,
    setTogleFilter,
    setClicou,
  } = useContext(AppContext);

  const testId = [
    'Beef-category-filter',
    'Breakfast-category-filter',
    'Chicken-category-filter',
    'Dessert-category-filter',
    'Goat-category-filter',
  ];

  async function handleClick({ target }) {
    if (togleFilter) {
      setTogleFilter(false);
    } else {
      setTogleFilter(true);
    }

    setClicou(true);
    const data = await fetchFoodFilter(target.value);
    setRecipe(data);
  }

  function renderCategory() {
    const four = 4;
    return (
      category.meals.map((button, index) => {
        if (index > four) return null;
        return (
          <div key={ button.strCategory }>
            <button
              className="btn btn-danger"
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
      {category.meals && renderCategory()}
    </div>
  );
}
