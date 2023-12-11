import { render, screen } from '@testing-library/react';
import App from './App';

describe('sign in', () => {
  test('input form exists', () => {
      render(<SignIn />);
      const elem = screen.getByText(/input form/i);
      expect(elem).toBeInTheDocument();
  });
  test('label exists', () => {
      render(<SignIn />);
      const elem = screen.getByText(/label/i);
      expect(elem).toBeInTheDocument();
  });
  test('input form exists', () => {
      render(<SignIn />);
      const elem = screen.getByText(/button/i);
      expect(elem).toBeInTheDocument();
  });
});
