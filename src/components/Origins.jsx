import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import {
  fetchListArea,
  fetchFoodArea,
} from '../service/fetchAPI';

export default function Origins() {
  const {
    isFiltering,
    setIsFiltering,
    filteredMeals,
    setFilteredMeals,
  } = useContext(AppContext);

  const [options, setOptions] = useState([]);
  const [meals, setMeals] = useState([]);
  const MAX_CARDS = 12;

  useEffect(() => {
    const data = async () => {
      const optionsWithoutFilter = await fetchListArea();
      const optionsList = [...optionsWithoutFilter.meals];
      optionsList.splice(0, 0, { strArea: 'All' });
      setOptions(optionsList);
      const recipes = await fetchFoodArea('Canadian');
      setMeals(recipes.meals);
    };
    data();
  }, []);

  async function handleChange({ target }) {
    if (target.value === 'All') {
      setIsFiltering(false);
    } else {
      const filteredByArea = await fetchFoodArea(target.value);
      setFilteredMeals(filteredByArea.meals);
      setIsFiltering(true);
    }
  }

  function defaultMeals() {
    const foodList = isFiltering ? filteredMeals : meals;
    return (
      foodList.map((meal, index) => (
        index < MAX_CARDS && (
          <Link
            to={ `/comidas/${meal.idMeal}` }
            key={ meal.idMeal }
          >

            <div
              key={ meal.idMeal }
              className="col-md-3 mx-auto mt-1"
            >
              <div
                data-testid={ `${index}-recipe-card` }
                style={ { width: '18rem' } }
                className="card m-2 mx-auto"
              >
                <div className="card-body text-center">
                  <h5
                    data-testid={ `${index}-card-name` }
                    className="card-title"
                  >
                    {meal.strMeal }
                  </h5>
                </div>
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-top"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
              </div>

            </div>
          </Link>
        )
      ))
    );
  }

  function renderOptions() {
    return options.map(({ strArea }) => (
      <option
        key={ strArea }
        data-testid={ `${strArea}-option` }
        value={ strArea }
      >
        {strArea}
      </option>
    ));
  }

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
        className="form-control mx-auto mt-1 w-75"
      >

        {renderOptions()}
      </select>
      { defaultMeals()}
    </div>
  );
}
