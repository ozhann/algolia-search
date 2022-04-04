import algoliasearch from 'algoliasearch';
import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  RefinementList,
  Stats,
  RatingMenu,
  ClearRefinements,
} from 'react-instantsearch-dom';
import Hit from './components/Hit';
import RestaurantForm from './components/RestaurantForm';
import './App.css';

const App = () => {
  const indexName = 'instant_restaurant';
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ADMIN_API_KEY
  );

  return (
    <div className='ais-InstantSearch'>
      <h1>React InstantSearch</h1>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <div className='left-panel'>
          <ClearRefinements />
          <h2 className=''>Cuisine</h2>
          <RefinementList attribute='food_type' showMore searchable />
          <h2>Price Range</h2>
          <RefinementList attribute='price_range' />
          <h2>Rating</h2>
          <RatingMenu attribute='rounded_stars_count' min={2} max={5} />
        </div>
        <div className='right-panel'>
          <div>
            <SearchBox
              translations={{ placeholder: 'Search for restaurants' }}
            />
          </div>
          <RestaurantForm />
          <Stats />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

export default App;
