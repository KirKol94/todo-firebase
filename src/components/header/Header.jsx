import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ addNote, onSearch, onDeleteAll }) {
  const [noteValue, setNoteValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <nav className='navbar navbar-dark bg-dark fixed-top'>
      <div className='container-fluid'>
        <div className='d-flex align-items-center'>
          <ul className='navbar d-flex justify-content-between'>
            <li className='navbar-item'>
              <Link
                onClick={() => onSearch('', setSearchValue)}
                to='/'
                className='navbar-link '
              >
                Заметки
              </Link>
            </li>
            <li
              className='navbar-item text-white'
              style={{ marginLeft: '16px' }}
            >
              <Link to='/info' className='navbar-lin'>
                Инфо
              </Link>
            </li>
          </ul>
        </div>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasNavbar'
          aria-controls='offcanvasNavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className='offcanvas offcanvas-end bg-dark text-white'
          tabIndex='-1'
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
        >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
              {' '}
            </h5>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-dismiss='offcanvas'
              aria-controls='offcanvasNavbar'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
          <div className='offcanvas-body d-flex flex-column justify-content-between'>
            <div>
              <div className='d-flex mt-4 mb-2 justify-content-between align-items-center'>
                <h5 className='mb-2'>Поиск по заметкам</h5>
                <button
                  onClick={e => {
                    e.preventDefault()
                    onSearch(searchValue, setSearchValue)
                  }}
                  data-bs-dismiss='offcanvas'
                  tabIndex={2}
                  className='btn btn-outline-success'
                  type='submit'
                >
                  Найти
                </button>
              </div>
              <form>
                <input
                  value={searchValue}
                  onChange={e => {
                    setSearchValue(e.target.value)
                  }}
                  tabIndex={1}
                  className='form-control me-2'
                  type='search'
                  placeholder='Текст заметки'
                  aria-label='Search'
                />
              </form>

              {localStorage.getItem('password') === 'pass' ? (
                <>
                  <div className='d-flex mt-4 mb-2 justify-content-between align-items-center'>
                    <h5 className=''>Добавить заметку</h5>
                    <button
                      onClick={e => {
                        e.preventDefault()
                        addNote(noteValue, setNoteValue)
                      }}
                      data-bs-dismiss='offcanvas'
                      tabIndex={4}
                      className='btn btn-outline-success'
                      type='submit'
                    >
                      Добавить
                    </button>
                  </div>
                  <form>
                    <textarea
                      value={noteValue}
                      onChange={e => setNoteValue(e.target.value)}
                      tabIndex={3}
                      className='form-control'
                      placeholder='Текст заметки'
                    />
                  </form>
                </>
              ) : null}
            </div>
            {localStorage.getItem('password') === 'pass' ? (
              <button
                onClick={onDeleteAll}
                className='btn  btn-danger'
                data-bs-dismiss='offcanvas'
              >
                Удалить все
              </button>
            ) : (
              <button
                onClick={() => {
                  const pass = window.prompt('Пароль')

                  if (pass === 'Pass082694') {
                    localStorage.setItem('password', 'pass')
                  } else return
                }}
                data-bs-dismiss='offcanvas'
                className='btn btn-success'
              >
                получить права
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
