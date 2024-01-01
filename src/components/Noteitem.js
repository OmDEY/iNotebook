import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props
  return (
    <div>
      <div className="card my-3 md-3" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            <i className="fa-solid fa-trash mx-2" onClick={() =>
              {deleteNote(note._id); props.showAlert("Deleted Succesfully", "success")}
            }></i>
            <i className="fa-regular fa-pen-to-square" onClick={() => {updateNote(note)}}></i>
          </div>
      </div>
    </div>
  )
}
