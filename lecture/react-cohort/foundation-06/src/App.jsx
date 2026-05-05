import { useState } from 'react';
import HookForm from './HookForm';
import ManualForm from './ManualForm';
import './App.css';

const App = () => {
  const [tab, setTab] = useState('manual');
  return (
    <>
      <div>
        <div className="shell">
          <h1>Job Application</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, omnis.
          </p>
        </div>
        <div className="tab">
          <button onClick={() => setTab('manual')}>Controlled - Manual</button>
          <button onClick={() => setTab('rhf')}>React Hook Form</button>
        </div>
        <h1>Getting started with React</h1>
        {tab === 'manual' ? <ManualForm /> : <HookForm />}
      </div>
    </>
  );
};

export default App;
