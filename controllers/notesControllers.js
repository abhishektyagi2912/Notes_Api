const noteModel = require("../model/notes");

// Create a new note
const createNote = async (req, res) => {
    const note = new noteModel({
        title: req.body.title,
        description: req.body.description,
        userId: req.userId,
    });
    try {
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Update a note
const updateNote = async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId,
    };
    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });//new:true is used to get updated data
        res.status(200).json({ message: "Note updated", newNote });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        await noteModel.findByIdAndDelete(id);
        res.status(202).json({ message: "Note deleted" }); //202 means req accepted

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all notes of a user
const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        // res.status(200).json(notes);
        res.render('todo', { notes });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getnotesid = async (req, res) => {
        try {
            const note = await noteModel.find({_id:req.params.id});
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
};

module.exports = { createNote, updateNote, deleteNote, getNotes, getnotesid };