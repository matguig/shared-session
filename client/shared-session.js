import { collectionName, sharedSessionCollection, sharedSessionCommon } from "meteor/matguig:shared-session/common/shared-session.js";

class sharedSessionClient extends sharedSessionCommon {

    /**
     * Subscribe client to matguig:shared-session mongoDb Collection
     * And set auto run in case of server deconection
     */
    constructor( ) {
        super();
        Meteor.subscribe( collectionName );
        Meteor.autorun( this._watchDisconect.bind(this) );
    }

    /**
     * Watch meteor connection save current collection in case of deconnection
     * And repopulate in case of reconnection
     */
    _watchDisconect( ) {
        var status = Meteor.status();

        if ( status.status === "offline" || status.status === "waiting" ) {
            this._backup = this.getAll( ).fetch();
        }
        else if ( status.status === "connected" && this._backup ) {
            for (var i = 0; i <  this._backup.length; i++) {
                var key = this._backup[i].key;
                var value = this._backup[i].value;
                var options = {};
                    options.createdAt = this._backup[i].createdAt;
                    options.updatedAt = this._backup[i].updatedAt;
                this.delete( key );
                this.set( key, value, options );
            }
            delete this._backup;
        }
    }

    /**
     * Delete an key by using mongo id
     * @param { string }
     * @return { boollean }
     */
    delete( key ) {
        var entity = this._getEntity( key );
        if ( entity ) {
            var deletion = sharedSessionCollection.remove( { _id : entity._id } );
            return deletion >= 1 ? true : false;
        }
        return false;
    }
}

export const sharedSession = new sharedSessionClient();
