const request = require('supertest');
const app = require('../index');  // Import your app here
const mongoose = require('mongoose');
const userModel = require('../models/userModels');

// Mock the userModel
jest.mock('../models/userModels');

let server;

beforeAll((done) => {
  server = app.listen(5500, () => {
    console.log('Test server running on port 5500');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    mongoose.connection.close(done);  // Ensure MongoDB connection is closed
  });
});

describe('User API Tests', () => {
  // Test for creating a new user
  it('POST /api/user/create | Should create a new user', async () => {
    // Mock implementation of userModel.findOne
    userModel.findOne = jest.fn().mockResolvedValue(null);
    // Mock implementation of userModel.save
    userModel.prototype.save = jest.fn().mockResolvedValue({});

    const response = await request(app)
      .post('/api/user/create')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual('User created successfully');
  });

  // Test for logging in a user
  it('POST /api/user/login | Should log in a user', async () => {
    // Mock implementation of userModel.findOne
    userModel.findOne = jest.fn().mockResolvedValue({
      _id: '123',
      email: 'jane.doe@example.com',
      password: 'hashedpassword',  // Simulate a hashed password
    });
    // Mock implementation of bcrypt.compare
    const bcrypt = require('bcrypt');
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    // Mock implementation of jwt.sign
    const jwt = require('jsonwebtoken');
    jwt.sign = jest.fn().mockReturnValue('fake-token');

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userData');
    expect(response.body.userData.email).toBe('jane.doe@example.com');
  });
});
