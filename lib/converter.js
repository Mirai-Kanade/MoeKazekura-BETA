const sharp = require('sharp');
 const { TelegraPh } = require('./lib/uploader');
 const fs = require('fs');

let handler = async (m, { conn, command, usedPrefix }) => {
const q = m.quoted ? m.quoted : m;
 const mime = (q.msg || q).mimetype || '';
 if (!mime || !mime.includes('image')) return m.reply(`Mana gambarnya bang?`);
 m.reply(mess.wait);
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
    }
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
handler.limit = true
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve({ data: await fs.promises.readFile(out), filename: out })
            // await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
  ], ext, 'ogg')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
}