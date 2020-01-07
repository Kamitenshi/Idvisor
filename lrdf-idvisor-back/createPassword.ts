const bcrypt = require('bcryptjs');

async function generate() {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash('test', salt)
    console.log(password);
}

generate()


