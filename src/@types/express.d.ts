// eslint-disable-next-line prettier/prettier
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
