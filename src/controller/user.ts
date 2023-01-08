import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {DataRequest, ResponseResult} from '../interfaces/data';
import {con as ctx} from '../database/dbseed';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  try {
    const token = req.header(tokenHeaderKey) as string;
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      console.log('Successfully Verified');
      return next();
    } else {
      return res.status(401).send('NOT AUTHORIZED');
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

export const addUsers = async (req: Request, res: Response) => {
  const users: Array<DataRequest> = req.body;
  const params: Array<Object> = [];
  users.map(user => {
    const [day, month, year] = user.dob.split('/');
    const newDate = year + '-' + month + '-' + day;
    user.dob = newDate;
    params.push(Object.values(user));
  });
  ctx.connect(err => {
    if (err) console.log('addUsers ERR: ', err);
    ctx.query(
      'CREATE TABLE IF NOT EXISTS users(id int NOT NULL PRIMARY KEY, name varchar(30), surname varchar(30), dob DATE, gender varchar(15));',
      (error, result, fields) => {
        if (error) console.log('addUsers createTable ERROR: ', error);
        if (fields) console.log('addUsers createTable FIELDS: ', fields);
        console.log('addUsers createTable result: ', result);
        ctx.query(
          'INSERT INTO users (id, name, surname, dob, gender) VALUES ?',
          [params],
          (err, result: ResponseResult) => {
            if (err) {
              console.log('addUsers ERR', err);
              return res.status(409).json(err.message);
            } else if (result) {
              console.log('addUsers RESULT', result);
              if (result.affectedRows === users.length)
                return res.status(201).json(users);
              else return res.status(207).json('Partially Users Added');
            } else {
              return res.status(500).json('Internal Server Error');
            }
          }
        );
      }
    );
  });
};
