import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/address', (req: Request, res: Response) => {
  const address = req.body;
  // Here you can handle the address data, e.g., save it to a database
  res.status(201).send({ message: 'Address received', address });
  console.log('Received address:', address);
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
