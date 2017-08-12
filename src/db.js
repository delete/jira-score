const Datastore = require('nedb')
const db = new Datastore({ filename: './datafile', autoload: true });

const save = ( object, callback ) => db.insert( object, callback )
const find = ( query, callback ) => db.find( query, callback )
const findOne = ( query, callback ) => db.findOne( query, callback )
const remove = ( query, callback ) => db.remove( query, {}, callback )
const update = ( query, update, options, callback ) => db.update( query, update, options, callback )
const count = ( query, callback ) => db.count( query, callback )

module.exports = {
    crud: {
        save,
        find,
        findOne,
        remove,
        update,
        count,
        db
    }
}