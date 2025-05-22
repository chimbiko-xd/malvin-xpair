const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Chris_Gaaju,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function CHRISM_XD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Chris_Gaaju = Chris_Gaaju({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Chris_Gaaju.ev.on('creds.update', saveCreds)
			Qr_Code_By_Chris_Gaaju.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Chris_Gaaju.sendMessage(Qr_Code_By_Chris_Gaaju.user.id, { text: '' + b64data });
	
				   let CHRIS_GAAJU_TEXT = `
CHRISM-XD V3 Sucess Scan Session 

> Bot repo: Https://GitHub.com/Chimbiko-xd/CHRISM-XD 

> Owner: *Chris Gaaju*

> BotName: *CHRISM XD* 



*Follow support for updates*
https://whatsapp.com/channel/0029Vb5qc6N2Jl8E3EcVBv0t


> _Regards Chris Gaaju_ `
	 await Qr_Code_By_Chris_Gaaju.sendMessage(Qr_Code_By_Malvin_Tech.user.id,{text:CHRIS_GAAJU_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Chris_Gaaju.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					CHRISM_XD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await CHRISM_XD_QR_CODE()
});
module.exports = router
