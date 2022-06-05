import Express from "express";
import multer from "multer";
import { config } from "dotenv";
import { dbInit } from "./utils/dbInit.js";

const { sequelize, Data } = dbInit();
const MULTER = multer();
const app = Express();

app.use(
	Express.urlencoded({
		extended: true,
	}),
);
app.use(Express.json());
app.use(MULTER.array());
app.use(Express.static("public"));

app.get("/", async (req, res) => {
	if (req.query.q) {
		const id = req.query.q;
		const url = await Data.findByPk(id);
		if (!url) return res.json({ error: `Redirect with ID "${id}" not found`, status: "404" }).status(404);

		return res
			.send(`<script>window.location.replace("${url.dataValues.url}")</script>`)
			.status(200);
	}
	res
		.status(200)
		.sendFile(`${process.cwd()}/main.htm`);
});

app.post("/api", async (req, res) => {
	const { url: toShort, auth: authorisation } = req.body;

	const sendError = (errorMessage, statCode, customHPMsg) => {
		res
			.status(statCode ?? 400)
			.send(
				`
<html>
	<style>
		body {
				background-color: #00aaaa;
				color: #FFFFFF;
				font-family: Verdana, Geneva, Tahoma, sans-serif;
		}
	</style>
	<body>
		<br><h3>${errorMessage}</h3>
		<a href="${process.env.MYURL}">${customHPMsg ?? "Back"}</a>
	</body>
</html>
`,
			);
	};

	// eslint-disable-next-line no-useless-escape
	if (!process.env.AUTH_KEYS.split(";").includes(authorisation)) return sendError(`Invalid authorisation \"${authorisation}\"`);
	const id = Math.trunc(Date.now() / 60_000);
	Data.create({
		id,
		url: toShort,
	});
	sendError(`Successfully shortened URL.\n\nYour shortened URL for "${toShort}" is: ${process.env.MYURL}?q=${id}`, 200, "Shorten another URL >>");
});

app.get("/assets/:file", (req, res) => {
	if (req.params.file.split("/").length > 1 || ([".env", "_assets"].includes(req.params.file))) return res.json({ message: "ACCESS_DENIED", status: "403" }).status(403);
	res.sendFile(`${process.cwd()}/${req.params.file}`);
});

app.get("/*", (req, res) => {
	res
		.status(404)
		.json({ error: "NOT_FOUND", status: "404" });
});

app.listen(1234, () => {
	console.log("server started on port # 1234");
});

config();