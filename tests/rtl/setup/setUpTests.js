import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

import { server } from 'rtl/mockServices/mockServer';

// MSW Server config
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
  server.printHandlers();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
