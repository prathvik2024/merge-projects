const todoModels = require('../models/todoModels');

module.exports = {
    insertNotesController: async (title, notes) =>{
        return await todoModels.insertNotesModel(title, notes);
    }, editNotesController: async (id, title, notes) =>{
        return await todoModels.editNotesModel(id, title, notes);
    },
    deleteNotesController: async (id) =>{
        return await todoModels.deleteNotesModel(id);
    },
    getNotesController: async () =>{
        return await todoModels.getNotesModel();
    },
}