// Imports
import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import GenPDF from '../components/GenPDF';
import Link from 'next/link';

export default function create() {

  // Variables
  const [formMedData, setFormMedData] = useState({
    name: "",
    age: "",
    dob: "",
    weight: "",
    height: "",
    vacStat: "",
    doctor: "",
    healthCardNum: "",
  });
  

  const [newTxnData, setNewTxnData] = useState({});
  const [newPayloadData, setNewPayloadData,] = useState({});
  const currentDate = new Date().toISOString().split('T')[0];

  // Event handlers
  const onChange = (e) => {
    e.preventDefault();
    setFormMedData(prev => ({ ...prev, [`${e.target.name}`]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Form error handling
    if (!formMedData.name || !formMedData.age || !formMedData.dob || !formMedData.weight || !formMedData.height || !formMedData.vacStat || !formMedData.doctor || !formMedData.healthCardNum) return;

    // Posting form data to and receiving transaction confirmation from back-end create api
    axios.post(`http://localhost:3000/api/create`, formMedData)
      .then(res => {
        setNewTxnData(res.data.txn);
        const newPay = eval('(' + (res.data.txn.payload) + ')')
        setNewPayloadData(newPay);
      });
  };

  // Template
  return (
    <div className='flex flex-col bg-yellow-300 h-screen w-full'>
      <NavBar />
      {/* Create new medical record form */}
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 gap-5 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <h2 className='text-black font-2xl font-bold mt-5'>
          INPUT NEW MEDICAL INFORMATION
        </h2>
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='name'
          value={formMedData.name}
          onChange={onChange}
          text='Name'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='age'
          value={formMedData.age}
          onChange={onChange}
          text='Age'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='date'
          name='dob'
          value={formMedData.dob}
          onChange={onChange}
          text='Date of Birth'
          max={currentDate}
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='weight'
          value={formMedData.weight}
          onChange={onChange}
          text='Weight'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='height'
          value={formMedData.height}
          onChange={onChange}
          text='Height'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='vacStat'
          value={formMedData.vacStat}
          onChange={onChange}
          text='Vaccination Status'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='doctor'
          value={formMedData.doctor}
          onChange={onChange}
          text='Doctor'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='healthCardNum'
          value={formMedData.healthCardNum}
          onChange={onChange}
          text='Healtch Card #'
        />
        <button className='flex justify-center align-center bg-yellow-500 border-4 border-black mb-5 text-black rounded-t-2xl rounded-b-2xl font-bold w-1/4' onClick={handleClick} type='submit'>
          SUBMIT
        </button>
      </form>
      {/* Display new transaction data */}
      {Object.keys(newTxnData).length > 0 &&
        <div className='flex flex-col justify-center items-center bg-teal-500 mx-40 mb-10 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
          <h2 className='text-black font-2xl font-bold my-5 text-center'>
            TRANSACTION ID
          </h2>
          <label className='text-lg text-black mb-10'>
            {newTxnData.transaction_id}
          </label>
          <h2 className='text-black font-2xl font-bold my-5 text-center'>
            MEDICAL RECORD
          </h2>
          <label className='text-lg text-black mb-10 text-center'>
            {newPayloadData.name && `Name: ${newPayloadData.name}`}
            <br />
            {newPayloadData.age && `Age: ${newPayloadData.age}`}
            <br />
            {newPayloadData.dob && `Date of Birth: ${newPayloadData.dob}`}
            <br />
            {newPayloadData.weight && `Weight: ${newPayloadData.weight}`}
            <br />
            {newPayloadData.height && `Height: ${newPayloadData.height}`}
            <br />
            {newPayloadData.vacStat && `Vaccincation Status: ${newPayloadData.vacStat}`}
            <br />
            {newPayloadData.doctor && `Doctor: ${newPayloadData.doctor}`}
            <br />
            {
              newPayloadData.healthCardNum &&
              `Health Card #: ${newPayloadData.healthCardNum}`
            }
            <br />
            {/* Generate PDF with new medical record data */}
            <GenPDF 
              data={newPayloadData}
              priorTransactionId={null}
              transactionId={newTxnData.transaction_id}
              type='createMedicalRecord'
            />
          </label>
        </div>
        } 
    </div>
  );
}