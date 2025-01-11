import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import axios from 'axios';

const InvoiceGenerator = () => {
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState([{ description: '', quantity: '', unit: '', rate: '', amount: '' }]);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [paymentSource, setPaymentSource] = useState('Cash'); // Added state for payment source

    const [focusedItemIndex, setFocusedItemIndex] = useState(null); // Track the focused item index
    const [filteredItems, setFilteredItems] = useState([]);

    // Hardcoded items for recommendations
    const hardcodedItems = ['Bath Towel', 'Hand Towel', 'Bed Sheet', 'Poplin', 'Rubia', 'Kurti', 'Kurti Set', 'Salwar Suit', 'Ready Made Shirt', 'Saree', 'Lehenga', 'Shirting', 'Suiting', 'Combo'];

    const [invoiceNumber, setInvoiceNumber] = useState(null); // Initialize as null to handle user input



    useEffect(() => {
        // Check if an invoice number exists in localStorage
        const storedInvoiceNumber = localStorage.getItem("invoiceNumber");
        if (storedInvoiceNumber) {
            setInvoiceNumber(parseInt(storedInvoiceNumber, 10)); // Load the last invoice number
        } else {
            // Prompt the user for the starting invoice number
            const userInput = prompt("Enter the starting invoice number:");
            const startingNumber = parseInt(userInput, 10);
            if (!isNaN(startingNumber) && startingNumber > 0) {
                setInvoiceNumber(startingNumber);
                localStorage.setItem("invoiceNumber", startingNumber); // Save it to localStorage
            } else {
                alert("Invalid input. Starting from 1.");
                setInvoiceNumber(1);
                localStorage.setItem("invoiceNumber", 1);
            }
        }
    }, []);




    const generateInvoice = () => {
        if (invoiceNumber !== null && invoiceNumber !== undefined) {
            // Proceed with invoice generation using the current invoice number
            alert(`Invoice INV-${invoiceNumber} generated!`); // Show the current invoice number

            // Save the current invoice number (before increment) to localStorage or your backend
            // handleSaveData(); // Ensure data is saved first

            // Generate the invoice only if invoiceNumber is valid
            if (invoiceNumber && !isNaN(invoiceNumber)) {
                generatePDF(); // Call the function to generate the invoice PDF
            } else {
                console.error("Invalid invoice number.");
                alert("Invalid invoice number.");
                return;
            }

            // Increment the invoice number after data is saved and invoice is generated
            const newInvoiceNumber = invoiceNumber + 1;

            // Update the state with the new invoice number
            setInvoiceNumber(newInvoiceNumber);

            // Save the new invoice number to localStorage
            localStorage.setItem("invoiceNumber", newInvoiceNumber);
            setClientName('');
            setItems([{ description: '', quantity: '', unit: '', rate: '', amount: '' }]);
            setTotal(0);
            setDiscount(0);
            setPaymentSource('Cash');
            setFilteredItems([]);
            setFocusedItemIndex(null);

            // Reload the page to reset all data
            window.location.reload();
        } else {
            console.error("Invoice number is not set.");
            alert("Invoice number is not set.");
        }
    };

    useEffect(() => {
        calculateTotal(items);
    }, [items]);

    const handleItemChange = (index, event) => {
        const updatedItems = [...items];
        const { name, value } = event.target;

        // Update the unit directly if it's the unit dropdown
        if (name === 'unit') {
            updatedItems[index][name] = value;
        } else {
            updatedItems[index][name] = name === 'quantity' || name === 'rate' ? parseFloat(value) : value;

            // Update filtered items based on user input in description
            if (name === 'description') {
                const matches = hardcodedItems.filter(item =>
                    item.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredItems(matches);
            }

            // Update the amount based on quantity * rate
            updatedItems[index].amount = parseFloat(
                (updatedItems[index].quantity * updatedItems[index].rate).toFixed(2)
            );
        }

        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const handleSelectSuggestion = (index, suggestion) => {
        const updatedItems = [...items];
        updatedItems[index].description = suggestion;

        setItems(updatedItems);
        setFilteredItems([]); // Clear recommendations after selection
        setFocusedItemIndex(null); // Reset the focused item index
    };


    const addItem = () => {
        setItems([...items, { description: '', quantity: '', rate: '', amount: '' }]);
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((item, idx) => idx !== index);
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const calculateTotal = (items) => {
        let newTotal = 0;
        items.forEach((item) => {
            newTotal += item.amount || 0;
        });
        setTotal(newTotal);
    };

    // const handleSaveData = async () => {
    //   const sgstAndCgst = total * 0.025;
    //   const discountAmount = (total * discount) / 100;
    //   const totalPayable = total - discountAmount;
    //   const invoiceDate = new Date().toLocaleDateString();
    //   const formUrl =
    //     'https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse';

    //   const formData = {
    //     'entry.11395408': clientName, // Customer Name
    //     'entry.1649696198': invoiceNumber, // Invoice Number
    //     'entry.868797987': invoiceDate, // Invoice Date
    //     'entry.253471962': total.toFixed(2), // Total
    //     'entry.473550820': sgstAndCgst.toFixed(2), // SGST
    //     'entry.640404071': sgstAndCgst.toFixed(2), // CGST
    //     'entry.1769481674': discountAmount.toFixed(2), // Discount
    //     'entry.699173398': totalPayable.toFixed(2), // Total Payable
    //     'entry.584164247': paymentSource, // Payment Source
    //   };

    //   try {
    //     const response = await axios.post(formUrl, null, { params: formData });
    //     if (response.status === 200) {
    //       alert('Data submitted successfully!');
    //     } else {
    //       alert('Failed to submit data. Please try again.');
    //     }
    //   } catch (error) {
    //     console.error('Error submitting data:', error);
    //     alert('Data submitted successfully!');
    //   }
    // };


    const handleSaveData = async () => {
        const sgstAndCgst = total * 0.025;
        const discountAmount = (total * discount) / 100;
        const totalPayable = total - discountAmount;
        const invoiceDate = new Date().toLocaleDateString();

        // Format the invoice number as INV-{invoiceNumber}
        const formattedInvoiceNumber = `INV-${invoiceNumber}`;

        const formUrl =
            'https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse';

        const formData = {
            'entry.11395408': clientName, // Customer Name
            'entry.1649696198': formattedInvoiceNumber, // Invoice Number (formatted as INV-{invoiceNumber})
            'entry.868797987': invoiceDate, // Invoice Date
            'entry.253471962': total.toFixed(2), // Total
            'entry.473550820': sgstAndCgst.toFixed(2), // SGST
            'entry.640404071': sgstAndCgst.toFixed(2), // CGST
            'entry.1769481674': discountAmount.toFixed(2), // Discount
            'entry.699173398': totalPayable.toFixed(2), // Total Payable
            'entry.584164247': paymentSource, // Payment Source
        };

        try {
            const response = await axios.post(formUrl, null, { params: formData });
            if (response.status === 200) {
                alert('Data submitted successfully!');
            } else {
                alert('Failed to submit data. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Data submitted successfully!');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const sgstAndCgst = total * 0.025; // SGST and CGST are part of the total
        // const discountAmount = (total * discount) / 100; // Calculate discount as percentage
        // const totalPayable = total - discountAmount; // Total payable excludes SGST/CGST addition

        generatePDF();
    };




    const generatePDF = async () => {
        try {
            // Calculate SGST, CGST, Discount, and Total Payable
            const sgstAndCgst = total * 0.025;
            const discountAmount = (total * discount) / 100;
            const totalPayable = total - discountAmount;

            // Format the invoice number and date
            const formattedInvoiceNumber = `INV-${invoiceNumber}`;
            const invoiceDate = new Date().toLocaleDateString();

            // Initialize jsPDF
            const doc = new jsPDF();

            // Company Header
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('BHIKHARILAL SITARAM', 105, 20, null, null, 'center');

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('26-B & C, GRANT STREET, KOLKATA - 700013', 105, 30, null, null, 'center');
            doc.text('ESTD: 1916', 105, 35, null, null, 'center');
            doc.text('PH.: 033-2228-5204', 105, 40, null, null, 'center');
            doc.text('E-Mail: blsr.sr@gmail.com', 105, 45, null, null, 'center');
            doc.text('GSTIN: 19AADFB2340K1ZL State: 19 West Bengal', 105, 50, null, null, 'center');

            // Line Break
            doc.setLineWidth(0.5);
            doc.line(10, 55, 200, 55);

            // Customer Details
            doc.text(`Customer: ${clientName}`, 10, 60);
            doc.text(`Invoice Number: ${formattedInvoiceNumber}`, 85, 60);
            doc.text(`Invoice Date: ${invoiceDate}`, 160, 60);

            // Table for Items
            doc.autoTable({
                startY: 70,
                head: [['Item', 'Quantity', 'Unit', 'Rate', 'Amount']],
                body: items.map((item) => [
                    item.description || '',
                    item.quantity || '',
                    item.unit || 'Piece',
                    item.rate.toFixed(2) || '',
                    item.amount.toFixed(2) || '',
                ]),
                theme: 'grid',
            });

            // Check the position after the table
            const lastY = doc.lastAutoTable.finalY + 10;

            // Summary Details
            const spacing = 6;
            doc.text(`Total (Inclusive of SGST & CGST): Rs.${total.toFixed(2)}`, 10, lastY);
            doc.text(`SGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing);
            doc.text(`CGST (2.5%): Rs.${sgstAndCgst.toFixed(2)}`, 10, lastY + spacing * 2);

            if (discount > 0) {
                doc.text(`Discount: Rs.${discountAmount.toFixed(2)}`, 10, lastY + spacing * 3);
            }

            // Total Payable Highlight
            const totalPayableY = lastY + (discount > 0 ? spacing * 4 : spacing * 3) + 10;
            doc.setFillColor(240, 240, 240);
            doc.rect(10, totalPayableY - 5, 190, 10, 'FD');
            doc.text(`Total Payable: Rs.${totalPayable.toFixed(2)}`, 105, totalPayableY, null, null, 'center');

            // Footer
            const footerY = totalPayableY + 20;
            doc.text(`Payment Source: ${paymentSource}`, 10, footerY);
            doc.text('Authorized Signatory', 190, footerY, null, null, 'right');

            const footerYY = totalPayableY + 30;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('1) Goods once sold cannot be taken back or exchanged.', 10, footerYY);
            doc.text('2) No guarantee for Colour & Silver / Gold Print.', 10, footerYY + 5);
            doc.text('3) DRY Clean only', 10, footerYY + 10);

            // "Thank You for shopping" text centered at the bottom
            const thankYouY = footerYY + 20; // Position for the "Thank You" text
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Thank you for shopping with us!', 105, thankYouY, null, null, 'center');

            // Save PDF
            const invoiceDateFormatted = new Date().toLocaleDateString().replace(/\//g, '-');
            const filename = `Invoice-${invoiceDateFormatted}-${clientName}-${invoiceNumber}.pdf`;
            doc.save(filename);

            // Open the generated PDF in a new tab
            window.open(doc.output('bloburl'), '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please check your data and try again.');
        }
    };




    const handleClick = () => {
        generateInvoice(); // Generate the invoice
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-center mb-2">Billing Software</h2>

            <h2 className='text-l font-semibold text-center mb-2'>Current invoice number is: INV-{invoiceNumber}</h2>
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
                            <div className="w-1/2 relative">
                                <input
                                    type="text"
                                    name="description"
                                    value={item.description}
                                    onFocus={() => setFocusedItemIndex(index)} // Set focus index on focus
                                    onChange={(e) => handleItemChange(index, e)}
                                    placeholder="Description"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                {focusedItemIndex === index && filteredItems.length > 0 && (
                                    <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full">
                                        {filteredItems.map((filteredItem, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => handleSelectSuggestion(index, filteredItem)}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {filteredItem}
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                                <select
                                    name="unit"
                                    value={item.unit || ''}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="" disabled>
                                        Select Unit </option>
                                    <option value="Piece">Pieces</option>
                                    <option value="Metre">Metre</option>
                                </select>
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
                                className="text-red-500 px-2 py-1 bg-gray-100 rounded-md">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addItem}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="paymentSource" className="block text-sm font-medium text-gray-700">Payment Source</label>
                            <select
                                id="paymentSource"
                                value={paymentSource}
                                onChange={(e) => setPaymentSource(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
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
                        <p>Total Payable: ₹{(total - (total * discount / 100)).toFixed(2)}</p>

                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSaveData}

                    className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Save Data
                </button>


                <button
                    type="submit"
                    className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={handleClick}
                >
                    Generate Invoice
                </button>

            </form>

            <p className="mt-10 text-xs text-center mb -4">This software is created by o1 Solutions Pvt. Ltd.</p>

        </div>

    );

};

export default InvoiceGenerator;
