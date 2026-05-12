import { useState, useEffect } from 'react';

const ChaiMenu = () => {
  const [menu, setMenu] = useState(null);
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then((response) => response.json())
  //     .then((data) => setMenu(data))
  //     .then(() => console.log(data))
  //     .catch((err) => console.error('Error fetching data: ', err));
  // }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenu(data);
      })
      .catch((err) => console.error('Error fetching data: ', err));
  }, []);
  return (
    <div>
      <h1>Welcome to RAW React</h1>
      <p>Data from API: {menu ? JSON.stringify(menu) : 'Loading...'}</p>
    </div>
  );
};

export default ChaiMenu;
