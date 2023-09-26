import Link from "next/link";

export default function NavBar({ readOnly }) {
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
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/create'>
              CREATE
            </Link>
          </li>
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/read'>
              READ
            </Link>
          </li>
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/update'>
              UPDATE
            </Link>
          </li >
          <li className='flex justify-center align-center bg-green-500 border-4 border-black w-40 text-black rounded-t-2xl rounded-b-2xl font-bold'>
            <Link href='/delete'>
              DELETE
            </Link>
          </li >
        </ul >
      }
    </>
  );
}