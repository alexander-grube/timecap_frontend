import '../App.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='center'>
      <h1>Error - Page Not Found</h1>
      <Link to='/'>Go Home</Link>
    </div>
  )
}

export default Error