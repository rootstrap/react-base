import { build, fake, sequence, oneOf } from '@jackfranklin/test-data-bot';

const userBuilder = build('User', {
  fields: {
    id: sequence(),
    username: fake(f => f.internet.userName()),
    email: fake(f => f.internet.email()),
    uid: fake(f => f.internet.email()),
    firstName: fake(f => f.name.firstName()),
    lastName: fake(f => f.name.lastName()),
    gender: oneOf('female', 'male', 'other'),
    password: fake(f => f.internet.password()),
    createdAt: fake(f => f.date.past().toUTCString()),
    updatedAt: fake(f => f.date.past().toUTCString()),
    avatar: {
      url: fake(f => f.internet.url),
      normal: {
        url: fake(f => f.internet.url)
      },
      smallThumb: {
        url: fake(f => f.internet.url)
      }
    }
  }
});

export default userBuilder;
