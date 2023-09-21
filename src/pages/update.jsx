import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';

export default function update() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [vacStat, setVacStat] = useState('');
  const [doctor, setDoctor] = useState('');
  const [healthCardNum, setHealthCardNum] = useState('');

  const handleClick = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:3000/api/update`)
      .then(res => {
        console.log(res.data);
      });
  };

  return (
    <div className={'flex flex-col bg-yellow-300 h-screen'}>
      <NavBar />
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 gap-5 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <h1 className='text-black font-2xl font-bold mt-5'>
          INSERT NEW MEDICAL INFORMATION
        </h1>
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          text='Name'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          text='Age'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          text='Date of Birth'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          text='Weight'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          text='Height'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={vacStat}
          onChange={(e) => setVacStat(e.target.value)}
          text='Vaccination Status'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          text='Doctor'
        />
        <Input
          className='text-center border-black border-4 text-black'
          type='text'
          value={healthCardNum}
          onChange={(e) => setHealthCardNum(e.target.value)}
          text='Healtch Card #'
        />
        <button className='flex justify-center align-center bg-yellow-500 border-4 border-black w-40 mb-5 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={handleClick} type='submit'>
          SUBMIT
        </button>
      </form>
    </div>
  );
}