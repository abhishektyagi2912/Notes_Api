const express = require('express');
const { getNotes, createNote, deleteNote, updateNote, getnotesid } = require('../controllers/notesControllers');
const auth = require('../middleware/authmid');
const router = express.Router();


// why we use auth? ==> because this function is used to check the user is valid or not and call if user is valid
router.get('/', auth, getNotes);
router.get('/:id', auth, getnotesid);
router.post('/', auth, createNote);

//for dlt note we have to pass id of the note
router.delete('/:id', auth, deleteNote);

router.put('/:id', auth, updateNote);

module.exports = router;
