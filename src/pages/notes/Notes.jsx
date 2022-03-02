import React from 'react'
import Loader from '../../components/Loader'
import Note from '../../components/Note'

export default ({ notes, searchValue, onDelete, isLoading, ip, hasAccess }) => {
  return (
    <main className=' '>
      {!isLoading && (
        <div className='container'>
          <h1>Свободные места для записи на ближайшую неделю</h1>
        </div>
      )}
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
                  <Note
                    key={note.id}
                    ip={ip}
                    hasAccess={hasAccess}
                    note={note}
                    onDelete={onDelete}
                  />
                ))
            : notes.map(note => (
                <Note
                  key={note.id}
                  ip={ip}
                  hasAccess={hasAccess}
                  note={note}
                  onDelete={onDelete}
                />
              ))}
        </ul>
      )}
    </main>
  )
}
