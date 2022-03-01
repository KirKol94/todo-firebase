import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Info from './pages/info/Info'
import Notes from './pages/notes/Notes'
import { useLocalStorage } from './useLocalStorage'

export default function App() {
  const [notes, setNotes] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const url = 'https://mytodo-react-app-default-rtdb.firebaseio.com/'

  const fetchData = async () => {
    let res = await axios.get(`${url}notes.json`)

    if (res.data) {
      const dbNotes = Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
          id: key,
        }
      })
      setNotes(dbNotes.reverse())
    }
  }
  const addNote = async (text, setText) => {
    if (text.trim('')) {
      const note = { text }
      await axios.post(`${url}notes.json`, note)

      setText('')
    }
    fetchData()
  }
  const onDelete = async id => {
    if (window.confirm('Удалить эту заметку?')) {
      await axios.delete(`${url}notes/${id}.json`)
      if (notes.length === 1) onDeleteAll()

      fetchData()
    }
  }
  const onDeleteAll = async () => {
    if (window.confirm('Удалить все заметки?')) setNotes([])
    await axios.delete(`${url}/notes.json`)
    fetchData()
  }
  const onSearch = (text, setText) => {
    setSearchValue(text)
    setText('')
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='app__wrapper'>
      <BrowserRouter>
        <Header
          addNote={addNote}
          onSearch={onSearch}
          onDeleteAll={onDeleteAll}
        />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Notes
                notes={notes}
                searchValue={searchValue}
                onDelete={onDelete}
              />
            }
          />
          <Route path='/info' element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
