import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Input from '../components/Input';

export default function update() {

  const [updateFormData, setUpdateFormData] = useState({
    transactionId: "",
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

  const onChange = (e) => {
    e.preventDefault();
    setUpdateFormData(prev => ({ ...prev, [`${e.target.name}`]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault()
    // Error handling
    if (!updateFormData.transactionId || !updateFormData.name || !updateFormData.age || !updateFormData.dob || !updateFormData.weight || !updateFormData.height || !updateFormData.vacStat || !updateFormData.doctor || !updateFormData.healthCardNum) return;

    axios.post(`http://localhost:3000/api/update`, updateFormData)
      .then(res => {
        //console.log(res.data);
        setNewTxnData(res.data.txn);
      });
  };

  return (
    <div className={'flex flex-col bg-yellow-300 h-screen'}>
      <NavBar />
      <form className='flex flex-col justify-center items-center my-10 bg-teal-500 gap-5 mx-40 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
        <h1 className='text-black font-2xl font-bold mt-5'>
          INPUT TRANSACTION ID
        </h1>
        <Input 
          className='text-center border-black border-4 text-black w-3/4'
          type='text'
          name='transactionId'
          value={updateFormData.transactionId}
          onChange={onChange}
          text='Transaction ID'
        />
        <h1 className='text-black font-2xl font-bold mt-5'>
          UPDATE MEDICAL INFORMATION
        </h1>
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='name'
          value={updateFormData.name}
          onChange={onChange}
          text='Name'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='age'
          value={updateFormData.age}
          onChange={onChange}
          text='Age'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='date'
          name='dob'
          value={updateFormData.dob}
          onChange={onChange}
          text='Date of Birth'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='weight'
          value={updateFormData.weight}
          onChange={onChange}
          text='Weight'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='height'
          value={updateFormData.height}
          onChange={onChange}
          text='Height'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='vacStat'
          value={updateFormData.vacStat}
          onChange={onChange}
          text='Vaccination Status'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='doctor'
          value={updateFormData.doctor}
          onChange={onChange}
          text='Doctor'
        />
        <Input
          className='text-center border-black border-4 text-black w-1/3'
          type='text'
          name='healthCardNum'
          value={updateFormData.healthCardNum}
          onChange={onChange}
          text='Healtch Card #'
        />
        <button className='flex justify-center align-center bg-yellow-500 border-4 border-black w-40 mb-5 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={handleClick} type='submit'>
          SUBMIT
        </button>
      </form>
      {Object.keys(newTxnData).length > 0 &&
        <div className='flex flex-col justify-center items-center bg-teal-500 mx-40 mb-10 text-xl border-black border-4 rounded-t-2xl rounded-b-2xl'>
          <h2 className='text-black font-2xl font-bold my-5 text-center'>
            TRANSACTION ID
          </h2>
          <label className={'text-lg text-black mb-10'}>
            {newTxnData.transaction_id}
          </label>
        </div>
      }
    </div>
  );
}