import { useState, useEffect } from "react";

export default function buttonHooks() {
  
  const [createActive, setCreateActive] = useState(false);
  const [readActive, setReadActive] = useState(false);
  const [updateActive, setUpdateActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
      setCreateActive(localStorage.getItem('create'));
      setReadActive(localStorage.getItem('read'));
      setUpdateActive(localStorage.getItem('update'));
      setDeleteActive(localStorage.getItem('delete'));
      setSearchActive(localStorage.getItem('search'));

      // console.log(createActive, readActive)
  }, []);

  return {createActive, readActive, updateActive, deleteActive, searchActive};

};