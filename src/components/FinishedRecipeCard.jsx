import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function FinishedRecipeCard(props) {
  const { type, index, id, alcoholicOrNot, img, foodName, category,
    area, date, tagName, tagName2 } = props;
  const { copy } = useContext(AppContext);
  return (
    <div className="col-md-3 mb-2">
      <div className="card">
        <a href={ `/${type}s/${id}` }>
          <img
            className="card-img-top"
            src={ img }
            alt={ `${foodName}` }
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        <div className="card-body text-center">

          <a href={ `/${type}s/${id}` }>
            <h5
              data-testid={ `${index}-horizontal-name` }
              className="card-title"
            >
              {foodName}

            </h5>
          </a>
        </div>
        <p
          className="card-text"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {area}
          {' '}
          -
          {' '}
          {category}
          {alcoholicOrNot}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>{tagName}</p>
        <p data-testid={ `${index}-${tagName2}-horizontal-tag` }>{tagName2}</p>
        <button
          className="btn btn-danger w-50"
          type="button"
          id="share"
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          alt="compartilhar"
          onClick={ () => {
            copy((`http://localhost:3000/${type}s/${id}`)); // ref: https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
            document.getElementById('share').innerHTML = 'Link copiado!';
          } }
        />
      </div>
    </div>
  );
}

FinishedRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  tagName2: PropTypes.string.isRequired,
};

export default FinishedRecipeCard;
