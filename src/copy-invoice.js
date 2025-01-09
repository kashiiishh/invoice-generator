// import React, { useState, useEffect } from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';  // Import the autoTable plugin

// const InvoiceGenerator = () => {
//     const [clientName, setClientName] = useState('');
//     const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
//     const [total, setTotal] = useState(0);
//     const [discount, setDiscount] = useState(0);
//     const [paymentSource, setPaymentSource] = useState('Cash'); // Added state for payment source

//     // Recalculate total when items change
//     useEffect(() => {
//         calculateTotal(items);
//     }, [items]);

//     const handleItemChange = (index, event) => {
//         const updatedItems = [...items];
//         const { name, value } = event.target;
//         updatedItems[index][name] = name === 'quantity' || name === 'rate' ? parseFloat(value) : value;

//         // Update the amount based on quantity * rate
//         // updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
//         updatedItems[index].amount = parseFloat((updatedItems[index].quantity * updatedItems[index].rate).toFixed(2));
//         setItems(updatedItems);
//         calculateTotal(updatedItems);
//     };

//     const addItem = () => {
//         setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
//     };

//     const removeItem = (index) => {
//         const updatedItems = items.filter((item, idx) => idx !== index);
//         setItems(updatedItems);
//         calculateTotal(updatedItems);
//     };

//     const calculateTotal = (items) => {
//         let newTotal = 0;
//         items.forEach(item => {
//             newTotal += item.amount || 0;
//         });
//         setTotal(newTotal);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const sgstAndCgst = total * 0.025; // SGST and CGST are part of the total
//         const discountAmount = (total * discount) / 100; // Calculate discount as percentage
//         const totalPayable = total - discountAmount; // Total payable excludes SGST/CGST addition

//         generatePDF(total, sgstAndCgst, discountAmount, totalPayable, paymentSource);
//     };

//     // const generatePDF = (total, sgstAndCgst, discount, totalPayable, paymentSource) => {
//     //   const doc = new jsPDF();

//     //   // Company Details
//     //   doc.setFontSize(16);
//     //   doc.setFont("helvetica", "bold");
//     //   doc.text("BHIKHARILAL SITARAM", 105, 20, null, null, "center");

//     //   doc.setFontSize(10);
//     //   doc.setFont("helvetica", "normal");
//     //   doc.text("26-B & C, GRANT STREET, KOLKATA - 700013", 105, 30, null, null, "center");
//     //   doc.text("ESTD: 1916", 105, 35, null, null, "center");
//     //   doc.text("PH.: 033-2228-5204", 105, 40, null, null, "center");
//     //   doc.text("E-Mail: blsr.sr@gmail.com", 105, 45, null, null, "center");
//     //   doc.text("GSTIN: 19AADFB2340K1ZL State: 19 West Bengal", 105, 50, null, null, "center");

//     //   doc.setLineWidth(0.5);
//     //   doc.line(10, 55, 200, 55);

//     //   doc.text(`Customer: ${clientName}`, 10, 60);
//     //   const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
//     //   doc.text(`Invoice Number: ${invoiceNumber}`, 85, 60);
//     //   const invoiceDate = new Date().toLocaleDateString();
//     //   doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

//     //   doc.autoTable({
//     //       startY: 70,
//     //       head: [["Item", "Quantity", "Rate", "Amount"]],
//     //       body: items.map((item) => [item.description, item.quantity, item.rate, item.amount]),
//     //       theme: "grid",
//     //   });

//     //   doc.line(10, doc.lastAutoTable.finalY + 10, 200, doc.lastAutoTable.finalY + 10);

//     //   const spacing = 6;
//     //   doc.text(`Total (Inclusive of SGST & CGST): Rs.${total.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);
//     //   doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing);
//     //   doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 2);
//     //   doc.text(`Discount: Rs.${discount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 3);

//     //   const totalPayableY = doc.lastAutoTable.finalY + 20 + spacing * 4 + 10;
//     //   doc.setFillColor(240, 240, 240);
//     //   doc.rect(10, totalPayableY - 5, 190, 10, "FD");
//     //   doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, "center");

