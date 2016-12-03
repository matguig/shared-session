import { sharedSessionCollection } from "meteor/matguig:shared-session/common/shared-session.collection.js";
import { sharedSession } from "meteor/matguig:shared-session/server/shared-session.js";

/**
 * Generic method to allow or not client modification
 * @param { string } userId (meteor user id)
 * @param { object } doc
 * @return { boolean }
 */
var allowedGenericMethod = function(userId, doc) {
    var session = sharedSession.instance();

    if ( doc.session_uid && doc.session_uid !== session._uid ) {
        return false;
    }
    return true;
};

sharedSessionCollection.allow({
    insert: allowedGenericMethod,
    update: allowedGenericMethod,
    remove: allowedGenericMethod
});
