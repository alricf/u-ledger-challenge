import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import axios from 'axios';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [all, setAll] = useState(true);
  const [searchButton, setSearchButton] = useState(false);
  const [allSearchData, setAllSearchData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/search`)
      .then(res => {
        console.log(res.data);
        setAllSearchData(res.data.output);
      });
  }, []);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchButton) setSearchButton(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name === 'search') {
      if (all) setAll(false);
      if (!searchButton) setSearchButton(true);
    }
    if (e.target.name === 'allData') {
      if (!all) setAll(true);
      setAll(true);
      setSearchButton(false);
      setSearchTerm('');
    }
  };

  return (
    <div className='flex flex-col items-center bg-yellow-500 text-black h-screen px-10'>
      <NavBar />
      <div className='flex flex-col items-center my-10 py-10 bg-teal-500 gap-5 px-5 text-sm border-black border-4 rounded-t-2xl rounded-b-2xl max-w-full overflow-x-auto w-full h-full'>
        <form className='flex justify-center items-center gap-5 w-full'>
          <Input
            className='text-center border-black border-2 text-black w-full'
            type='text'
            name='searchTerm'
            value={searchTerm}
            onChange={onChange}
            text='Search'
          />
          <button
            className='flex justify-center align-center bg-yellow-500 border-4 border-black text-black rounded-t-2xl rounded-b-2xl font-bold w-1/6'
            onClick={onClick}
            name={'search'}
          >
            SEARCH
          </button>
          <button
            className='flex justify-center align-center bg-yellow-500 border-4 border-black text-black rounded-t-2xl rounded-b-2xl font-bold w-1/6'
            onClick={onClick}
            name={'allData'}
          >
            ALL DATA
          </button>
        </form>
        {(all && !searchButton && (allSearchData.length > 0)) &&
          <table className='text-center table-auto'>
            <thead>
              <tr>
                <th className='bg-yellow-500 px-2 py-1 border-black border-2'>
                  Transaction ID
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Name
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Age
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Date of Birth
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Weight
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Height
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Vaccination Status
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Doctor
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Health Card #
                </th>
              </tr>
            </thead>
            <tbody>
              {allSearchData.map((element) => {
                return (
                  <tr>
                    <td className='bg-white px-4 py-2 border-black border-2 text-sm whitespace-normal overflow-wrap-break-word w-1/6'>
                      {element.transactionId}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2 whitespace-normal break-words'>
                      {element.payload.name}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.age}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.dob}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.weight}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.height}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.vacStat}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.doctor}
                    </td>
                    <td className='bg-white px-4 py-2 border-black border-2'>
                      {element.payload.healthCardNum}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
        {(!all && searchButton && (allSearchData.length > 0)) &&
          <table>
            <thead>
              <tr>
                <th className='bg-yellow-500 px-2 py-1 border-black border-2'>
                  Transaction ID
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Name
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Age
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Date of Birth
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Weight
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Height
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Vaccination Status
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Doctor
                </th>
                <th className='bg-yellow-500 px-4 py-2 border-black border-2'>
                  Health Card #
                </th>
              </tr>
            </thead>
            <tbody>
              {
                allSearchData.map((element) => {
                  if (Object.values(element.payload).includes(searchTerm)) {
                    return (
                      <tr>
                        <td className='bg-white px-4 py-2 border-black border-2 text-sm whitespace-normal overflow-wrap-break-word w-1/6'>
                          {element.transactionId}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2 whitespace-normal break-words'>
                          {element.payload.name}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.age}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.dob}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.weight}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.height}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.vacStat}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.doctor}
                        </td>
                        <td className='bg-white px-4 py-2 border-black border-2'>
                          {element.payload.healthCardNum}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}