//     //   const footerY = totalPayableY + 20;
//     //   doc.text(`Payment Source: ${paymentSource}`, 10, footerY);
//     //   doc.text("Authorized Signatory", 190, footerY, null, null, "right");

//     //   const invoiceDateFormatted = new Date().toLocaleDateString().replace(/\//g, "-");
//     //   const filename = `Invoice-${invoiceDateFormatted}-${clientName}-${invoiceNumber}.pdf`;
//     //   doc.save(filename);
//     //   window.open(doc.output("bloburl"), "_blank");
//     // };

//     const generatePDF = (total, sgstAndCgst, discount, totalPayable, paymentSource) => {
//         const doc = new jsPDF();

//         // Company Header
//         doc.setFontSize(16);
//         doc.setFont("helvetica", "bold");
//         doc.text("BHIKHARILAL SITARAM", 105, 20, null, null, "center");

//         doc.setFontSize(10);
//         doc.setFont("helvetica", "normal");
//         doc.text("26-B & C, GRANT STREET, KOLKATA - 700013", 105, 30, null, null, "center");
//         doc.text("ESTD: 1916", 105, 35, null, null, "center");
//         doc.text("PH.: 033-2228-5204", 105, 40, null, null, "center");
//         doc.text("E-Mail: blsr.sr@gmail.com", 105, 45, null, null, "center");
//         doc.text("GSTIN: 19AADFB2340K1ZL State: 19 West Bengal", 105, 50, null, null, "center");

//         // Line Break
//         doc.setLineWidth(0.5);
//         doc.line(10, 55, 200, 55);

//         // Customer Details
//         doc.text(`Customer: ${clientName}`, 10, 60);
//         const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
//         doc.text(`Invoice Number: ${invoiceNumber}`, 85, 60);
//         const invoiceDate = new Date().toLocaleDateString();
//         doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

//         // Table for Items
//         doc.autoTable({
//             startY: 70, // Adjust this value if needed
//             head: [["Item", "Quantity", "Rate", "Amount"]],
//             body: items.map((item) => [item.description, item.quantity, item.rate, item.amount]),
//             theme: "grid",
//         });

//         // Check the position after the table
//         const lastY = doc.lastAutoTable.finalY + 10;

//         // Summary Details
//         const spacing = 6;
//         doc.text(`Total (Inclusive of SGST & CGST): Rs.${total.toFixed(2)}`, 10, lastY);
//         doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing);
//         doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing * 2);
//         doc.text(`Discount: Rs.${discount.toFixed(2)}`, 10, lastY + spacing * 3);

//         // Total Payable Highlight
//         const totalPayableY = lastY + spacing * 4 + 10;
//         doc.setFillColor(240, 240, 240);
//         doc.rect(10, totalPayableY - 5, 190, 10, "FD");
//         doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, "center");

//         // Footer
//         const footerY = totalPayableY + 20;
//         doc.text(`Payment Source: ${paymentSource}`, 10, footerY);
//         doc.text("Authorized Signatory", 190, footerY, null, null, "right");

//         // Save PDF
//         const invoiceDateFormatted = new Date().toLocaleDateString().replace(/\//g, "-");
//         const filename = `Invoice-${invoiceDateFormatted}-${clientName}-${invoiceNumber}.pdf`;
//         doc.save(filename);
//         window.open(doc.output("bloburl"), "_blank");
//     };


//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
//             <h2 className="text-2xl font-semibold text-center mb-4">Billing Software</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Customer Mobile No:</label>
//                     <input
//                         type="text"
//                         id="clientName"
//                         name="clientName"
//                         value={clientName}
//                         onChange={(e) => setClientName(e.target.value)}
//                         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         required
//                     />
//                 </div>

