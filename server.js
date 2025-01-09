// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');  // Allow CORS requests

// const app = express();
// app.use(express.json());
// app.use(cors()); // Allow all origins or configure it to allow only your frontend

// const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse';

// app.post('/api/save-data', async (req, res) => {
//     console.log(req.body);
//     const {
//         clientName,
//         invoiceNumber,
//         invoiceDate,
//         total,
//         sgst,
//         cgst,
//         discount,
//         totalPayable,
//         paymentSource
//     } = req.body;

//     // const formData = new URLSearchParams();
//     // formData.append('entry.11395408', clientName);         // Customer Name
//     // formData.append('entry.1649696198', String(invoiceNumber));   // Invoice Number
//     // formData.append('entry.868797987', String(invoiceDate));      // Invoice Date

//     // formData.append('entry.253471962', total);            // Total
//     // formData.append('entry.473550820', sgst);             // SGST
//     // formData.append('entry.640404071', cgst);             // CGST
//     // formData.append('entry.1769481674', discount);        // Discount
//     // formData.append('entry.699173398', totalPayable);    // Total Payable
//     // formData.append('entry.584164247', paymentSource);    // Payment Source
//     // console.log(formData);  // Log formData to ensure values are correct

//     const formData = new URLSearchParams();
//     formData.append('entry.11395408', clientName);         // Customer Name
//     formData.append('entry.1649696198', invoiceNumber);    // Invoice Number
//     formData.append('entry.868797987', invoiceDate);       // Invoice Date
//     formData.append('entry.253471962', total);             // Total
//     formData.append('entry.473550820', sgst);              // SGST
//     formData.append('entry.640404071', cgst);              // CGST
//     formData.append('entry.1769481674', discount);         // Discount
//     formData.append('entry.699173398', totalPayable);      // Total Payable
//     formData.append('entry.584164247', paymentSource);     // Payment Source


//     try {


//         const response = await axios.post(formUrl, formData.toString(), {

//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         if (response.status === 200) {
//             res.status(200).json({ message: 'Data saved successfully!' });
//         } else {
//             res.status(500).json({ message: 'Failed to save data.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving data to Google Form.' });
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');  // Allow CORS requests

// const app = express();
// app.use(express.json());
// app.use(cors()); // Allow all origins or configure it to allow only your frontend

// const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse';

// app.post('/api/save-data', async (req, res) => {
//     console.log(req.body);
//     const {
//         clientName,
//         invoiceNumber,
//         invoiceDate,
//         total,
//         sgst,
//         cgst,
//         discount,
//         totalPayable,
//         paymentSource
//     } = req.body;

//     const formData = new URLSearchParams();
//     formData.append('entry.11395408', clientName);         // Customer Name
//     formData.append('entry.1649696198', invoiceNumber);    // Invoice Number
//     formData.append('entry.868797987', invoiceDate);       // Invoice Date
//     formData.append('entry.253471962', total);             // Total
//     formData.append('entry.473550820', sgst);              // SGST
//     formData.append('entry.640404071', cgst);              // CGST
//     formData.append('entry.1769481674', discount);         // Discount
//     formData.append('entry.699173398', totalPayable);      // Total Payable
//     formData.append('entry.584164247', paymentSource);     // Payment Source

//     try {
//         const response = await axios.post(formUrl, formData.toString(), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         if (response.status === 200) {
//             res.status(200).json({ message: 'Data saved successfully!' });
//         } else {
//             res.status(500).json({ message: 'Failed to save data.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving data to Google Form.' });
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow all origins or configure it to allow only your frontend

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse';

// app.post('/api/save-data', async (req, res) => {
//     console.log('Received data:', req.body);  // Log the received data

//     const {
//         clientName,
//         invoiceNumber,
//         invoiceDate,
//         total,
//         sgst,
//         cgst,
//         discount,
//         totalPayable,
//         paymentSource
//     } = req.body;

//     const formData = new URLSearchParams();
//     formData.append('entry.11395408', clientName);         // Customer Name
//     formData.append('entry.1649696198', invoiceNumber);    // Invoice Number
//     formData.append('entry.868797987', invoiceDate);       // Invoice Date
//     formData.append('entry.253471962', total);             // Total
//     formData.append('entry.473550820', sgst);              // SGST
//     formData.append('entry.640404071', cgst);              // CGST
//     formData.append('entry.1769481674', discount);         // Discount
//     formData.append('entry.699173398', totalPayable);      // Total Payable
//     formData.append('entry.584164247', paymentSource);     // Payment Source

//     try {
//         const response = await axios.post(formUrl, formData.toString(), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         if (response.status === 200) {
//             res.status(200).json({ message: 'Data saved successfully!' });
//         } else {
//             res.status(500).json({ message: 'Failed to save data.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving data to Google Form.' });
//     }
// });
app.post('/api/save-data', async (req, res) => {
    const {
        clientName,
        invoiceNumber,
        invoiceDate,
        total,
        sgst,
        cgst,
        discount,
        totalPayable,
        paymentSource
    } = req.body;

    console.log('Received data:', req.body);  // Log the received data

    // Use FormData to send data in the same way a browser form would
    const formData = new FormData();
    formData.append('entry.11395408', clientName);         // Customer Name
    formData.append('entry.1649696198', invoiceNumber);    // Invoice Number
    formData.append('entry.868797987', invoiceDate);       // Invoice Date
    formData.append('entry.253471962', total);             // Total
    formData.append('entry.473550820', sgst);              // SGST
    formData.append('entry.640404071', cgst);              // CGST
    formData.append('entry.1769481674', discount);         // Discount
    formData.append('entry.699173398', totalPayable);      // Total Payable
    formData.append('entry.584164247', paymentSource);     // Payment Source

    try {
        const response = await axios.post(formUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Use multipart/form-data for FormData
            }
        });

        if (response.status === 200) {
            res.status(200).json({ message: 'Data saved successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to save data.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving data to Google Form.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
