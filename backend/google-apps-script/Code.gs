/**
 * Deploy as a web app (execute as you, accessible to anyone). Configure these Script Properties:
 * SHEET_ID, MEDIA_FOLDER_ID, ADMIN_EMAIL, ADMIN_PASSWORD
 */
const HEADERS = ["id", "type", "status", "createdAt", "data"];
const MEDIA_HEADERS = [
	"id",
	"kind",
	"title",
	"category",
	"url",
	"thumbnailUrl",
	"youtubeId",
	"createdAt",
	"driveId",
	"thumbnailDriveId",
];
const MAX_MEDIA_BYTES = 8 * 1024 * 1024;

function doPost(event) {
	try {
		const body = JSON.parse(event.postData.contents || "{}");
		if (body.action === "submit") return json(submit(body));
		if (body.action === "login") return json(login(body));
		if (body.action === "status") return json(updateStatus(body));
		if (body.action === "mediaAdd") return json(addMedia(body));
		if (body.action === "mediaDelete") return json(deleteMedia(body));
		return json({ ok: false, error: "Unknown action" }, 400);
	} catch (error) {
		return json({ ok: false, error: error.message }, 400);
	}
}

function doGet(event) {
	try {
		const params = event.parameter || {};
		if (params.action === "list") return json(list(params.token));
		if (params.action === "mediaList") return json(listMedia());
		return json({ ok: false, error: "Unknown action" }, 400);
	} catch (error) {
		return json({ ok: false, error: error.message }, 401);
	}
}

function submit(body) {
	if (!["registration", "trial", "contact"].includes(body.type)) throw new Error("Invalid form type");
	if (!body.data || typeof body.data !== "object") throw new Error("Missing form data");
	const id = Utilities.getUuid();
	getSheet().appendRow([id, body.type, "new", new Date().toISOString(), JSON.stringify(body.data)]);
	return { ok: true, data: { id: id } };
}

function login(body) {
	const properties = PropertiesService.getScriptProperties();
	const email = String(body.email || "").trim();
	const configuredEmail = String(properties.getProperty("ADMIN_EMAIL") || "").trim();
	if (email !== configuredEmail || body.password !== properties.getProperty("ADMIN_PASSWORD")) throw new Error("Invalid admin credentials");
	const token = Utilities.getUuid();
	CacheService.getScriptCache().put("admin:" + token, "1", 21600);
	return { ok: true, data: { token: token } };
}

function list(token) {
	requireAdmin(token);
	return { ok: true, data: getSheet().getDataRange().getValues().slice(1).map(function (row) {
		return { id: row[0], type: row[1], status: row[2], createdAt: row[3], data: JSON.parse(row[4] || "{}") };
	}) };
}

function updateStatus(body) {
	requireAdmin(body.token);
	if (!["new", "contacted", "confirmed", "rejected"].includes(body.status)) throw new Error("Invalid submission status");
	const sheet = getSheet();
	const rows = sheet.getDataRange().getValues();
	const rowIndex = rows.findIndex(function (row) { return row[0] === body.id; });
	if (rowIndex < 1) throw new Error("Submission not found");
	sheet.getRange(rowIndex + 1, 3).setValue(body.status);
	return { ok: true, data: { id: body.id, status: body.status } };
}

function addMedia(body) {
	requireAdmin(body.token);
	if (!["image", "poster", "video"].includes(body.kind)) throw new Error("Invalid media type");
	if (!body.title || !body.category) throw new Error("Title and category are required");
	const media = { id: Utilities.getUuid(), kind: body.kind, title: String(body.title).trim(), category: String(body.category).trim(), url: "", thumbnailUrl: "", youtubeId: body.youtubeId ? normalizeYoutubeId(body.youtubeId) : "", createdAt: new Date().toISOString(), driveId: "", thumbnailDriveId: "" };
	if (body.kind === "video") {
		if (!media.youtubeId && !body.file) throw new Error("YouTube link or video file is required");
		if (media.youtubeId) media.url = "https://www.youtube.com/watch?v=" + media.youtubeId;
		if (body.file) { const file = saveMediaFile(body.file, media.title); media.driveId = file.id; media.url = file.url; }
		if (body.thumbnail) { const thumbnail = saveMediaFile(body.thumbnail, media.title + " thumbnail"); media.thumbnailDriveId = thumbnail.id; media.thumbnailUrl = thumbnail.url; }
	} else {
		if (!body.file) throw new Error("An image or poster file is required");
		const file = saveMediaFile(body.file, media.title); media.driveId = file.id; media.url = file.url; media.thumbnailUrl = file.url;
	}
	getMediaSheet().appendRow([media.id, media.kind, media.title, media.category, media.url, media.thumbnailUrl, media.youtubeId, media.createdAt, media.driveId, media.thumbnailDriveId]);
	return { ok: true, data: publicMedia(media) };
}

