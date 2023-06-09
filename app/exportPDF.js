const express = require('express');
const router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const sgMail = require('@sendgrid/mail')

async function exportTableToPdf(html, outputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to your HTML table
  await page.setContent(

    `
  <style>
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  #dati{
    display:flex;
    justify-content:space-between;
  }

  #datiAziendaSection{
    text-align:right;
  }
  
  .nameAzienda{
    display:none;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  td {
    color: #555;
  }
  
  #totaleOrdine {
    display: block;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
  
  a{
    text-decoration: none;
  }
  
  #buttons{
    display: flex;
    justify-content: space-between;
    margin:10px;
  }
  
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #73675C;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #5C534A;
  }
  
  .nameCatalogo{
    color: #de6800 !important;;
    font-style: italic;
  }
  </style>
  ${html}
`
  );

  // Generate the PDF with default options
  await page.pdf({ 
    path: outputFilePath,
    format: 'A4',
    margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm"
    }
  });

  // Close the browser
  await browser.close();
}


// GET generale
router.post('', async (req, res) => {
  var html = req.body.html;
  var outputFilePath = './exportedPDF/'+req.body.outputFilePath;

  exportTableToPdf(html, outputFilePath)
    .then(() => {
      console.log('PDF exported successfully!')

      attachment = fs.readFileSync(outputFilePath).toString("base64");

      var SGMailToken = req.app.get('SGMailToken');
      sgMail.setApiKey(SGMailToken);

      // Construct the email message
      const msg = {
        to: [req.body.email.azienda,req.body.email.ufficio, req.body.email.cliente, req.body.email.subagente], // Replace with the recipient's email address
        from: 'app.myorderspro@gmail.com', // Replace with your email address
        subject: 'PDF Attachment',
        text: 'Please find the attached PDF file.',
        attachments: [
          {
            filename: `riepilogo ordine `+req.body.outputFilePath,
            content: attachment,
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      // Send the email using SendGrid
      sgMail.send(msg)
        .then(() => {
          console.log('Email sent successfully');
          res.status(200).json({email:"ok"});
        })
        .catch(error => {
          console.error('Error sending email:', error);
        });
      
    })
    .catch((err) => console.error('Error exporting PDF:', err));
})

module.exports = router;
