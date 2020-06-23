declare namespace Express {
  export interface Request {
    file: {
      key: string;
      location: string;
    };
  }
}
