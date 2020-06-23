import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
