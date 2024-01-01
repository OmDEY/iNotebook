import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote} = context;
    let history = useNavigate();
    const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
            console.log("Areeee")
        }else{
            console.log("Hello")
            history("/login");
        }
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Succesfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" onChange={onChange} />
                            </div>
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" id="edescription" value={note.edescription} name="edescription" className="form-control" aria-describedby="passwordHelpBlock" onChange={onChange} />
                            <label htmlFor="tag" className="form-label">Tags</label>
                            <input type="text" id="etag" name="etag" value={note.etag} className="form-control" aria-describedby="passwordHelpBlock" onChange={onChange} />
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Your Notes</h2>
                {notes.length === 0 && 'No notes to display'}
                {notes.map(
                    (note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert}/>
                    }
                )}
            </div>
        </>
    )
}
