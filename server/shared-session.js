import { collectionName, sharedSessionCollection, sharedSessionCommon } from "meteor/matguig:shared-session/common/shared-session.js";

export const sharedSession = (function() {
    var _instance = {};

    class sharedSession extends sharedSessionCommon {

        /**
         * Register instance by uid
         * @param { string } uid
         */
        constructor( uid ) {
            super();
            this._uid = uid;
            _instance[ uid ] = this;
        }

        /**
         * Return search condition for mongo
         * @param { string } key
         * @return { object } search condition
         */
        _getSearch( key ) {
            var search = super._getSearch( key );
                search.session_uid = this._uid;

            return search;
        }

        /**
         * Return collection to publish
         */
        getPublishedCollection( ) {
            return sharedSessionCollection.find( this._getSearch( ) );
        }

        /**
         * Remove all current shared session
         */
        clearAll( ) {
            var secureFilter = { session_uid: this._uid };
            return sharedSessionCollection.remove( this._getSearch( ) );
        }

        /**
         * Remove an entry by key
         * @param { string } key
         */
        delete( key ) {
            return sharedSessionCollection.remove( this._getSearch( key ) );
        }
    }

    /**
     * Retreive an instance by uid or create one if it not exist
     * @param { string } uid (if uid variable is null, we will try to retrieve current the connection id by using DDP package)
     * @return { sharedSession }
     */
    sharedSession.instance = function( uid ) {
        if ( !uid ) {
            var connection = DDP._CurrentInvocation.get();
            if ( !connection ) {
                throw new Meteor.Error(500, "Error enable to retreive current connection");
            }
            uid = connection.connection.id;
        }
        if ( !_instance[ uid ] ) {
            new sharedSession( uid );
        }
        return _instance[ uid ];
    };

    return sharedSession;
})();
