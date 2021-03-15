import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';

import App from 'components/App';
import LoginPage from 'pages/LoginPage';

import { render } from './utils';

describe('Testing examples with React testing library and other tools', () => {
  test('Testing with React router', () => {
    // We have to use MemoryRouter to indicate the history to react router
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    getByText(/login/i);
  });

  test.skip('Accessibility with Axe', async () => {
    const { container, debug } = render(<LoginPage />);
    const result = await axe(container.outerHTML);
    debug();

    expect(result).toHaveNoViolations();
  });
});
