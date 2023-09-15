import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// import NavBar from "../components/NavBar.jsx";
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <Link href='/healthCareProviderHomePage'>
        <button id='healthCareProviderButton' className='bg-green-500 border-4 border-violet-white gap-5'>
          HEALTH CARE PROVIDER
        </button>
      </Link>
      <Link href='/patientHomePage'>
        <button id='patientButton' className='bg-green-500 border-4 border-violet-white gap-5'>
          PATIENT
        </button>
      </Link>
    </>
  );
}
