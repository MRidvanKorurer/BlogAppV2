const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/auth');
const app = require('../app');

// Jest'in global setup ve teardown işlemlerini yapmasını sağlıyoruz
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('text/html');
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by the given id', async () => {
      const user = new User({ name: 'Test User', email: 'test@example.com', password: '123456' });
      await user.save();

      const res = await request(app).get(`/users/${user._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.headers['content-type']).toContain('text/html');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by the given id', async () => {
      const user = new User({ name: 'Test User', email: 'test@example.com', password: '123456' });
      await user.save();

      const res = await request(app).delete(`/users/${user._id}`);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user by the given id', async () => {
      const user = new User({ name: 'Test User', email: 'test@example.com', password: '123456' });
      await user.save();

      const res = await request(app)
        .put(`/users/${user._id}`)
        .send({ name: 'Updated Test User' });

      expect(res.statusCode).toEqual(200);
    });
  });
});
