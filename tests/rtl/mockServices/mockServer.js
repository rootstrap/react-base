import { rest } from 'msw';
import { setupServer } from 'msw/node';

import userMockServices from 'rtl/mockServices/userMockServices';

const serverHandlers = [...userMockServices];

const server = setupServer(...serverHandlers);

export { server, rest };
