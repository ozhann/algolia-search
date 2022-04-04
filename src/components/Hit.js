import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';

const Hit = ({ hit }) => {
  const [isDeleted, setIsDeleted] = React.useState(false);
  const indexName = 'instant_restaurant';
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ADMIN_API_KEY
  );

  const index = searchClient.initIndex(indexName);

  const deleteItem = async (objectID) => {
    try {
      await index.deleteObject(objectID);
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!hit) {
    return <div>Loading...</div>;
  }

  if (hit) {
    return (
      <div>
        {isDeleted ? (
          <div>Restaurant is successfully removed!</div>
        ) : (
          <div>
            {/* <img alt={hit.name} src={`${hit.image_url}`} /> */}
            <div>
              <div data-testid='restaurant-name'>
                <Highlight attribute='name' hit={hit} />
              </div>
              <div>Price range is {hit.price_range}</div>
              <div>Cousine: {hit.food_type}</div>
              <div>Rating: {hit.stars_count}</div>
              <button
                className='rounded border border-gray-400 px-2 py-1 mt-2'
                onClick={() => deleteItem(hit.objectID)}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Hit;
