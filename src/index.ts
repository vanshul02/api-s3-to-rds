import * as express from 'express';
import controller from './controller/user';

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.post('/users/addBatch', controller.addUsers);
app.use('/health', (req, res) => {
  return res.status(200).json('ok');
});

app.use('/', (req, res) => {
  return res.status(404).json('NOT FOUND');
});

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
