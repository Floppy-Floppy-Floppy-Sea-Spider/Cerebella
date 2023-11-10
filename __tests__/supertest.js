const request = require('supertest');
const app = require('../server/server');
let createdEventId = null; // Store the ID of the created event to delete it later

beforeAll(async () => {
  // Add any necessary setup logic here before running the tests
  // This might include resetting the state, adding new test data, or any other necessary setup
});

afterAll(async () => {
  // Perform cleanup after running all tests
  if (createdEventId) {
    // Code to delete the created event, as an example
    await request(app).delete(`/calendar/${createdEventId}`);
  }
  // Additional cleanup steps can be added here if necessary
});

describe('Calendar API Endpoints', () => {
  it('GET /calendar/:day should return an event for a specific day if it exists', async () => {
    const specificDay = 1;
    const response = await request(app).get(`/calendar/${specificDay}`);
    expect(response.status).toBe(200);
    // Add assertions for the expected structure of the event returned by your API
  });

  it('GET /calendar/:day should return 404 if event for a specific day does not exist', async () => {
    const nonExistentDay = 59;
    const response = await request(app).get(`/calendar/${nonExistentDay}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Event not found');
  });

  it('POST /calendar should create a new event', async () => {
    const newEvent = {
      content: 'Test content',
      day: 102,
    };
    const response = await request(app).post('/calendar').send(newEvent);
    expect(response.status).toBe(201);
    createdEventId = response.body.id; // Store the ID of the created event for cleanup
    // Add assertions for the expected structure of the created event
  });

  it('POST /calendar should return 400 if event for the day already exists', async () => {
    const existingEvent = {
      content: 'Existing content',
      day: 1,
    };
    const response = await request(app).post('/calendar').send(existingEvent);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Event for this day already exists'
    );
    // Add assertions for the expected error response when trying to create an existing event
  });
});

describe('Chatroom API Endpoints', () => {
  it('GET /chatroom should return all messages', async () => {
    const response = await request(app).get('/chatroom');
    expect(response.status).toBe(200);
    // Add assertions for the expected structure of the messages returned by your API
  });

  it('POST /chatroom should create a new message', async () => {
    const newMessage = {
      name: 'John Doe',
      content: 'Test message',
    };
    const response = await request(app).post('/chatroom').send(newMessage);
    expect(response.status).toBe(201);
    // Add assertions for the expected structure of the created message
  });

  it('PUT /chatroom/:id should edit a message', async () => {
    const messageId = '654d799378b929f0c083b28c'; // Replace with an existing message ID
    const updatedContent = 'Updated message content';
    const response = await request(app)
      .put(`/chatroom/${messageId}`)
      .send({ content: updatedContent });
    expect(response.status).toBe(200);
    // Add assertions for the expected structure of the updated message
  });

  it('DELETE /chatroom/:id should delete a message', async () => {
    const messageId = '654c5914864c277839a5c5e6'; // Replace with an existing message ID
    const response = await request(app).delete(`/chatroom/${messageId}`);
    expect(response.status).toBe(200);
    // Add assertions for the expected result after deleting the message
  });
});
