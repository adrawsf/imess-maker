// Vercel Function: terima PNG dari mini app, lalu bot ngirim balik ke chat user sebagai file.
// Butuh environment variable BOT_TOKEN (token dari @BotFather).
import crypto from 'node:crypto';

const MAX_AGE = 24 * 60 * 60; // initData lebih tua dari 24 jam ditolak

// Cek tanda tangan initData sesuai https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
function checkInitData(initData, token) {
  const p = new URLSearchParams(initData);
  const hash = p.get('hash');
  if (!hash) return null;
  p.delete('hash');
  const dcs = [...p.entries()].map(([k, v]) => `${k}=${v}`).sort().join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(token).digest();
  const sig = crypto.createHmac('sha256', secret).update(dcs).digest('hex');
  if (sig.length !== hash.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(hash))) return null;
  if (Date.now() / 1000 - Number(p.get('auth_date')) > MAX_AGE) return null;
  try { return JSON.parse(p.get('user')); } catch { return null; }
}

export async function POST(request) {
  const token = process.env.BOT_TOKEN;
  if (!token) return new Response('BOT_TOKEN belum diisi', { status: 500 });

  const user = checkInitData(request.headers.get('x-init-data') || '', token);
  if (!user || !user.id) return new Response('initData nggak valid', { status: 401 });

  const type = request.headers.get('content-type') || '';
  if (type !== 'image/png' && type !== 'image/jpeg') return new Response('Harus PNG atau JPEG', { status: 415 });
  const img = await request.arrayBuffer();
  if (!img.byteLength) return new Response('Gambarnya kosong', { status: 400 });

  const raw = new URL(request.url).searchParams.get('name') || 'au-chat.png';
  const name = raw.replace(/[^\w.-]/g, '').slice(0, 60) || 'au-chat.png';

  const form = new FormData();
  form.append('chat_id', String(user.id));
  form.append('document', new Blob([img], { type }), name);
  const tg = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: 'POST', body: form });
  if (tg.ok) return new Response('ok');
  // 403 = user belum pernah Start bot atau ngeblok bot
  return new Response('Telegram nolak', { status: tg.status === 403 ? 403 : 502 });
}
