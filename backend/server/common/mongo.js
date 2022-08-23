import mongoose from "mongoose";
import env from '../config/env';

export default async () => {
  try{
    const connection = await mongoose.connect(env.DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }catch(err){
    console.log(err);
    return err;
  }

  return connection.connection.db;
};