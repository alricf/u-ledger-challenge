require('dotenv').config();
import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center gap-20 bg-yellow-500 h-screen'>
      <Link href='/searchByName'>
        <button
          type='button'
          id='searchByHealthName'
          className='rounded-t-2xl rounded-b-2xl p-3 border-radius-5 bg-green-500 border-4 border-black text-black text-5xl'>
          SEARCH BY NAME
        </button>
      </Link>
      <Link href='/searchByHealthCardNum'>
        <button type='button' id='searchByHealthCardNumberButton' className='rounded-t-2xl rounded-b-2xl p-3 border-radius-5 bg-green-500 border-4 border-black text-black text-5xl'>
          SEARCH BY HEALTHCARD #
        </button>
      </Link>
    </div>
  );
}
