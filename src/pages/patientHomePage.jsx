// Imports
import NavBar from '../components/NavBar';

export default function patientHomePage() {
  
  // Template
  return (
    <div className='flex flex-col  justify-center bg-yellow-500 h-screen'>
      <NavBar
        readOnly={true}
      />
    </div>
  );
}