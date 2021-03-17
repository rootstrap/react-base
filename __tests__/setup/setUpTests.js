import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import { server } from '../services/mockServer';

// MSW Server config
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
