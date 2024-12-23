// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU09QSG02dUtNMnV1bjFwbFNiTkxnakFhU2QySUd5UXE4ZFpCUzBVdytFaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUll2UkxMUG94UkcwNjB0NklmbXI3b0FydWtvMjZmTGc4RURZajdiZElGdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBT0dyamtPYWxaVThkdm41ZUFYN2REZVhzMWlsRGJBY1BUR2JoZGpITDJFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSlJUdWVzSFRRKytXdy9LQWhJWU9ZNldia1I5eEdCRHN2anNlZzBmdUh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdCTmRoVGh0Z0xoSExtSTNuaUxMcms1WEpKTEtRaDlOZi9jMXpmbXZ3bjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNNSVUrQmFMOWVSQWNXQk9OSG95Zkl2VkY4WHFkSHVwdzRVdXZXRllOQVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0F2SDJ6L2Urb2pPT09xV2M1MWRIQWs2dEtRbHlXaFBwb01HaHlpSEtHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialRoY05Rc0RkS1RLOGNPUXBrNnoyUFlWMnArUkNWS0MxRXRiQ2xydlJVRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZWMFJTYkRaMC9ZaG1iaHFzNDkxdnRXenM2WmRjWFlFbGlaTjNYemlIZFllSE5ySjAwbFVHb0ZFR3VaZmdsTzUydHlNVWUrOHFFa25hNTlWZTR0RGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6IkdXMzlLKzN1Q3ZRcExvd2p4bStHV1dMSTdnS20vdXN6eTBZTTVqQU1QNTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ino1Sl9yMUxOU2dTdHBNMDBObDRiVHciLCJwaG9uZUlkIjoiNTI4ODY1MGYtYjA5Ni00OGFmLTg4ZGEtM2UyNTE5ZTYyNDc2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhBWUs4cVNBQjhLSE80N21wRUNpVFZxYWExbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4R0VFY1U2SitHSG5iekhaV1hkOE5NeDBTRlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjFNWENCVkciLCJtZSI6eyJpZCI6IjIzMzU0ODA2NDE2ODo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLNmlzellRdXZlbXV3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJrdVJYWGlidFFWZnV6LytLVUUwaFNLVVpUQTl2Q2lSTmFoYlE4UTNWK0JzPSIsImFjY291bnRTaWduYXR1cmUiOiI5TEFQSTNxWkRBcFVVS2tGMm1tZit4L3YzbVdXakVQV3A3U3FWWXh2ZkNkNG4rWG1pRmRIZ1UzVlFCbXNsYXdXZkFMSmNiZmV4M3BJdEpiL2EybE5DQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWnk0MzJIVmRCOWk2UFZGeGg5enhIbVV3V0YzOVM0SmVkdGVTTjZqVktpYUJlVWt2Q3VTV2RzdmQvR2ZFRXZyMktwUVJPb3ZGNmNCcGlYOExPV3RUaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NDgwNjQxNjg6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaTGtWMTRtN1VGWDdzLy9pbEJOSVVpbEdVd1Bid29rVFdvVzBQRU4xZmdiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0OTgyNTk5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhxayJ9",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY !== undefined ? process.env.AUTO_STATUS_REPLY === 'true' : true,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || '',
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤͟͞★⃝ꪶ‎Cal_me_saint🇦🇷🇺🇲𖥘✪͜͡➺",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "233548064168",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
