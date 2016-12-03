import { collectionName } from "meteor/matguig:shared-session/common/shared-session.collection.js";
import { sharedSession } from "meteor/matguig:shared-session/server/shared-session.js";

Meteor.publish( collectionName, function ( ) {
    var uid = this.connection.id;
    var mySession = sharedSession.instance( uid );

    this.connection.onClose( mySession.clearAll.bind( mySession ) );
    return mySession.getPublishedCollection( );
});
