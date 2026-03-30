const express = require('express')
const {getStatus , searchUser , getAllUsers , getUsersById ,createUser, updateUser , deleteUser } = require('../controllers/userController')
const router = express.Router();

router.get('/status', getStatus)

router.get('/search' , searchUser)

router.get('/' , getAllUsers)

router.get('/:id' , getUsersById)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser )


module.exports = router;