import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import InvoiceGenerator from './components/InvoiceGenerator';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <div>
          <h1 className="text-center text-3xl my-6">BHIKHARILAL SITARAM</h1>
          <InvoiceGenerator />
        </div>
      )}
    </div>
  );
};

export default App;
