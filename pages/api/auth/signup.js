import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;
    
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'Please, check your inputs' });
      return;
    }

    let client;

    try {
      client = await connectToDatabase();
    } catch {
      res.status(422).json({ message: 'Login error' });
      return;
    }

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: 'User exists already' })  
      return;
    }

    const hashedPassword = await hashPassword(password);

    await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Successfully add a new user' })
  }
}

export default handler;
