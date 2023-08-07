import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://probro12356:Y8Lj833f1IBKNEJd@cluster0.yi0yd92.mongodb.net/auth-next?retryWrites=true&w=majority');

  return client;
};
