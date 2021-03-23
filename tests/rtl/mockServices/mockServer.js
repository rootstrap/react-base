import { rest } from 'msw';
import { setupServer } from 'msw/node';

import userMockServices from 'rtl/mockServices/userMockServices';

const handlers = [...userMockServices];

const server = setupServer(...handlers);

export { server, rest };
