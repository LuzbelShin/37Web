const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) =>{
    res.render('notes/new-note.hbs')
});

router.post('/notes/new-note', isAuthenticated, async (req, res) =>{
    const {tittle, description} = req.body;
    const errors = [];
    if(!tittle){
        errors.push({text: 'Please add a tittle.'});
    }
    if(!description){
        errors.push({text: 'Please add a description.'});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors, tittle, description
        });
    }else{
        const newNote = new Note({tittle, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note added.')
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', {notes});
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) =>{
    
    const note = await Note.findById(req.params.id);

    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) =>{
    const {tittle, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {tittle, description});
    req.flash('success_msg', 'Note updated.');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) =>{
    
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted.');
    res.redirect('/notes');
});

module.exports = router;