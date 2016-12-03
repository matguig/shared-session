/*
* @Author: Matthieu GUIGON
* @Date:   2016-12-03 12:23:29
* @Last Modified by:   Matthieu GUIGON
* @Last Modified time: 2016-12-03 12:23:41
*/

'use strict';

import {Mongo} from "meteor/mongo";

export const collectionName = "matguig:shared-session";
export const sharedSessionCollection  = new Mongo.Collection( collectionName );
