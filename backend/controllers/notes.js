const notesRouter = require("express").Router();
const Note = require("../models/note");
const authMiddleware = require("../utils/auth");

// Get
notesRouter.get("/", authMiddleware, async (request, response, next) => {
  try {
    const notes = await Note.find({ user: request.user.id }).populate("user", {
      email: 1,
    });
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

// Get a single note using its id
notesRouter.get("/:id", authMiddleware, async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note && note.user.toString() === request.user.id) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// create a new note and add it into collection
notesRouter.post("/", authMiddleware, async (request, response, next) => {
  try {
    const body = request.body;
    const note = new Note({
      title: body.title,
      content: body.content,
      tags: body.tags || [],
      isArchived: body.isArchived || false,
      user: request.user.id, // from auth middleware
    });
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

// update a note by id
notesRouter.put("/:id", authMiddleware, async (request, response, next) => {
  try {
    const body = request.body;
    const note = await Note.findById(request.params.id);
    if (!note || note.user.toString() !== request.user.id) {
      return response.status(404).end();
    }
    note.title = body.title;
    note.content = body.content;
    note.tags = body.tags;
    note.isArchived = body.isArchived;
    note.lastEdited = Date.now();
    const updatedNote = await note.save();
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

// delete a single note using id
notesRouter.delete("/:id", authMiddleware, async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (!note || note.user.toString() !== request.user.id) {
      return response.status(404).end();
    }
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
