import { render, screen } from '@testing-library/react';
import RestaurantForm from './RestaurantForm';

test('render Restaurant Form  component', () => {
  render(<RestaurantForm />);
  const linkElement = screen.queryByTestId('restaurant-form');
  expect(linkElement).toBeInTheDocument;
});
