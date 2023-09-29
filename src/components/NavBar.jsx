// Imports
import Link from "next/link";
import useButtonHooks from '../hooks/useButtonHook';

export default function NavBar({ readOnly }) {
  
  // Handlers for clicking buttons
  const createHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    localStorage.setItem('create', 'true')
  }
  
  const readHandler = (e) => {
    e.preventDefault()
    localStorage.clear();
    localStorage.setItem('read', 'true')
  }
  
  const updateHandler = (e) => {
    e.preventDefault()
    localStorage.clear();
    localStorage.setItem('update', 'true')
  }
  
  const deleteHandler = (e) => {
    e.preventDefault()
    localStorage.clear();
    localStorage.setItem('delete', 'true')
  }
  
  const searchHandler = (e) => {
    e.preventDefault()
    localStorage.clear();
    localStorage.setItem('search', 'true');
  }

  const readPatientHandler = (e) => {
    e.preventDefault()
    localStorage.clear();
    localStorage.setItem('readPatient', 'true');
  }
  
  // Uses customhook to highlight selected page
  const { createActive, readActive, updateActive, deleteActive, searchActive, readPatientActive } = useButtonHooks();

  // Template
  return (
    <>
      {/* Page buttons; each button uses a ternary operation to display different CSS to signify when selected*/} 
      {readOnly ?
        <ul className='flex justify-center items-start gap-10 mt-5'>
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/'>
            HOME
            </Link>
          </li>
          {(readPatientActive === 'true') ?
          <li className='flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={readPatientHandler}>
            <Link href='/readPatient'>
              READ
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={readPatientHandler}>
            <Link href='/readPatient'>
              READ
            </Link>
          </li>
          }
        </ul>
        :
        <ul className='flex justify-center items-start gap-10 mt-5'>
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/'>
            HOME
            </Link>
          </li>
          {(createActive === 'true') ?
          <li className='flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={createHandler}>
            <Link href='/create'>
              CREATE
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={createHandler}>
            <Link href='/create'>
              CREATE
            </Link>
          </li>
          }
          {readActive === 'true' ?
          <li className='!flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={readHandler}>
            <Link href='/read'>
              READ
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={readHandler}>
            <Link href='/read'>
              READ
            </Link>
          </li>
          }
          {updateActive === 'true' ?
          <li className='!flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={updateHandler}>
            <Link href='/update'>
              UPDATE
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={updateHandler}>
            <Link href='/update'>
              UPDATE
            </Link>
          </li>
          }
          {deleteActive === 'true' ?
          <li className='!flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={deleteHandler}>
            <Link href='/delete'>
              DELETE
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={deleteHandler}>
            <Link href='/delete'>
              DELETE
            </Link>
          </li>
          }
          {searchActive === 'true' ?
          <li className='!flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={searchHandler}>
            <Link href='/search'>
              SEARCH
            </Link>
          </li>
          :
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={searchHandler}>
            <Link href='/search'>
              SEARCH
            </Link>
          </li>
          }
        </ul >
      }
    </>
  );
}