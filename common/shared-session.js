import {Mongo} from "meteor/mongo";

export const collectionName = "matguig:shared-session";
export const sharedSessionCollection  = new Mongo.Collection( collectionName );

class sharedSessionCommon {

    /**
     * Return search condition for mongo
     * @param { string } key
     * @return { object } search condition
     */
    _getSearch( key ) {
        var search = {};

        if ( typeof key === "string" ) {
            search.key = key;
        }
        return search;
    }

    /**
     * Create or update an entry
     * @param { string } key
     * @param { mixed } value
     * @param { object } options
     * @return { boolean}
     */
    set( key, value, options ) {
        options = options || {};
        var original = this._getEntity( key );
        if ( original ) {
            return this._update( original._id, value );
        }
        var datas = options;
            datas.key = key;
            datas.value = value;
        sharedSessionCollection.insert( datas );
        return true;
    }

    /**
     * return value by using keu
     * @param { string } key
     * @return { mixed }
     */
    get( key ) {
        var fullEntity = this._getEntity( key );

        return fullEntity ? fullEntity.value : null;
    }

    /**
     * Return full entity by using key
     * @param { string } key
     * @return { object }
     */
    _getEntity( key ) {
        return sharedSessionCollection.findOne( this._getSearch( key ) );
    }

    /**
     * Return mongo collection of all entries
     * @return { Cursor }
     */
    getAll( ) {
        return sharedSessionCollection.find( this._getSearch( ) );
    }

    /**
     * update an entity by using entity _id
     * @param { string } entityId
     * @param { mixed } value
     * @return {boolean}
     */
    _update( entityId, value ) {
        var setValues = {};
            setValues.value = value;

        var updateCount = sharedSessionCollection.update({ _id: entityId }, { $set: setValues });
        return updateCount >= 1 ? true : false;
    }
}

export { sharedSessionCommon };