function listMedia() {
	return { ok: true, data: getMediaSheet().getDataRange().getValues().slice(1).map(function (row) {
		return publicMedia({ id: row[0], kind: row[1], title: row[2], category: row[3], url: row[4], thumbnailUrl: row[5], youtubeId: row[6], createdAt: row[7], driveId: row[8], thumbnailDriveId: row[9] });
	}) };
}

function deleteMedia(body) {
	requireAdmin(body.token);
	const sheet = getMediaSheet();
	const values = sheet.getDataRange().getValues();
	const rowIndex = values.findIndex(function (row) { return row[0] === body.id; });
	if (rowIndex < 1) throw new Error("Media item not found");
	trashDriveFile(values[rowIndex][8]); trashDriveFile(values[rowIndex][9]); sheet.deleteRow(rowIndex + 1);
	return { ok: true, data: { id: body.id } };
}

function saveMediaFile(input, title) {
	if (!input.base64 || !input.mimeType || !input.name) throw new Error("Invalid media file");
	const bytes = Utilities.base64Decode(input.base64);
	if (bytes.length > MAX_MEDIA_BYTES) throw new Error("Media files must be 8 MB or smaller");
	const file = getMediaFolder().createFile(Utilities.newBlob(bytes, input.mimeType, input.name)).setName(title + " - " + input.name);
	file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
	return { id: file.getId(), url: "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1600" };
}

function publicMedia(media) {
	const fileUrl = media.driveId ? "https://drive.google.com/thumbnail?id=" + media.driveId + "&sz=w1600" : media.url;
	const thumbnailUrl = media.thumbnailDriveId ? "https://drive.google.com/thumbnail?id=" + media.thumbnailDriveId + "&sz=w1600" : (media.thumbnailUrl || (media.kind === "video" && media.youtubeId ? "https://i.ytimg.com/vi/" + media.youtubeId + "/hqdefault.jpg" : ""));
	return { id: media.id, kind: media.kind, title: media.title, category: media.category, url: fileUrl, thumbnailUrl: thumbnailUrl, youtubeId: media.youtubeId, createdAt: media.createdAt };
}

function normalizeYoutubeId(value) {
	const input = String(value).trim();
	const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
	return match ? match[1] : input;
}

function trashDriveFile(id) { if (id) DriveApp.getFileById(id).setTrashed(true); }
function requireAdmin(token) { if (!token || CacheService.getScriptCache().get("admin:" + token) !== "1") throw new Error("Admin login required"); }

function getSheet() {
	const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
	if (!id) throw new Error("SHEET_ID is not configured");
	let spreadsheet;
	try { spreadsheet = SpreadsheetApp.openById(id.trim()); } catch (error) { throw new Error("Invalid SHEET_ID. Use the ID from https://docs.google.com/spreadsheets/d/SHEET_ID/edit, not an Apps Script library or Web App ID."); }
	let sheet = spreadsheet.getSheetByName("Submissions");
	if (!sheet) sheet = spreadsheet.insertSheet("Submissions");
	if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
	return sheet;
}

function getMediaSheet() {
	const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
	if (!id) throw new Error("SHEET_ID is not configured");
	const spreadsheet = SpreadsheetApp.openById(id.trim());
	let sheet = spreadsheet.getSheetByName("Media");
	if (!sheet) sheet = spreadsheet.insertSheet("Media");
	if (sheet.getLastRow() === 0) sheet.appendRow(MEDIA_HEADERS);
	return sheet;
}

function getMediaFolder() {
	const folderId = PropertiesService.getScriptProperties().getProperty("MEDIA_FOLDER_ID");
	if (!folderId || !folderId.trim()) throw new Error("MEDIA_FOLDER_ID is not configured");
	try { return DriveApp.getFolderById(folderId.trim()); } catch (error) { throw new Error("Invalid MEDIA_FOLDER_ID. Use the ID from the media folder URL."); }
}

// Run this once from the Apps Script editor to grant Spreadsheet and Drive access.
function authorizeServices() {
	const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
	if (!sheetId) throw new Error("SHEET_ID is not configured");
	SpreadsheetApp.openById(sheetId.trim()).getName();
	getMediaFolder().getName();
}

function json(value, status) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }