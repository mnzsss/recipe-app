import { connect } from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    connect(
      'mongodb+srv://learn:opensourceapps237@opensourceapps-lql4e.mongodb.net/recipeapp?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();
