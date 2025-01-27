import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Import the autoTable plugin

const InvoiceGenerator = () => {
  const [clientName, setClientName] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentSource, setPaymentSource] = useState('Cash'); // Added state for payment source

  // Recalculate total and taxes when items change
  useEffect(() => {
    calculateTotal(items);
  }, [items]);

  const handleItemChange = (index, event) => {
    const updatedItems = [...items];
    const { name, value } = event.target;
    updatedItems[index][name] = name === 'quantity' || name === 'rate' ? parseFloat(value) : value;

    // Update the amount based on quantity * rate
    updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((item, idx) => idx !== index);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (items) => {
    let newTotal = 0;
    items.forEach(item => {
      newTotal += item.amount || 0;
    });
    setTotal(newTotal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sgstAndCgst = total * 0.025; // 2.5% of total
    const totalTax = sgstAndCgst * 2; // SGST + CGST
    const discountAmount = (total * discount) / 100; // Calculate discount as percentage
    const totalPayable = total + totalTax - discountAmount;

    generatePDF(total, totalTax, discountAmount, totalPayable, sgstAndCgst, paymentSource);
  };

  const generatePDF = (total, totalTax, discount, totalPayable, sgstAndCgst, paymentSource) => {
    const doc = new jsPDF();

    // Company Details
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("BHIKHARILAL SITARAM", 105, 20, null, null, "center");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("26-B & C, GRANT STREET, KOLKATA - 700013", 105, 30, null, null, "center");
    doc.text("ESTD: 1916", 105, 35, null, null, "center");
    doc.text("PH.: 033-2228-5204", 105, 40, null, null, "center");
    doc.text("E-Mail: blsr.sr@gmail.com", 105, 45, null, null, "center");
    doc.text("GSTIN: 19AADFB2340K1ZL State: 19 West Bengal", 105, 50, null, null, "center");

    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55);

    doc.text(`Customer: ${clientName}`, 10, 60);
    const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
    doc.text(`Invoice Number: ${invoiceNumber}`, 85, 60);
    const invoiceDate = new Date().toLocaleDateString();
    doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

    doc.autoTable({
        startY: 70,
        head: [["Item", "Quantity", "Rate", "Amount"]],
        body: items.map((item) => [item.description, item.quantity, item.rate, item.amount]),
        theme: "grid",
    });

    doc.line(10, doc.lastAutoTable.finalY + 10, 200, doc.lastAutoTable.finalY + 10);

    const spacing = 6;
    doc.text(`Total: Rs.${total.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);
    doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing);
    doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 2);
    doc.text(`Discount: Rs.${discount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 3);

    const totalPayableY = doc.lastAutoTable.finalY + 20 + spacing * 4 + 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(10, totalPayableY - 5, 190, 10, "FD");
    doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, "center");

    // Payment Source and Authorized Signatory on the same line
    const footerY = totalPayableY + 20;
    doc.text(`Payment Source: ${paymentSource}`, 10, footerY); // Payment Source on the left
    doc.text("Authorized Signatory", 190, footerY, null, null, "right"); // Authorized Signatory on the right

    const invoiceDateFormatted = new Date().toLocaleDateString().replace(/\//g, "-");
    const filename = `Invoice-${invoiceDateFormatted}-${clientName}-${invoiceNumber}.pdf`;
    doc.save(filename);
    window.open(doc.output("bloburl"), "_blank");
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Billing Software</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Customer Mobile No:</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex space-x-4 items-center">
              <div className="w-1/2">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/3">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/3">
                <input
                  type="number"
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Rate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/3">
                <input
                  type="number"
                  value={item.amount}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 px-2 py-1 bg-gray-100 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Item
        </button>

        <div className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="paymentSource" className="block text-sm font-medium text-gray-700">Payment Source</label>
              <select
                id="paymentSource"
                value={paymentSource}
                onChange={(e) => setPaymentSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-lg font-semibold">
            <p>Total: ₹{total.toFixed(2)}</p>
            <p>SGST: ₹{(total * 0.025).toFixed(2)}</p>
            <p>CGST: ₹{(total * 0.025).toFixed(2)}</p>
            <p>Discount: ₹{(total * discount / 100).toFixed(2)}</p>
            <p>Total Payable: ₹{(total + total * 0.025 * 2 - (total * discount / 100)).toFixed(2)}</p>
          </div>
        </div>
        

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceGenerator;
