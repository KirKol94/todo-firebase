import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Info from './pages/info/Info'
import Notes from './pages/notes/Notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [ip, setIp] = useState('')
  const url = 'https://mytodo-react-app-default-rtdb.firebaseio.com/'
  const hasAccess = '31.162.7.125'

  const fetchIp = () => {
    fetch('https://ipapi.co/json/')
      .then(d => d.json())
      .then(d => {
        setIp(d.ip)
        console.log(d.ip)
      })
  }
  const fetchData = async () => {
    setIsLoading(true)

    let res = await axios.get(`${url}notes.json`)
    if (res.data) {
      const dbNotes = Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
          id: key,
        }
      })

      setNotes(dbNotes)
    }
    setIsLoading(false)
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
  }
  useEffect(() => {
    fetchData()
    fetchIp()
  }, [])

  return (
    <div className='app__wrapper'>
      <BrowserRouter>
        <Header
          ip={ip}
          hasAccess={hasAccess}
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
                ip={ip}
                hasAccess={hasAccess}
                isLoading={isLoading}
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
