import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note Added Succesfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container">
                <h2>Add a Note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" placeholder="name@example.com" onChange={onChange}/>
                    <div id="passwordHelpBlock" className="form-text">
                        We will not share your email and password with anyone
                    </div>
                </div>
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" id="description" name="description" value={note.description} className="form-control" aria-describedby="passwordHelpBlock" onChange={onChange}/>
                <label htmlFor="tag" className="form-label">Tags</label>
                <input type="text" id="tag" name="tag" className="form-control" value={note.tag} aria-describedby="passwordHelpBlock" onChange={onChange}/>
                <button type='submit' className='btn btn-primary my-3'onClick={handleClick}>Add Note</button>
            </div>
        </div>
    )
}
