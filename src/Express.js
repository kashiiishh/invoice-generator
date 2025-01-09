// // const express = require('express');
// // const { exec } = require('child_process');
// // const app = express();

// // app.use(express.json());

// // app.post('/api/save-data', (req, res) => {
// //     const { clientName, total, sgst, cgst, discount, totalPayable, paymentSource } = req.body;

// //     const script = `python src/form.py "${clientName}" "${total}" "${sgst}" "${cgst}" "${discount}" "${totalPayable}" "${paymentSource}"`;

// //     exec(script, (error, stdout, stderr) => {
// //         if (error) {
// //             console.error(`Error executing script: ${stderr}`);
// //             return res.status(500).json({ error: 'Failed to save data' });
// //         }
// //         console.log(`Script output: ${stdout}`);
// //         res.status(200).json({ message: 'Data saved successfully' });
// //     });
// // });

// // app.listen(3001, () => {
// //     console.log('Server running on port 3001');
// // });

// const express = require('express');
// const { exec } = require('child_process');
// const app = express();

// app.use(express.json());

// app.post('/api/save-data', (req, res) => {
//     const { clientName, invoiceNumber, invoiceDate, total, sgst, cgst, discount, totalPayable, paymentSource } = req.body;

//     // Update the Python script call to include invoiceDate and invoiceNumber
//     const script = `python src/form.py "${clientName}" "${invoiceNumber}" "${invoiceDate}" "${total}" "${sgst}" "${cgst}" "${discount}" "${totalPayable}" "${paymentSource}"`;

//     exec(script, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing script: ${stderr}`);
//             return res.status(500).json({ error: 'Failed to save data' });
//         }
//         console.log(`Script output: ${stdout}`);
//         res.status(200).json({ message: 'Data saved successfully' });
//     });
// });

// app.listen(3001, () => {
//     console.log('Server running on port 3001');
// });

const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/api/save-data', (req, res) => {
    const { clientName, invoiceNumber, invoiceDate, total, sgst, cgst, discount, totalPayable, paymentSource } = req.body;

    // Update the Python script call to include invoiceDate and invoiceNumber
    const script = `python src/form.py "${clientName}" "${invoiceNumber}" "${invoiceDate}" "${total}" "${sgst}" "${cgst}" "${discount}" "${totalPayable}" "${paymentSource}"`;

    exec(script, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${stderr}`);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        console.log(`Script output: ${stdout}`);
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
