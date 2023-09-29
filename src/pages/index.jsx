// Imports
require('dotenv').config();
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

// Global variable
const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  // Event handler
  const handleClick = () => {
    localStorage.setItem('createActive', false)
  }

  // Template
  return (
    <div className='flex flex-col justify-center items-center gap-20 bg-yellow-500 h-screen'>
      {/* Health care portal entry button */}
      <Link href='/healthCareProviderHomePage'>
        <button
          type='button'
          id='healthCareProviderButton'
          className='rounded-t-2xl rounded-b-2xl p-3 border-radius-5 bg-green-500 border-4 border-black text-black text-5xl'
          onClick={handleClick}
        >
          HEALTH CARE PROVIDER
        </button>
      </Link>
      {/* Patient portal entry button */}
      <Link href='/patientHomePage'>
        <button type='button' id='healthCareProviderButton' className='rounded-t-2xl rounded-b-2xl p-3 border-radius-5 bg-green-500 border-4 border-black text-black text-5xl'
        >
          PATIENT
        </button>
      </Link>
    </div>
  );
}
