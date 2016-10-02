import {Mongo} from "meteor/mongo";

export const collectionName = "matguig:shared-session";
export const sharedSessionCollection  = new Mongo.Collection( collectionName );
