global.owner = ['6285893892553']  
global.mods = ['6285893892553'] 
global.prems = ['6285893892553']
global.nameowner = 'Halfy'
global.numberowner = '6285893892553'
global.mail = 'support@halfy.eu.org' 
global.gc = '-'
global.instagram = 'https://instagram.com/halfi.69'
global.wm = 'Convert by Moe - Kazekura ‹𝟹'
global.wait = 'Punggung ojisan sudah terlalu tua untuk melakukan ini...'
global.eror = '_*Server Error*_'
global.stiker_wait = 'Stiker sedang dibuat...ᡣ𐭩'
global.packname = 'moe-kazekura 2.0'
global.author = '@halfi.69'
global.maxwarn = '3' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.lann = 'halfykontl' 
//Daftar terlebih dahulu https://api.betabotz.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'YOUR_APIKEY_HERE'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': 'halfykontl', 
  'https://api.botcahx.eu.org': 'APIKEY'
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