//                 <div className="space-y-4">
//                     {items.map((item, index) => (
//                         <div key={index} className="flex space-x-4 items-center">
//                             <div className="w-1/2">
//                                 <input
//                                     type="text"
//                                     name="description"
//                                     value={item.description}
//                                     onChange={(e) => handleItemChange(index, e)}
//                                     placeholder="Description"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                                 />
//                             </div>
//                             <div className="w-1/3">
//                                 <input
//                                     type="number"
//                                     name="quantity"
//                                     value={item.quantity}
//                                     onChange={(e) => handleItemChange(index, e)}
//                                     placeholder="Quantity"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                                 />
//                             </div>
//                             <div className="w-1/3">
//                                 <input
//                                     type="number"
//                                     name="rate"
//                                     value={item.rate}
//                                     onChange={(e) => handleItemChange(index, e)}
//                                     placeholder="Rate"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                                 />
//                             </div>
//                             <div className="w-1/3">
//                                 <input
//                                     type="number"
//                                     value={item.amount}
//                                     readOnly
//                                     placeholder="Amount"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                                 />
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem(index)}
//                                 className="text-red-500 px-2 py-1 bg-gray-100 rounded-md"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     type="button"
//                     onClick={addItem}
//                     className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 >
//                     Add Item
//                 </button>

//                 <div className="mt-4 space-y-4">
//                     <div className="flex space-x-4">
//                         <div className="w-1/2">
//                             <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
//                             <input
//                                 type="number"
//                                 id="discount"
//                                 value={discount}
//                                 onChange={(e) => setDiscount(parseFloat(e.target.value))}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                             />
//                         </div>
//                         <div className="w-1/2">
//                             <label htmlFor="paymentSource" className="block text-sm font-medium text-gray-700">Payment Source</label>
//                             <select
//                                 id="paymentSource"
//                                 value={paymentSource}
//                                 onChange={(e) => setPaymentSource(e.target.value)}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                             >
//                                 <option value="Cash">Cash</option>
//                                 <option value="UPI">UPI</option>
//                                 <option value="Credit Card">Credit Card</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="mt-4 text-lg font-semibold">
//                         <p>Total: ₹{total.toFixed(2)}</p>
//                         <p>SGST: ₹{(total * 0.025).toFixed(2)}</p>
//                         <p>CGST: ₹{(total * 0.025).toFixed(2)}</p>
//                         <p>Discount: ₹{(total * discount / 100).toFixed(2)}</p>
//                         {/* <p>Total Payable: ₹{(total + total * 0.025 * 2 - (total * discount / 100)).toFixed(2)}</p> */}
//                         <p>Total Payable: ₹{(total - (total * discount / 100)).toFixed(2)}</p>

//                     </div>
//                 </div>


//                 <button
//                     type="submit"
//                     className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                 >
//                     Generate Invoice
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default InvoiceGenerator;

import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Import the autoTable plugin

