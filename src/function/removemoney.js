const ms = require("ms");
const db = require("../database/database");
const f = require('./createID')

module.exports = async (member, guild, argent) => {
  
   db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [guild, member], async (err, req) => {
        const argent1 = req[0].money - argent
        db.query(`UPDATE money SET money = ? WHERE guildID = ? AND memberID = ?`,[argent1, guild, member])
   })
}