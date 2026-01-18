import { useState ,useEffect } from "react"
import Note from "../components/Note"
import '../styles/Home.css'
import api from '../api'


function Home(){
    const [notes , setNotes] = useState([])
    const [content , setContent] = useState('')
    const [title , setTitle] = useState('')

    useEffect(()=>{
        getNotes()
    },[])


    const getNotes = () =>{
        api.get('/api/notes/')
        .then((res)=> res.data)
        .then((data) => {
            setNotes(data); 
            console.log(data)
        })
        .catch((err)=>console.log(err))
    }


    const deleteNote = (id)=>{
        api.delete(`/api/notes/delete/${id}/`)
        .then((res)=>{
            if(res.status === 204) alert('Note deleted')
            else alert('failed to delete')
            getNotes()
        })
        .catch((err)=> console.log(err))

        
    }

    const createNotes =(e)=>{
        e.preventDefault()

        api.post('/api/notes/' , {content , title})
        .then((res)=>{
            if (res.status=== 201) {alert('Note Created')}
            else alert('Failed to make note')
            getNotes()
        })
        .catch((err)=> console.log(err))

        
    }


    return(
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note)=> <Note note={note} onDelete={()=>deleteNote(note.id)} key={note.id}/>)}

            </div>
            <h2>Create a notes</h2>
            <form onSubmit={createNotes}>
                <label htmlFor="title">Title:</label>
                
                <input
                    type="text"
                    id='title'
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                /><br/>
                <label htmlFor="content">Content:</label>
                
                <textarea
                    type="text"
                    id='content'
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                /><br/>
                <input type="submit" value='submit'></input>
            </form>
        </div>
    )
}
export default Home