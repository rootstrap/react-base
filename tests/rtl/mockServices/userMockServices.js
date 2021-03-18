import { rest } from 'msw';
import faker from 'faker';

import userFactory from 'fixtures/userFactory';

const mockLoginRequest = rest.post(/\/users\/sign_in/i, async (req, res, ctx) => {
  console.info('Pass API');
  const user = userFactory({ overrides: { ...req.body.user } });
  return res(
    ctx.set({
      'access-token': faker.random.uuid(),
      uid: faker.random.uuid(),
      client: faker.random.uuid()
    }),
    ctx.json({
      data: user,
      status: 200
    })
  );
});

export default [mockLoginRequest];
