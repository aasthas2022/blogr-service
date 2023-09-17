const express = require('express');
const router = express.Router();
const blogsRouter = require('./routes/blogs');
const livecheck = require('./routes/livecheck')
const usersRouter = require('./routes/users');

router.use('/livecheck', livecheck);
router.use('/api/blogs', blogsRouter);
router.use('/api/users', usersRouter);

module.exports = router;
