import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';

export default function read() {

  // Hooks
  const [transactionId, setTransactionId] = useState('');

  // Helper Functions
  const onChange = (e) => {
    e.preventDefault();
    setTransactionId(e.target.value);
    console.log(transactionId);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(formMedData);
    axios.post(`http://localhost:3000/api/read`, transactionId)
      .then(res => {
        // console.log(res.data.txn);
        // setNewTxnData(res.data.txn);
      });
  };
  return (
    <div className='flex flex-col bg-yellow-300 h-screen w-full'>
      <NavBar />
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <Input
          className='my-5 text-center border-black border-4 text-black w-3/4'
          type='text'
          name='transactionId'
          value={transactionId}
          onChange={onChange}
          text='Transaction ID'
        />
        <button className='bg-yellow-500 border-4 border-black w-40 mb-5 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={handleClick} type='submit'>
          SUBMIT
        </button>
      </form>
    </div>
  );
}