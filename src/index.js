import { createRequire } from 'node:module';

import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';

const require = createRequire(import.meta.url);
const { LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  authStrategy: new LocalAuth(),
});

client.once('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('message_create', (message) => {
  if (message.body === '/hello') {
    message.reply('world');
  }
});

client.initialize();
