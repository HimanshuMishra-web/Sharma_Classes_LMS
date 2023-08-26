const whatsAppRouter = require("../../routes/whatsAppRouter");
const {Client, LocalAuth} = require('whatsapp-web.js');
const QRCode = require('qrcode')

const handler = (req, res) => {
    const client = new Client({
        authStrategy:new LocalAuth()
    });
    // client.on('authenticated', (session) => {
    //     // Save the session object however you prefer.
    //     console.log(session,"session")
    //     // Convert it to json, save it to a file, store it in a database...
    // });

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        QRCode.toDataURL(qr, function (err, url) {
            res.json(url)
        })
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();

}

whatsAppRouter.get("/generate-qr", handler)