export default function Note({ note, index, onDelete }) {
  return (
    <li className='list-group-item bg-dark text-white mb-1'>
      <div className='d-flex justify-content-between align-items-start'>
        <span>{note.text}</span>
        {localStorage.getItem('password') === 'pass' && (
          <button
            onClick={(e, index) => onDelete(note.id)}
            className='btn btn-danger btn-outline-danger'
          >
            &times;
          </button>
        )}
      </div>
    </li>
  )
}
