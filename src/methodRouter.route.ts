const router = require('express').Router();
const { route } = require('./index');

const {
    PostData,
    GetData,
    DeleteData,
    PatchData
} = require('./methodRouter.controller');

//router use for route when the method calls
router.post('/user', PostData); //for new data add
router.get('/user', GetData); //for get data
router.delete('/user', DeleteData); //for delete data
router.patch('/user', PatchData); //for update data

module.exports = router;
