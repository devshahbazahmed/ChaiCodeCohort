// import { useEffect, useState } from 'react';
import './App.css';
import ChaiMenu from './ChaiMenu';
import { useSpecialChai } from './hooks/useSpecialChai';

const App = () => {
  // const [data, setData] = useState(null);
  // console.log(import.meta.env.VITE_API_URL);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .then(() => console.log(data))
  //     .catch((err) => console.error('Error fetching data: ', err));
  // }, []);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     })
  //     .catch((err) => console.error('Error fetching data: ', err));
  // }, []);

  const { chai, loading, error } = useSpecialChai();
  return (
    <div>
      {/* <h1>Welcome to RAW React</h1>
      <p>Data from API: {data ? JSON.stringify(data) : 'Loading...'}</p> */}
      <ChaiMenu />
      <h2>Specail Chai</h2>
      <p>{chai ? chai.name : 'Loading...'}</p>
    </div>
  );
};

export default App;
