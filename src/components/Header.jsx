import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { links } from '../links'

export default function Header({
  addNote,
  onSearch,
  onDeleteAll,
  ip,
  hasAccess,
}) {
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
                Массажист Кирилл, г. Пермь
              </Link>
            </li>
            {/* <li
              className='navbar-item text-white'
              style={{ marginLeft: '16px' }}
            >
              <Link to='/info' className='navbar-lin'>
                Инфо
              </Link>
            </li> */}
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
            <span> </span>
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
                <h5 className='mb-2'>Отфильтровать</h5>
                <button
                  onClick={e => {
                    e.preventDefault()
                    onSearch(searchValue.trim(' '), setSearchValue)
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
                    onSearch(e.target.value)
                  }}
                  tabIndex={1}
                  className='form-control me-2'
                  type='search'
                  placeholder='дата / время /день недели'
                  aria-label='Search'
                />
              </form>

              {ip === hasAccess ? (
                <>
                  <div className='d-flex mt-4 mb-2 justify-content-between align-items-center'>
                    <h5 className=''>Добавить запись</h5>
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
                      placeholder='День недели / дата / время'
                    />
                  </form>
                  <button
                    onClick={onDeleteAll}
                    className='btn  btn-danger w-100 mt-2'
                    data-bs-dismiss='offcanvas'
                  >
                    Удалить все
                  </button>
                </>
              ) : null}
            </div>

            <div>
              <h3 className='mb-2'>Для записи ⤵️ ⤵️ ⤵️</h3>
              <ul className='w-100 d-flex justify-content-around'>
                {links.map((l, i) => (
                  <a key={i} href={l.link}>
                    <img
                      style={{ filter: 'invert(1)' }}
                      src={l.img}
                      alt={l.alt}
                      width={45}
                      height={45}
                    />
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
