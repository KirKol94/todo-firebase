import React from 'react'
import Note from '../../components/Note'
import Loader from '../../components/Loader'

export default ({ notes, searchValue, onDelete, isLoading }) => {
  return (
    <main className=' '>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className='list-group mt-2'>
          {searchValue.trim('')
            ? notes
                .filter(note =>
                  note.text.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map(note => (
                  <Note key={note.id} note={note} onDelete={onDelete} />
                ))
            : notes.map(note => (
                <Note key={note.id} note={note} onDelete={onDelete} />
              ))}
        </ul>
      )}
    </main>
  )
}
