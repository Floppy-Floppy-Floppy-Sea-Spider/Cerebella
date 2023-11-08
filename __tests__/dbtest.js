const { User, StudySession } = require('../server/Database/StudentModelv2.js');
const mongoose = require('mongoose');

describe('User Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await StudySession.deleteMany({});
  });

  it('should find a user by username and password in login', async () => {
    const user = new User({
      firstName: 'Jake',
      lastName: 'Johnson',
      username: 'cerebella',
      email: 'jakejohnson@cerebella.com',
      password: 'testpassword',
      gradeLevel: 'codesmith junior',
    });
  
    await user.save();
  
    const foundUser = await User.findOne({ username: 'cerebella', password: 'testpassword' });
    // console.log('Found User:', foundUser);
  
    expect(foundUser).not.toBeNull();
  });

  it('should create a new user in signup', async () => {
    const userData = {
      firstName: 'Yvonne',
      lastName: 'Tram',
      username: 'yvonnathan',
      email: 'yvonnathan@cerebella.com',
      password: 'kaiiscute',
      gradeLevel: 'codesmith junior',
    };

    const createdUser = await User.create(userData);
    expect(createdUser).toMatchObject(userData);  
  });

  it('should create a new session in create', async () => {
    const sessionData = {
        sessionName: 'unique-session-name',
        topic: 'db tests',
        mainPoints: 'test',
        painPoints: 'test',
        notes: 'testing session creation',
    }

    const createdSession = await StudySession.create(sessionData);
    expect(createdSession).toMatchObject(sessionData);
  });

  it('should throw an error if a required field is missing', async () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      // Omitting 'username' or any other required fields
    });

    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.username).toBeDefined();
    }
  });

  it('should throw an error if a required field is missing', async () => {
    const session = new StudySession({
      userId: 'user-id',
      // Omitting 'sessionName' or any other required fields
    });

    try {
      await session.validate();
    } catch (error) {
      expect(error.errors.sessionName).toBeDefined();
    }
  });

  it('should throw an error if a unique field has a duplicate value', async () => {
    const session1 = new StudySession({
      sessionName: 'session1',
      topic: 'Math',
      mainPoints: 'Key concepts',
      painPoints: 'Challenging areas',
      notes: 'Study notes',
    });

    const session2 = new StudySession({
      sessionName: 'session1', // Same sessionName as session1
      topic: 'Science',
      mainPoints: 'Key concepts',
      painPoints: 'Challenging areas',
      notes: 'Study notes',
    });

    await session1.save();

    try {
      await session2.validate();
    } catch (error) {
      expect(error.code).toBe(11000);
    }
  });
});

