import {Request, Response} from 'express';
import {DataRequest, ResponseResult} from '../interfaces/data';
import {con as ctx} from '../database/dbseed';

const addUsers = async (req: Request, res: Response) => {
  const users: Array<DataRequest> = req.body;
  const params: Array<Object> = [];
  users.map(user => params.push(Object.values(user)));
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
          (err, result: ResponseResult, fields) => {
            if (err) {
              console.log('addUsers ERR', err);
              res.status(409).json(err.message);
            }
            if (fields) console.log('addUsers FIELDS', fields);
            if (result) {
              console.log('addUsers RESULT', result);
              if (result.affectedRows === users.length)
                res.status(201).json(users);
            }
          }
        );
        ctx.end();
      }
    );
  });
};

export default {addUsers};
