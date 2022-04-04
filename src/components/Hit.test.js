import { render, screen } from '@testing-library/react';
import Hit from './Hit';

test('render hit result component', () => {
  render(<Hit />);
  const linkElement = screen.queryByTestId('restaurant-name');
  expect(linkElement).toBeInTheDocument;
});
