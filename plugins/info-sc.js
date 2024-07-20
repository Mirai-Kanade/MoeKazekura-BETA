let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
Hai ${ye} Bot Ini Menggunakan Script :\n• https://github.com/HalfyZodiac/MoeKazekura-BETA

Original Base :\n• https://github.com/ERLANRAHMAT/BETABOTZ-MD2
Rest Api :\n• https://api.betabotz.eu.org
`
m.reply(esce)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(skr|ftb)$/i

module.exports = handler
