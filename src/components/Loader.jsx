export default function Loader() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div
        className='spinner-border'
        style={{ width: '16rem', height: '16rem' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
