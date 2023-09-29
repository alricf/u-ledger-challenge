// Import react hooks
import { useState, useEffect } from "react";

// Button hooks
export default function buttonHooks() {
  
  const [createActive, setCreateActive] = useState(false);
  const [readActive, setReadActive] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [readPatientActive, setReadPatientActive] = useState(false);

  // UseEffect hooks to preload highlighted data
  useEffect(() => {
      setCreateActive(localStorage.getItem('create'));
      setReadActive(localStorage.getItem('read'));
      setUpdateActive(localStorage.getItem('update'));
      setDeleteActive(localStorage.getItem('delete'));
      setSearchActive(localStorage.getItem('search'));
      setReadPatientActive(localStorage.getItem('readPatient'));
  }, []);

  return {createActive, readActive, updateActive, deleteActive, searchActive, readPatientActive};

};