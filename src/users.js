const express = require('express');
const router = express.Router();

router.get('/', getUsers);

//review https://www.freecodecamp.org/news/how-to-build-explicit-apis-with-openapi/
function getUsers(req, res) {
    res.send({
        name: "aName",
        lastName: "aLastName"
    });
}

module.exports = router;
