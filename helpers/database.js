const fs = require('fs');
const path = require('path')


// db in JSON file for simplicity, store in a db for production applications
let db = require('../data/database.json');

const dbRepo = {
    getAll: () => db,
    getById: id => db.find(x => x.id.toString() === id.toString()),
    find: x => db.find(x),
    create,
    update,
    delete: _delete
};

function create(entry) {
    // set date created and updated
    entry.dateCreated = new Date().toISOString();
    entry.dateUpdated = new Date().toISOString();

    // add and save entry
    db.push(entry);
    saveData();
}

function update(id, params) {
    const entry = db.find(x => x.id.toString() === id.toString());

    // set date updated
    entry.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(entry, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted entry and save
    db = db.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync(path.join(__dirname, '../', 'data/database.json'), JSON.stringify(db, null, 4));
}

exports.dbRepo = dbRepo;