const InvoiceGenerator = () => {
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [paymentSource, setPaymentSource] = useState('Cash'); // Added state for payment source

    // Recalculate total when items change
    useEffect(() => {
        calculateTotal(items);
    }, [items]);

    const handleItemChange = (index, event) => {
        const updatedItems = [...items];
        const { name, value } = event.target;
        updatedItems[index][name] = name === 'quantity' || name === 'rate' ? parseFloat(value) : value;

        // Update the amount based on quantity * rate
        // updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
        updatedItems[index].amount = parseFloat((updatedItems[index].quantity * updatedItems[index].rate).toFixed(2));
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


    // const handleSaveData = async () => {
    //   const sgstAndCgst = total * 0.025;
    //   const discountAmount = (total * discount) / 100;
    //   const totalPayable = total + sgstAndCgst * 2 - discountAmount;

    //   const formData = {
    //     clientName,
    //     total: total.toFixed(2),
    //     sgst: sgstAndCgst.toFixed(2),
    //     cgst: sgstAndCgst.toFixed(2),
    //     discount: discountAmount.toFixed(2),
    //     totalPayable: totalPayable.toFixed(2),
    //     paymentSource,
    //   };

    //   try {
    //     const response = await fetch('http://localhost:3001/api/save-data', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //       alert('Data successfully saved!');
    //     } else {
    //       console.error('Error saving data:', response.status);
    //       alert('Failed to save data.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Error connecting to the server.');
    //   }
    // };

    // const handleSaveData = async () => {
    //   const sgstAndCgst = total * 0.025;
    //   const discountAmount = (total * discount) / 100;
    //   const totalPayable = total + sgstAndCgst * 2 - discountAmount;

    //   const formData = {
    //     clientName,
    //     total: total.toFixed(2),
    //     sgst: sgstAndCgst.toFixed(2),
    //     cgst: sgstAndCgst.toFixed(2),
    //     discount: discountAmount.toFixed(2),
    //     totalPayable: totalPayable.toFixed(2),
    //     paymentSource,
    //   };

    //   try {
    //     // Map your data to the Google Form's entry fields
    //     const googleFormData = new URLSearchParams();
    //     googleFormData.append('entry.11395408', formData.clientName); // Replace with your field's entry ID
    //     googleFormData.append('entry.1649696198', formData.total); // Replace with your field's entry ID
    //     googleFormData.append('entry.868797987', formData.sgst); // Replace with your field's entry ID
    //     googleFormData.append('entry.253471962', formData.cgst); // Replace with your field's entry ID
    //     googleFormData.append('entry.473550820', formData.discount); // Replace with your field's entry ID
    //     googleFormData.append('entry.640404071', formData.totalPayable); // Replace with your field's entry ID
    //     googleFormData.append('entry.1769481674', formData.paymentSource); // Replace with your field's entry ID

    //     // Send the data to your Google Form's action URL
    //     const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //       body: googleFormData.toString(),
    //     });

    //     if (response.ok) {
    //       alert('Data successfully saved to Google Form!');
    //     } else {
    //       console.error('Error saving data:', response.status);
    //       alert('Failed to save data to Google Form.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Error connecting to the Google Form.');
    //   }
    // };


    // const handleSaveData = async () => {
    //   const sgstAndCgst = total * 0.025;
    //   const discountAmount = (total * discount) / 100;
    //   const totalPayable = total + sgstAndCgst * 2 - discountAmount;

    //   const formData = {
    //     clientName,
    //     total: total.toFixed(2),
    //     sgst: sgstAndCgst.toFixed(2),
    //     cgst: sgstAndCgst.toFixed(2),
    //     discount: discountAmount.toFixed(2),
    //     totalPayable: totalPayable.toFixed(2),
    //     paymentSource,
    //   };

    //   try {
    //     // Send data to your Node.js server (local backend)
    //     const response = await fetch('http://localhost:3001/save-data', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(formData),
    //     });

    //     if (response.ok) {
    //       alert('Data successfully saved to Google Form!');
    //     } else {
    //       console.error('Error saving data:', response.status);
    //       alert('Failed to save data to Google Form.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Error connecting to the server.');
    //   }
    // };
    const handleSaveData = async () => {
        const sgstAndCgst = total * 0.025;
        const discountAmount = (total * discount) / 100;
        const totalPayable = total + sgstAndCgst * 2 - discountAmount;

        const formData = {
            clientName,
            invoiceNumber,  // Add the generated Invoice Number
            invoiceDate,    // Add the generated Invoice Date
            total: total.toFixed(2),
            sgst: sgstAndCgst.toFixed(2),
            cgst: sgstAndCgst.toFixed(2),
            discount: discountAmount.toFixed(2),
            totalPayable: totalPayable.toFixed(2),
            paymentSource,
        };

        try {
            // Send data to your Node.js server (local backend)
            const response = await fetch('http://localhost:3001/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Data successfully saved to Google Form!');
            } else {
                console.error('Error saving data:', response.status);
                alert('Failed to save data to Google Form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the server.');
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const sgstAndCgst = total * 0.025; // SGST and CGST are part of the total
        const discountAmount = (total * discount) / 100; // Calculate discount as percentage
        const totalPayable = total - discountAmount; // Total payable excludes SGST/CGST addition

        generatePDF(total, sgstAndCgst, discountAmount, totalPayable, paymentSource);
    };

    // const generatePDF = (total, sgstAndCgst, discount, totalPayable, paymentSource) => {
    //   const doc = new jsPDF();

    //   // Company Details
    //   doc.setFontSize(16);
    //   doc.setFont("helvetica", "bold");
    //   doc.text("BHIKHARILAL SITARAM", 105, 20, null, null, "center");

    //   doc.setFontSize(10);
    //   doc.setFont("helvetica", "normal");
    //   doc.text("26-B & C, GRANT STREET, KOLKATA - 700013", 105, 30, null, null, "center");
    //   doc.text("ESTD: 1916", 105, 35, null, null, "center");
    //   doc.text("PH.: 033-2228-5204", 105, 40, null, null, "center");
    //   doc.text("E-Mail: blsr.sr@gmail.com", 105, 45, null, null, "center");
    //   doc.text("GSTIN: 19AADFB2340K1ZL State: 19 West Bengal", 105, 50, null, null, "center");

    //   doc.setLineWidth(0.5);
    //   doc.line(10, 55, 200, 55);

    //   doc.text(`Customer: ${clientName}`, 10, 60);
    //   const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
    //   doc.text(`Invoice Number: ${invoiceNumber}`, 85, 60);
    //   const invoiceDate = new Date().toLocaleDateString();
    //   doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

    //   doc.autoTable({
    //       startY: 70,
    //       head: [["Item", "Quantity", "Rate", "Amount"]],
    //       body: items.map((item) => [item.description, item.quantity, item.rate, item.amount]),
    //       theme: "grid",
    //   });

    //   doc.line(10, doc.lastAutoTable.finalY + 10, 200, doc.lastAutoTable.finalY + 10);

    //   const spacing = 6;
    //   doc.text(`Total (Inclusive of SGST & CGST): Rs.${total.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);
    //   doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing);
    //   doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 2);
    //   doc.text(`Discount: Rs.${discount.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20 + spacing * 3);

    //   const totalPayableY = doc.lastAutoTable.finalY + 20 + spacing * 4 + 10;
    //   doc.setFillColor(240, 240, 240);
    //   doc.rect(10, totalPayableY - 5, 190, 10, "FD");
    //   doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, "center");

    //   const footerY = totalPayableY + 20;
    //   doc.text(`Payment Source: ${paymentSource}`, 10, footerY);
    //   doc.text("Authorized Signatory", 190, footerY, null, null, "right");

    //   const invoiceDateFormatted = new Date().toLocaleDateString().replace(/\//g, "-");
    //   const filename = `Invoice-${invoiceDateFormatted}-${clientName}-${invoiceNumber}.pdf`;
    //   doc.save(filename);
    //   window.open(doc.output("bloburl"), "_blank");
    // };

    const generatePDF = (total, sgstAndCgst, discount, totalPayable, paymentSource) => {
        const doc = new jsPDF();

        // Company Header
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

        // Line Break
        doc.setLineWidth(0.5);
        doc.line(10, 55, 200, 55);

        // Customer Details
        doc.text(`Customer: ${clientName}`, 10, 60);
        const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
        doc.text(`Invoice Number: ${invoiceNumber}`, 85, 60);
        const invoiceDate = new Date().toLocaleDateString();
        doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

        // Table for Items
        doc.autoTable({
            startY: 70, // Adjust this value if needed
            head: [["Item", "Quantity", "Rate", "Amount"]],
            body: items.map((item) => [item.description, item.quantity, item.rate, item.amount]),
            theme: "grid",
        });

        // Check the position after the table
        const lastY = doc.lastAutoTable.finalY + 10;

        // Summary Details
        const spacing = 6;
        doc.text(`Total (Inclusive of SGST & CGST): Rs.${total.toFixed(2)}`, 10, lastY);
        doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing);
        doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing * 2);
        doc.text(`Discount: Rs.${discount.toFixed(2)}`, 10, lastY + spacing * 3);

        // Total Payable Highlight
        const totalPayableY = lastY + spacing * 4 + 10;
        doc.setFillColor(240, 240, 240);
        doc.rect(10, totalPayableY - 5, 190, 10, "FD");
        doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, "center");

        // Footer
        const footerY = totalPayableY + 20;
        doc.text(`Payment Source: ${paymentSource}`, 10, footerY);
        doc.text("Authorized Signatory", 190, footerY, null, null, "right");

        // Save PDF
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
                                    placeholder="Amount"
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
                        {/* <p>Total Payable: ₹{(total + total * 0.025 * 2 - (total * discount / 100)).toFixed(2)}</p> */}
                        <p>Total Payable: ₹{(total - (total * discount / 100)).toFixed(2)}</p>

                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSaveData}
                    className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Save Data
                </button>

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
