const bcrypt = require('bcryptjs');

async function generate(input) {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash('test', salt)
    console.log(password);
}


let array = process.argv

if (array.length !== 3) {
    console.log("This script take excatly one parameter, the password to hash");

}
else
    generate(array[2])
