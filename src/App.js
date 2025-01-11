import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import InvoiceGenerator from './components/InvoiceGenerator';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);

  // Handle login by setting the initial invoice number
  const handleLogin = (initialInvoiceNumber) => {
    setInvoiceNumber(Number(initialInvoiceNumber));
    setIsLoggedIn(true);
  };

  // Handle logout by resetting login state and invoice number
  const handleLogout = () => {
    setIsLoggedIn(false);
    setInvoiceNumber(null);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <div>
          <h1 className="text-center text-3xl my-6">BHIKHARILAL SITARAM</h1>
          <InvoiceGenerator
            invoiceNumber={invoiceNumber}
            onIncrementInvoice={() => setInvoiceNumber(invoiceNumber + 1)}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default App;

