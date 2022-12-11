import mongoose from 'mongoose';
import Dotenv from "dotenv";

Dotenv.config();

const { MONGO_PASSWORD, MONGO_CLUSTER, MONGO_USER, MONGO_DBNAME } = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`

mongoose.set("strictQuery",false);
const db = mongoose.connect(uri);


export default db;