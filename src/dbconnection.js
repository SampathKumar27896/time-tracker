const mongoose = require('mongoose');
const {dbConnectionURL} = require('./config');
async function main() {
    await mongoose.connect(dbConnectionURL, { autoIndex: false });
}
main().catch(err => console.log(err));
