const app = require("./app");
const MongoDB = require("./app/utils/mongodb.util");
const config = require("./app/config");


async function startServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("connected to the database!");
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error){
        console.log("Cannot connect to the database!", error);
        process.exit(1);
    }
};
startServer();