import React from 'react';
import algoliasearch from 'algoliasearch';

const RestaurantForm = () => {
  const [restaurant, setRestaurant] = React.useState({
    name: '',
    cuisine: '',
    price_range: '',
    rating: '',
  });
  const [showForm, setShowForm] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);
  const indexName = 'instant_restaurant';
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ADMIN_API_KEY
  );

  const index = searchClient.initIndex(indexName);
  const addRestaurant = async (restaurant) => {
    try {
      await index.saveObject(restaurant, {
        autoGenerateObjectIDIfNotExist: true,
      });
      setRestaurant({
        name: '',
        cuisine: '',
        price_range: '',
        rating: '',
      });
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-testid='restaurant-form'>
      <button
        onClick={() => setShowForm(!showForm)}
        className='px-4 py-2 border border-gray-400 bg-green-200 rounded'
      >
        Add Restaurant
      </button>
      {showForm && (
        <div>
          <div className='my-2 '>
            <label htmlFor='name'>
              Restaurant Name
              <input
                className='border border-gray-500 ml-2 rounded'
                type='text'
                id='name'
                value={restaurant.name}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, name: e.target.value })
                }
              />
            </label>
          </div>

          <div className='my-2'>
            <label htmlFor='cuisine'>
              Cuisine
              <input
                className='border border-gray-500 ml-2 rounded'
                type='text'
                id='cuisine'
                value={restaurant.cuisine}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, cuisine: e.target.value })
                }
              />
            </label>
          </div>

          <div className='my-2'>
            <label htmlFor='price_range'>Price Range</label>
            <select
              className='border border-gray-500 ml-2 pl-2 py-1 rounded'
              name='price_range'
              id='price_range'
              value={restaurant.price_range}
              onChange={(e) =>
                setRestaurant({ ...restaurant, price_range: e.target.value })
              }
            >
              <option value='$50 and over'>$50 and over</option>
              <option value='$31 to $50'>$31 to $50</option>
              <option value='$30 and under'>$30 and under</option>
            </select>
          </div>

          <div className='my-2'>
            <label htmlFor='rating'>
              Rating
              <input
                className='border border-gray-500 ml-2 pl-4 rounded'
                type='number'
                value={restaurant.rating}
                id='rating'
                min='1'
                max='5'
                onChange={(e) =>
                  setRestaurant({ ...restaurant, rating: e.target.value })
                }
              />
            </label>
          </div>
          <div className='flex'>
            <button
              className='px-2 py-1 border border-gray-400 rounded bg-blue-500 text-white'
              onClick={() => addRestaurant(restaurant)}
            >
              Submit
            </button>
            {isAdded && <div className='mt-2 pl-2'>Restaurant is added</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
