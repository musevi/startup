const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const goalCollection = client.db('startup').collection('goals');
const penaltyCollenction = client.db('startup').collection('penalties');

function getUser(email) {
  return userCollection.findOne({ email: email });
}
  
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}
  
async function createUser(email, password, goals) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    email: email,
    password: passwordHash,
    goals: goals,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  
  return user;
}

async function getGoals(user) {
  const userGoals = await goalCollection.find({ user: user });
  return(userGoals.toArray());
}

async function getPenalties(user) {
  const userPenalties = await penaltyCollenction.find({ user: user });
  return(userPenalties.toArray());
}

async function createPenalty(user, buddy, penalty) {
  const newPenalty = {
    user: user,
    buddy: buddy,
    penalty: penalty,
  };
  await penaltyCollenction.insertOne(newPenalty);

  return newPenalty;
}

async function createGoal(user, newgoal, date, buddy, penalty) {
  const newGoal = {
    user: user,
    goal: newgoal,
    date: date,
    buddy: buddy,
    penalty: penalty,
  };
  await goalCollection.insertOne(newGoal);

  return newGoal;
}

async function deleteGoal(user, goal) {
  const goalToDelete = await goalCollection.findOneAndDelete({ user: user, goal: goal })
  return;
}

async function deletePenalty(user, buddy, penalty) {
  const penaltyToDelete = await penaltyCollenction.findOneAndDelete({ user: user, buddy: buddy, penalty: penalty })
  return;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getGoals,
  createGoal,
  deleteGoal,
  createPenalty,
  getPenalties,
  deletePenalty,
};