import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import App from 'components/App';

import userFactory from 'fixtures/userFactory';
import { render } from 'rtl/utils';

describe('Testing Login page submit', () => {
  const user = userFactory();
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
  });

  test('Testing the presence of fields', () => {
    screen.getByText(/login/i);
    screen.getByLabelText(/email/i);
    screen.getByRole('button', { name: /submit/i });
  });

  test('Testing Login submit', async () => {
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const onSubmitLogin = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(onSubmitLogin);
    expect(screen.getByText(/You must enter an email to continue/)).toBeInTheDocument();
    expect(screen.getByText(/You must enter a password to continue/)).toBeInTheDocument();

    fireEvent.change(emailField, { target: { value: user.email } });
    fireEvent.change(passwordField, { target: { value: user.password } });
    fireEvent.click(onSubmitLogin);
    screen.getByRole('status');

    expect(await screen.findByLabelText(/greeting/i)).toHaveTextContent(
      `Welcome to React Redux Base ${user.email}`
    );
  });

  test('Accessibility using Axe', async () => {
    const result = await axe(wrapper.container.outerHTML);
    expect(result).toHaveNoViolations();
  });
});
