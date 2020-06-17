import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import path from 'path';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.static('public'));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, 'uploads')),
    );

    this.server.use(
      (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof Error) {
          return res
            .status(400)
            .json({ status: 'error', message: err.message });
        }

        console.log(err);

        return res
          .status(500)
          .json({ status: 'error', message: 'Internal Server Error' });
      },
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
