const ms = require("ms");
const db = require("../database/database");
const f = require('./createID')

module.exports = async (member, guild, argent) => {
    const id = await f("thune")
  
   db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [guild, member], async (err, req) => {
    if(req.length < 1){
        db.query(`INSERT INTO money (guildID, memberID, money, id) VALUES (?, ?, ?, ?)`, [guild, member, argent, id])
    }else{
        db.query(`UPDATE money SET money = ? WHERE guildID = ? AND memberID = ?`,[parseInt(req[0].money) + parseInt(argent), guild, member])
    }
   })
}