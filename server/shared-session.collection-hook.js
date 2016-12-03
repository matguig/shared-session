import { sharedSessionCollection } from "meteor/matguig:shared-session/common/shared-session.js";
import { sharedSession } from "meteor/matguig:shared-session/server/shared-session.js";

/**
 * Set updatedAt value at the current date
 * @param { string } userId
 * @param { object } doc
 */
sharedSessionCollection.before.insert(function (userId, doc) {
    var session = sharedSession.instance();

    doc.session_uid = session._uid;
    doc.createdAt = doc.createdAt || new Date();
    doc.updatedAt = doc.updatedAt || null;
});

/**
 * Set updatedAt value at the current date
 * @param { string } userId
 * @param { object } doc
 * @param { array } fieldNames (list of impatected field)
 * @param { object } modifier
 */
sharedSessionCollection.before.update(function (userId, doc, fieldNames, modifier) {
    modifier.$set.updatedAt = new Date();
});
