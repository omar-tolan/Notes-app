const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try{
        const notesBuffered = fs.readFileSync('notes.json')
        const notesJSON = notesBuffered.toString()
        return JSON.parse(notesJSON)
    }catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold("Note Added!"))
    }else{
        console.log(chalk.red.bold("Note Already Exists!"))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title)
    if (notes.length > updatedNotes.length){
        console.log(chalk.green.bold('Note removed!'))
    }else{
        console.log(chalk.red.bold('Note not found!'))
    }
    saveNotes(updatedNotes)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold('Your Notes'))
    notes.forEach((note) => console.log(note.title+': '+note.body))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green.bold(note.title) + ': ' + note.body)
    }else{
        console.log(chalk.red.bold("Note not found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}