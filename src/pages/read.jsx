import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import GenPDF from '../components/GenPDF';

export default function read() {

  // Hooks
  const [transactionId, setTransactionId] = useState('');
  const [payloadData, setPayloadData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  // Helper Functions
  const onChange = (e) => {
    e.preventDefault();
    setTransactionId(e.target.value);
    console.log(transactionId);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(formMedData);
    axios.post(`http://localhost:3000/api/read`, {transactionId})
      .then(res => {
        setErrorMsg('')
        // console.log(res.data.txPayload);
        setPayloadData(res.data.txPayload);
      })
      .catch(error => {
        setPayloadData({})
        // console.log(error.response.data.error)
        setErrorMsg(error.response.data.error)
      })
  };

  // console.log(payloadData);

  return (
    <div className='flex flex-col bg-yellow-300 h-screen w-full'>
      <NavBar />
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <h1 className='text-black font-2xl font-bold mt-5'>
          INPUT TRANSACTION ID
        </h1>
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
      {errorMsg && 
        <div className='flex flex-col justify-center items-center bg-red-500 mx-40 mb-10 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
          {errorMsg}
        </div>
      }
      {Object.keys(payloadData).length > 0 &&
        <div className='flex flex-col justify-center items-center bg-teal-500 mx-40 mb-10 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
          <h2 className='text-black font-2xl font-bold my-5 text-center'>
            MEDICAL RECORD
          </h2>
          <label className='text-lg text-black mb-10 text-center'>
            {payloadData.name && `Name: ${payloadData.name}`}
            <br />
            {payloadData.age && `Age: ${payloadData.age}`}
            <br />
            {payloadData.dob && `Date of Birth: ${payloadData.dob}`}
            <br />
            {payloadData.weight && `Weight: ${payloadData.weight}`}
            <br />
            {payloadData.height && `Height: ${payloadData.height}`}
            <br />
            {payloadData.vacStat && `Vaccincation Status: ${payloadData.vacStat}`}
            <br />
            {payloadData.doctor && `Doctor: ${payloadData.doctor}`}
            <br />
            {
              payloadData.healthCardNum &&
              `Health Card #: ${payloadData.healthCardNum}`
            }
            <br />
            <GenPDF 
              data={payloadData}
              priorTransactionId={null}
              transactionId={transactionId}
              type='readMedicalRecord'
            />
          </label>
        </div>
      }
    </div>
  );
};