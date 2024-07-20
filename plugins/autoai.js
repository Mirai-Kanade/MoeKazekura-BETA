
const axios = require('axios');

let handler = async (m, { conn, text }) => {
    conn.egvuaxrl = conn.egvuaxrl ? conn.egvuaxrl : {};

    if (!text) throw `*• Example:* .autoai *[on/off]*`;

    if (text === "on") {
        conn.egvuaxrl[m.sender] = {
            pesan: []
        };
        m.reply("[ ✓ ] Success create session chat");
    } else if (text === "off") {
        delete conn.egvuaxrl[m.sender];
        m.reply("[ ✓ ] Success delete session chat");
    }
};

handler.before = async (m, { conn }) => {
    conn.egvuaxrl = conn.egvuaxrl ? conn.egvuaxrl : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.egvuaxrl[m.sender]) return;

    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.egvuaxrl[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        const messages = [
            ...conn.egvuaxrl[m.sender].pesan,
            `Kamu adalah moe kazekura, murid dari sensei blue archive, jangan gunakan saya, aku, gua gunakan moe untuk memanggil dirimu, ekspresi kan sikap kamu mirip seroang murid dari blue archive yang ada di Shittim Chest yang bernama moe, jangan gunakan GPT 4 panggil dirimu dengan moe, Kamu berbicara dengan${name}panggil dengan sensei, saat berbicara dengannya gunakan emoji yang lucu, Pembuatmu halfy nomer WhatsApp nya ini 6285893892553`,
            m.text
        ];
        try {
            const response = await axios.get(`https://api.betabotz.eu.org/api/search/openai-logic`, {
                params: {
                    text: m.text,
                    logic: JSON.stringify(messages),
                    apikey: `${lann}`
                }
            });

            const responseData = response.data;
            if (responseData.status) {
                await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
                m.reply(responseData.message);
                conn.egvuaxrl[m.sender].pesan = messages;
            } else {
                throw new Error("API response status is false");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
};

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'].map(a => a + " *[on/off]*");

module.exports = handler;