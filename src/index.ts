import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {addUsers, isAuthenticated} from './controller/user';
import * as dotenv from 'dotenv';

dotenv.config({path: __dirname + '/.env'});

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.post('/users/addBatch', isAuthenticated, addUsers);
app.use('/health', (req, res) => {
  return res.status(200).json('ok');
});

app.get('/jwt', (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  const data = {
    time: Date(),
    userId: 12,
  };
  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

app.use('/', (req, res) => {
  return res.status(404).json('NOT FOUND');
});

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
