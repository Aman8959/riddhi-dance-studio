import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, LogOut, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addMedia, adminLogin, deleteMedia, getMedia, getSubmissions, type MediaInput, type MediaItem, type Submission, updateSubmissionStatus } from "@/lib/submissions";

export const Route = createFileRoute("/admin")({ head: () => ({ meta: [{ title: "Admin Dashboard — Riddhi Dance Studio" }] }), component: AdminPage });
const tokenKey = "riddhi-admin-token";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(tokenKey);
    if (saved) { setToken(saved); void load(saved); }
  }, []);

  async function load(activeToken: string) {
    setLoading(true);
    try { const [nextSubmissions, nextMedia] = await Promise.all([getSubmissions(activeToken), getMedia(activeToken)]); setSubmissions(nextSubmissions); setMedia(nextMedia); }
    catch (error) { window.localStorage.removeItem(tokenKey); setToken(null); toast.error(error instanceof Error ? error.message : "Could not load dashboard."); }
    finally { setLoading(false); }
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    try { const result = await adminLogin(email.trim(), password); window.localStorage.setItem(tokenKey, result.token); setToken(result.token); setPassword(""); await load(result.token); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Login failed."); }
    finally { setLoading(false); }
  }

  if (!token) return <section className="section-pad mx-auto flex min-h-[70vh] max-w-md items-center px-4"><form onSubmit={login} className="glass-panel grid w-full gap-5 rounded-3xl p-8"><ShieldCheck className="size-8 text-primary" /><h1 className="font-display text-4xl uppercase">Admin login</h1><div><Label htmlFor="admin-email">Email</Label><Input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><Button type="submit" variant="hero" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button></form></section>;
  return <Dashboard token={token} submissions={submissions} media={media} loading={loading} onRefresh={() => void load(token)} onLogout={() => { window.localStorage.removeItem(tokenKey); setToken(null); }} onSubmissionsChange={setSubmissions} onMediaChange={setMedia} />;
}

function Dashboard({ token, submissions, media, loading, onRefresh, onLogout, onSubmissionsChange, onMediaChange }: { token: string; submissions: Submission[]; media: MediaItem[]; loading: boolean; onRefresh: () => void; onLogout: () => void; onSubmissionsChange: (items: Submission[]) => void; onMediaChange: (items: MediaItem[]) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => submissions.filter((item) => (filter === "all" || item.type === filter) && (!query || JSON.stringify(item.data).toLowerCase().includes(query.toLowerCase()))), [filter, query, submissions]);
  async function status(id: string, value: Submission["status"]) { try { await updateSubmissionStatus(token, id, value); onSubmissionsChange(submissions.map((item) => item.id === id ? { ...item, status: value } : item)); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not update status."); } }
  return <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-gold">Studio operations</p><h1 className="mt-2 font-display text-5xl uppercase">Admin dashboard</h1></div><div className="flex gap-2"><Button variant="glass" onClick={onRefresh} disabled={loading}><RefreshCw className="size-4" /> Refresh</Button><Button variant="glass" onClick={onLogout}><LogOut className="size-4" /> Log out</Button></div></div><MediaManager token={token} media={media} onMediaChange={onMediaChange} /><div className="mt-8 flex gap-3"><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search requests" className="max-w-sm" /><select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-md border border-input bg-card px-3"><option value="all">All</option><option value="registration">Registrations</option><option value="trial">Trials</option><option value="contact">Messages</option></select></div><div className="mt-5 overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[700px] text-left text-sm"><thead><tr><th className="p-4">Request</th><th className="p-4">Details</th><th className="p-4">Received</th><th className="p-4">Status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-t border-border"><td className="p-4 capitalize">{item.type}</td><td className="p-4">{Object.entries(item.data).slice(0, 4).map(([key, value]) => <div key={key}><span className="text-muted-foreground">{key}: </span>{String(value)}</div>)}</td><td className="p-4">{new Date(item.createdAt).toLocaleString()}</td><td className="p-4"><select value={item.status} onChange={(event) => void status(item.id, event.target.value as Submission["status"])} className="rounded-md border border-input bg-card px-2 py-1"><option>new</option><option>contacted</option><option>confirmed</option><option>rejected</option></select></td></tr>)}</tbody></table></div></section>;
}

function MediaManager({ token, media, onMediaChange }: { token: string; media: MediaItem[]; onMediaChange: (items: MediaItem[]) => void }) {
  const [kind, setKind] = useState<MediaInput["kind"]>("image"); const [title, setTitle] = useState(""); const [category, setCategory] = useState("Classes"); const [youtubeId, setYoutubeId] = useState(""); const [file, setFile] = useState<File | null>(null); const [thumbnail, setThumbnail] = useState<File | null>(null); const [saving, setSaving] = useState(false);
  async function payload(value: File | null) { if (!value) return undefined; if (value.size > 8 * 1024 * 1024) throw new Error("Files must be 8 MB or smaller."); return new Promise<{ name: string; mimeType: string; base64: string }>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve({ name: value.name, mimeType: value.type, base64: String(reader.result).split(",")[1] ?? "" }); reader.onerror = () => reject(new Error("Could not read file.")); reader.readAsDataURL(value); }); }
  async function publish(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); try { const input: MediaInput = { kind, title, category }; if (kind === "video") { input.youtubeId = youtubeId; const thumb = await payload(thumbnail); if (thumb) input.thumbnail = thumb; } else { const fileData = await payload(file); if (fileData) input.file = fileData; } const item = await addMedia(token, input); onMediaChange([item, ...media]); setTitle(""); setYoutubeId(""); event.currentTarget.reset(); toast.success("Media published."); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not publish media."); } finally { setSaving(false); } }
  async function remove(item: MediaItem) { if (!window.confirm(`Delete ${item.title}?`)) return; await deleteMedia(token, item.id); onMediaChange(media.filter((entry) => entry.id !== item.id)); }
  return <section className="mt-10 border-y border-border py-8"><div className="flex items-center gap-3"><ImagePlus className="size-6 text-gold" /><div><h2 className="font-display text-3xl uppercase">Manage media</h2><p className="text-sm text-muted-foreground">Publish photos, posters and YouTube videos.</p></div></div><form onSubmit={publish} className="mt-6 grid gap-4 rounded-2xl border border-border p-5 md:grid-cols-4"><select value={kind} onChange={(event) => setKind(event.target.value as MediaInput["kind"])} className="rounded-md border border-input bg-card px-3"><option value="image">Photo</option><option value="poster">Poster</option><option value="video">YouTube video</option></select><Input placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} required /><Input placeholder="Category" value={category} onChange={(event) => setCategory(event.target.value)} required />{kind === "video" ? <Input placeholder="YouTube ID or URL" value={youtubeId} onChange={(event) => setYoutubeId(event.target.value)} required /> : <Input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] ?? null)} required />}{kind === "video" ? <Input type="file" accept="image/*" onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)} /> : null}<Button type="submit" variant="hero" disabled={saving}>{saving ? "Publishing..." : "Publish media"}</Button></form><div className="mt-6 max-h-[28rem] overflow-y-auto pr-1"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{media.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" className="h-32 w-full object-cover" /> : <div className="grid h-32 place-items-center bg-muted text-xs uppercase text-muted-foreground">YouTube video</div>}<div className="p-4"><p className="text-xs uppercase text-gold">{item.kind} · {item.category}</p><h3 className="mt-2 font-semibold">{item.title}</h3><Button type="button" variant="ghost" size="sm" onClick={() => void remove(item)}><Trash2 className="size-4" /> Delete</Button></div></article>)}</div></div></section>;
}
