import { render, screen } from '@testing-library/react';
import { SignIn } from './SignIn';
import { HashRouter } from 'react-router-dom';

describe('sign in', () => {
  test('input form exists', () => {
    render(
      <HashRouter>
        <SignIn />
      </HashRouter>,
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole(/button/i)).toBeInTheDocument();
  });
});
