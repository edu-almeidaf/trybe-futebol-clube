const user = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user'
};

const userWithoutPassword = {
  id: 1,
  username: 'User',
  email: 'user@user.com',
};

const wrongPasswordUser = {
  id: 1,
  username: 'User',
  email: 'user@user.com',
  password: 'xxxxxxxxxx',
};

const users = [user];

const validLoginBody = { email: 'user@user.com', password: 'secret_user' };
const invalidPasswordLoginBody = { email: 'user@user.com', password: 'secre' };
const invalidEmailLoginBody = { email: 'invalid_email', password: 'secret_user' };
const userRegistered = { ...user, password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' };

export {
  user,
  userWithoutPassword,
  users,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPasswordUser,
  userRegistered,
};
