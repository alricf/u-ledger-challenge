import jsPDF from 'jspdf';

export default function genPDF({ data, transactionId, type }) {

  const generate = () => {

    if (type === 'readMedicalRecord') {
      console.log(type);

      const pdf = new jsPDF();

      pdf.setFont('calibri', 'bold');
      pdf.setFontSize(12);
      pdf.text(`TransactionID: ${transactionId}\n\n`, 10, 10);

      pdf.setFont('calibri');
      pdf.setFontSize(10);
      pdf.text(`Name: ${data.name}\nAge: ${data.age}\nDate of Birth: ${data.dob}\nWeight: ${data.weight}\nHeight: ${data.height}\nVaccination Status: ${data.vacStat}\nDoctor: ${data.doctor}\nHealth Card #: ${data.healthCardNum}`, 10, 20);

      pdf.save(`${transactionId}.pdf`);
    }  
    if (type === 'createMedicalRecord') {
      const pdf = new jsPDF();

      pdf.setFont('calibri', 'bold');
      pdf.setFontSize(12);
      pdf.text(`New TransactionID: ${transactionId}\n\n`, 10, 10);

      pdf.setFont('calibri');
      pdf.setFontSize(10);
      pdf.text(`Name: ${data.name}\nAge: ${data.age}\nDate of Birth: ${data.dob}\nWeight: ${data.weight}\nHeight: ${data.height}\nVaccination Status: ${data.vacStat}\nDoctor: ${data.doctor}\nHealth Card #: ${data.healthCardNum}`, 10, 20);

      pdf.save(`${transactionId}.pdf`);
    }

  };

  return (
    <button className='bg-yellow-500 border-4 border-black w-40 my-5 text-black rounded-t-2xl rounded-b-2xl font-bold' onClick={generate}>Generate PDF</button>
  );
}
