import NavBar from '../components/NavBar';

export default function patientHomePage() {
  return (
    <div className='flex flex-col'>
      <NavBar
        readOnly={true}
      />
    </div>
  );
}