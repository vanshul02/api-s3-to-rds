import * as express from 'express';
import controller from './controller/user';

const app = express();

app.use(express.json());

app.post('/users/addBatch', controller.addUsers);

app.listen(8080, () => {
  console.log('Server Running on Port: 8080');
});
