export default function Note({ note, index, onDelete, ip, hasAccess }) {
  return (
    <li className='list-group-item bg-dark text-white mb-1'>
      <div className='d-flex justify-content-between align-items-center'>
        <span>{note.text}</span>
        <div className='d-flex'>
          {ip === hasAccess ? (
            <button
              onClick={(e, index) => onDelete(note.id)}
              className='btn btn-danger btn-outline-danger btn-note'
            >
              &times;
            </button>
          ) : null}
        </div>
      </div>
    </li>
  )
}
