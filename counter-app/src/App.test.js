import { render, screen } from '@testing-library/react';
import App from './App';


import { timepass } from './DoesNotExists;

"""The above statement will throw error so, remove it"""

test('renders learn react link', () => {
  var money = 0;
  
  
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
