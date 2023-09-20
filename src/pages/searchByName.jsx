import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';

export default function create() {

  const [name, setName] = useState('');

  const handleClick = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:3000/api/searchByName`)
      .then(res => {
        console.log(res.data);
      });
  };

  return (
    <div className={'flex flex-col bg-yellow-300 h-screen'}>
      <NavBar />
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 gap-5 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <h1 className='text-black font-2xl font-bold mt-5'>
						INPUT CLIENT NAME
        </h1>
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          text='Name'
        />
        <button className='flex justify-center align-center bg-yellow-500 border-4 border-black w-40 mb-5 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={handleClick} type='submit'>
          SUBMIT
        </button>
      </form>
    </div>
  );
}