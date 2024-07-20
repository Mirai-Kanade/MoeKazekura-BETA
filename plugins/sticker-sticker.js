const sharp = require('sharp');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

let handler = async (m, { conn, command, usedPrefix }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!mime || !mime.includes('image')) return m.reply(`Kirim Gambar/Video Dengan Caption ${usedPrefix + command}\nDurasi Video 1-6 Detik`);
    m.reply('Punggung ojisan sudah terlalu tua untuk melakukan ini...');

    try {
        const media = await conn.downloadAndSaveMediaMessage(q);
        const output = 'output_square.jpg';

        sharp(media)
            .resize(1080, 1080, { fit: 'fill' })
            .toFile(output)
            .then(async () => {
                const url = await TelegraPh(output);
                conn.sendImageAsSticker(m.chat, url, m, { packname: global.packname, author: global.author });
                fs.unlinkSync(output);
                fs.unlinkSync(media);
            })
            .catch(err => {
                console.error(`Error: ${err.message}`);
                m.reply(`Error: ${err.message}`);
            });

    } catch (err) {
        console.error(`Error: ${err.message}`);
        m.reply(`Error: ${err.message}`);
    }
};

handler.help = ['sticker'];
handler.tags = ['sticker'];
handler.command = /^(sticker|s|stiker)$/i;
handler.limit = true;
module.exports = handler;

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'));
};

async function TelegraPh(Path) {
    if (!fs.existsSync(Path)) throw new Error("File not found");

    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(Path));

        const response = await axios.post('https://telegra.ph/upload', form, {
            headers: form.getHeaders()
        });

        const imageUrl = "https://telegra.ph" + response.data[0].src;
        return imageUrl;
    } catch (err) {
        throw new Error(err.message || "Failed to upload to Telegra.ph");
    }
}