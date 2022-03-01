import React from 'react'
import Note from '../../components/Note'

export default ({ notes, searchValue, onDelete }) => (
  <main className=' '>
    <ul className='list-group mt-2'>
      {searchValue.trim('')
        ? notes
            .filter(note =>
              note.text.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map(note => <Note key={note.id} note={note} onDelete={onDelete} />)
        : notes.map(note => (
            <Note key={note.id} note={note} onDelete={onDelete} />
          ))}
    </ul>
  </main>
)
