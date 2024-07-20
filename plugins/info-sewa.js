let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
    let buffer = await fetch(`https://telegra.ph/file/7f53ad8450db48cbe4272.jpg`).then(res => res.buffer())
    conn.sendFile(m.chat, buffer, 'hasil.jpg', `*• Info Donate & Sewa Bot*\n\nDANA: 085607588713\nPulsa (Indosat): 085893892553\nJika sudah melakukan pembayaran silahkam kirim bukti transfer kalian ke *.owner*, Terimakasih untuk yang sudah ber-donasi :), Semoga rejeki kalian bertambah berlipat lipat <3.\n\nUntuk sewa bot bisa cek katalog profile bot, Pricelist & benefit ada di katalog, Terimakasih :)\n\n> Rosemary-waBOT | © Regina Agustin`, m)
}

handler.help = handler.command = ['donasi','donate','sewa','sewabot','belibot']
handler.tags = ['main']
module.exports = handler
