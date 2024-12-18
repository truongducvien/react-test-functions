import { db } from './db';
import { Button } from '@chakra-ui/react';

export default function ByteArrayToExcel() {
  const handleExport = () => {
    const file = new Blob([db], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(file);
    console.log(url);
    window.open(url);
  };

  return (
    <>
      <h2>Byte Array To Excel</h2>
      <Button onClick={handleExport}>Export file</Button>
    </>
  );
}
