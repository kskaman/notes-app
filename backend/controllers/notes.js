const notesRouter = require("express").Router();

const Note = require("../models/note");

// Get
notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// Get a single note using its id
notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// delete a single note using id
notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// create a new note and add it into collection
notesRouter.post("/", (request, response) => {
  const body = request.body;

  const note = new Note({
    title: body.title,
    content: body.content,
    tags: body.tags || [],
    lastEdited: Date.now(),
    isArchived: body.isArchived || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// update a note by id
notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = body.content;
      note.title = body.title;
      note.isArchived = body.isArchived;
      note.lastEdited = Date.now();
      note.tags = body.tags;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
