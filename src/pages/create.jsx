import axios from 'axios'

export default function create() {
  const handleClick = () => {
    axios.get(`http://localhost:3000/api/create`)
      .then(res => {
        console.log(res.data);
      });
  };
  
  return (
    <>
      <button className='bg-green-500 border-4 border-violet-white gap-5' onClick={(handleClick)}>
        CREATE
      </button>
    </>
  );
}

