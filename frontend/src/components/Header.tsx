import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';

const Header = () => {
  const {isLoggedIn} = useAppContext();

  return (
    <div className="bg-blue-400 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight"> {/*trackin-tight to add a logo effect */}
            <Link to="/"><span className='text-blue-800'>M</span>Booking</Link>
        </span>
        <span className="flex space-x-2">
            {isLoggedIn ? <>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-300' to="/my-bookings">My Bookings</Link>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-300' to="/my-hotels">My Hotels</Link>
              <SignOutButton />
              </> : 
              <Link to="/sign-in" className='flex bg-white items-center text-blue-800 px-3 font-bold hover:bg-blue-200 '>Sign In</Link>
            }
        </span>
      </div>
    </div>
  )
}

export default Header
