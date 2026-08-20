export type SubmissionType = "registration" | "trial" | "contact";

export type Submission = {
  id: string;
  type: SubmissionType;
  status: "new" | "contacted" | "confirmed" | "rejected";
  createdAt: string;
  data: Record<string, string | number>;
};

export type SubmissionInput = { type: SubmissionType; data: Record<string, string | number> };
export type MediaKind = "image" | "poster" | "video";
export type MediaItem = { id: string; kind: MediaKind; title: string; category: string; url: string; thumbnailUrl: string; youtubeId: string; createdAt: string };
export type MediaInput = { kind: MediaKind; title: string; category: string; file?: { name: string; mimeType: string; base64: string }; youtubeId?: string; thumbnail?: { name: string; mimeType: string; base64: string } };
type ApiResponse<T> = { ok: boolean; data?: T; error?: string };
const formsApiUrl = import.meta.env["VITE_FORMS_API_URL"] as string | undefined;
function requireApiUrl() { if (!formsApiUrl) throw new Error("Forms backend is not configured. Set VITE_FORMS_API_URL."); if (formsApiUrl.includes("/macros/library/")) throw new Error("VITE_FORMS_API_URL is an Apps Script library URL. Use the deployed Web app URL ending in /macros/s/.../exec."); return formsApiUrl; }
async function readResponse<T>(response: Response): Promise<T> { const body = await response.text(); let result: ApiResponse<T>; try { result = JSON.parse(body) as ApiResponse<T>; } catch { throw new Error(`Apps Script returned a non-JSON response (HTTP ${response.status}). Check that the Web App deployment is accessible to anyone and that the URL ends in /exec.`); } if (!response.ok || !result.ok || result.data === undefined) throw new Error(result.error ?? "The request could not be completed."); return result.data; }
export async function submitSubmission(input: SubmissionInput) { const response = await fetch(requireApiUrl(), { method: "POST", headers: { "content-type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "submit", ...input }) }); return readResponse<{ id: string }>(response); }
export async function adminLogin(email: string, password: string) { const response = await fetch(requireApiUrl(), { method: "POST", headers: { "content-type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "login", email, password }) }); return readResponse<{ token: string }>(response); }
export async function getSubmissions(token: string) { const url = new URL(requireApiUrl()); url.searchParams.set("action", "list"); url.searchParams.set("token", token); return readResponse<Submission[]>(await fetch(url)); }
export async function updateSubmissionStatus(token: string, id: string, status: Submission["status"]) { const response = await fetch(requireApiUrl(), { method: "POST", headers: { "content-type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "status", token, id, status }) }); return readResponse<{ id: string; status: Submission["status"] }>(response); }
export async function getMedia(_token?: string) { const url = new URL(requireApiUrl()); url.searchParams.set("action", "mediaList"); url.searchParams.set("_", String(Date.now())); return readResponse<MediaItem[]>(await fetch(url, { cache: "no-store" })); }
export async function addMedia(token: string, input: MediaInput) { const response = await fetch(requireApiUrl(), { method: "POST", headers: { "content-type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "mediaAdd", token, ...input }) }); return readResponse<MediaItem>(response); }
export async function deleteMedia(token: string, id: string) { const response = await fetch(requireApiUrl(), { method: "POST", headers: { "content-type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "mediaDelete", token, id }) }); return readResponse<{ id: string }>(response); }
