const app = require("./server")
// set port, listen for requests
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;  //Changed port from 8080 to 3000 to match de docker config (docker-compose.yml)

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;