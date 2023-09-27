import { useState, useEffect } from 'react';
import Link from "next/link";
import buttonHooks from '../hooks/buttonHook';


export default function NavBar({ readOnly }) {

  // const [createActive, setCreateActive] = useState(false);
  // const [readActive, setReadActive] = useState(false);
  // const [updateActive, setUpdateActive] = useState(false);
  // const [deleteActive, setDeleteActive] = useState(false);
  // const [searchActive, setSearchActive] = useState(false);

  
  const createHandler = (e) => {
    e.preventDefault();
    // setCreateActive(true);
    // setReadActive(false);
    // setUpdateActive(false);
    // setDeleteActive(false);
    // setSearchActive(false);
    localStorage.clear();
    localStorage.setItem('create', 'true')
    //console.log(createActive);
  }
  
  const readHandler = (e) => {
    e.preventDefault()
    // setCreateActive(false);
    // setReadActive(true);
    // setUpdateActive(false);
    // setDeleteActive(false);
    // setSearchActive(false);
    localStorage.clear();
    localStorage.setItem('read', 'true')
  }
  
  const updateHandler = (e) => {
    e.preventDefault()
    // setCreateActive(false);
    // setReadActive(false);
    // setUpdateActive(true);
    // setDeleteActive(false);
    // setSearchActive(false);
    localStorage.clear();
    localStorage.setItem('update', 'true')
  }
  
  const deleteHandler = (e) => {
    e.preventDefault()
    // setCreateActive(false);
    // setReadActive(false);
    // setUpdateActive(false);
    // setDeleteActive(true);
    // setSearchActive(false);
    localStorage.clear();
    localStorage.setItem('delete', 'true')
  }
  
  const searchHandler = (e) => {
    e.preventDefault()
    // setCreateActive(false);
    // setReadActive(false);
    // setUpdateActive(false);
    // setDeleteActive(false);
    // setSearchActive(true);
    localStorage.clear();
    localStorage.setItem('search', 'true');
  }
  
  const { createActive, readActive, updateActive, deleteActive, searchActive } = buttonHooks();
  // useEffect(() => {
    //   setCreateActive(localStorage.getItem('create'));
  //   setReadActive(localStorage.getItem('read'));
  //   setUpdateActive(localStorage.getItem('update'));
  //   setDeleteActive(localStorage.getItem('delete'));
  //   setSearchActive(localStorage.getItem('search'));
  // }, []);

  console.log(createActive)

  return (
    <>
      {readOnly ?
        <ul className='flex justify-center items-start mt-5'>
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/readPatient'>
              READ
            </Link>
          </li>
        </ul>
        :
        <ul className='flex justify-center items-start gap-10 mt-5'>
          {createActive === 'true' ?
          <li className='!flex justify-center align-center bg-red-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={createHandler}>
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