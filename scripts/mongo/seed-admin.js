const bcrypt = require('bcrypt');
const MongoLib = require('../../lib/mongo');
const config = require('../../config');

const buildAdminUser = password => {
    return {
        password,
        username: config.authAdminUsername,
        email: config.authAdminEmail
    };
}

const hasAdminUser = async mongoDB => {
    const adminUser = await mongoDB.getAll('users', {
        username: config.authAdminUsername
    })

    return adminUser && adminUser.length;
}

const createAdminUser = async mongoDB => {
    const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
    const userId = await mongoDB.create("users", buildAdminUser(hashedPassword));
    return userId;
}

const seedAdmin = async () => {
    try {
        const mongoDB = new MongoLib();

        if(await hasAdminUser(mongoDB)) {
            console.log('Admin User ya existe capo!')
            return process.exit(1);
        }

        const adminUserId = await createAdminUser(mongoDB);
        console.log('Usuario de admin creado! Tiene este id: ' + adminUserId.insertedId);
        return process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1)
    }
}

seedAdmin();