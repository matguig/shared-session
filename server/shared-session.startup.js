import { sharedSessionCollection } from "meteor/matguig:shared-session/common/shared-session.js";

// Clear entire collection
Meteor.startup(function() {
    sharedSessionCollection.remove({});
});
