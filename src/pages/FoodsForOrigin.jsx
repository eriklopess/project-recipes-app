import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Origins from '../components/Origins';

function FoodsForOrigin({ history }) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Origins />
      </div>
      <div>
        <Footer history={ history } />
      </div>
    </>
  );
}

FoodsForOrigin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FoodsForOrigin;
