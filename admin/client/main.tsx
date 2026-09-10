import { useEffect, useState } from 'react';
import { Accounts, type AdminAccount } from './Accounts';
import { createRoot } from 'react-dom/client';
import '../../src/fonts.css';
import './style.css';
import { emptyContent, editingLocales, kinds, publicationIssues } from '../shared/content';
import type { ContentData, ContentRecord, Kind, Version } from '../shared/content';

const labels: Record<Kind, string> = { albums: '专辑', members: '成员', news: '新闻', submissions: '投稿项目', settings: '站点设置' };
type Tab = '基础资料' | '正文与语言' | '曲目表' | '媒体与链接' | '历史版本';
let csrf = '';
class ApiError extends Error { status: number; constructor(status: number, message: string) { super(message); this.status = status; } }
async function api<T>(path: string, method = 'GET', data?: unknown): Promise<T> {
  const response = await fetch('/api/' + path, { method, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, ...(data === undefined ? {} : { body: JSON.stringify(data) }) });
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new ApiError(response.status, result.error ?? '请求失败');
  return result;
}
function App() {
  const [page, setPage] = useState<'content' | 'accounts'>('content');
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [currentUsername, setCurrentUsername] = useState('');
  const [username, setUsername] = useState('');
  const [authenticated, setAuthenticated] = useState(false), [password, setPassword] = useState('');
  const [records, setRecords] = useState<ContentRecord[]>([]), [selected, setSelected] = useState<ContentRecord | null>(null);
  const [draft, setDraft] = useState<ContentData | null>(null), [kind, setKind] = useState<Kind>('albums');
  const [tab, setTab] = useState<Tab>('基础资料'), [language, setLanguage] = useState<(typeof editingLocales)[number]>('zh');
  const [busy, setBusy] = useState(false), [message, setMessage] = useState(''), [search, setSearch] = useState('');
  const [versions, setVersions] = useState<Version[]>([]), [preview, setPreview] = useState(false), [light, setLight] = useState(false);
  const dirty = !!draft && !!selected && JSON.stringify(draft) !== JSON.stringify(selected.data);
  function adopt(record: ContentRecord) { setSelected(record); setDraft(structuredClone(record.data)); setVersions([]); setRecords(previous => [...previous.filter(item => item.id !== record.id), record]); }
  async function run(action: () => Promise<void>) {
    setBusy(true); setMessage('');
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : '操作失败'); if (error instanceof ApiError && error.status === 401) setAuthenticated(false); }
    finally { setBusy(false); }
  }
  async function load() { const result = await api<ContentRecord[]>('admin/records'); setRecords(result); if (result[0]) { adopt(result[0]); setKind(result[0].data.kind); } }
  useEffect(() => { void run(async () => { const session = await api<{ csrf: string; username: string }>('auth/session'); csrf = session.csrf; setCurrentUsername(session.username); setAuthenticated(true); await load(); }); }, []);
  useEffect(() => { const handler = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', handler); return () => window.removeEventListener('beforeunload', handler); }, [dirty]);
  const mayLeave = () => !dirty || window.confirm('当前修改尚未保存，是否放弃这些修改？');
  function update<K extends keyof ContentData>(key: K, value: ContentData[K]) { setDraft(previous => previous ? { ...previous, [key]: value } : previous); }
  const field = (label: string, key: 'title'|'date'|'catalog'|'credits'|'bandcamp'|'dizzylab'|'youtube'|'bilibili'|'deadline'|'release'|'album'|'email'|'tagline', type = 'text') => <label><span>{label}</span><input type={type} value={draft?.[key] ?? ''} onChange={event => update(key, event.target.value)} /></label>;
  const currentTabs: Tab[] = ['基础资料', ...(kind !== 'settings' ? ['正文与语言' as const] : []), ...(kind === 'albums' ? ['曲目表' as const] : []), '媒体与链接', '历史版本'];
  const path = selected ? 'admin/records/' + encodeURIComponent(selected.id) : '';
  const isBody = kind !== 'settings';
  const issues = draft ? publicationIssues(draft) : [];
  const https = (value: string) => value.startsWith('https://');
  const platformLinks = [...(draft?.links ?? []), ...(kind === 'albums' ? [
    { label: 'Bandcamp', url: draft?.bandcamp ?? '' },
    { label: 'dizzylab', url: draft?.dizzylab ?? '' },
    { label: 'bilibili', url: draft?.bilibili ?? '' },
    { label: 'YouTube', url: draft?.youtube ?? '' },
  ] : [])];
  async function upload(file: File) {
    if (file.size > 5 * 1024 * 1024) throw new Error('图片不能超过 5MB');
    const response = await fetch('/api/admin/media', { method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': csrf, 'Content-Type': file.type }, body: file });
    const result = await response.json() as { url?: string; error?: string };
    if (!response.ok || !result.url) throw new Error(result.error ?? '上传失败');
    update('image', result.url); setMessage('图片已上传，请保存草稿以绑定到当前内容。');
  }
  if (!authenticated) return <main className={`admin-app login-page ${light ? 'light' : ''}`}><form className="login" onSubmit={event => { event.preventDefault(); void run(async () => { const session = await api<{ csrf: string; username: string }>('auth/login', 'POST', { username, password }); csrf = session.csrf; setCurrentUsername(session.username); setPassword(''); setAuthenticated(true); await load(); }); }}><h1>Thoughost</h1><h2>内容管理</h2><p>本地后台</p><label><span>用户名</span><input autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} required /></label><label><span>管理员密码</span><input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label><button className="primary" disabled={busy}>登录</button><p role="status">{message}</p></form></main>;
  return <div className={`admin-app ${light ? 'light' : ''}`}>
    <header className="top"><strong>Thoughost <small>内容管理 /admin</small></strong><div><span>{currentUsername} · 已登录</span><button onClick={() => setLight(!light)}>切换{light ? '深' : '浅'}色</button><button disabled={busy} onClick={() => { if (mayLeave()) void run(async () => { await api('auth/logout', 'POST', {}); csrf = ''; setAuthenticated(false); setPage('content'); setAccounts([]); setSelected(null); setDraft(null); }); }}>退出</button></div></header>
    <p className="banner">SQLite 持久化已启用。发布更新本地内容 API；About 页成员简介与平台链接读取已发布数据。邮件功能未接入。</p>
    <div className={`shell ${page === 'accounts' ? 'accounts-shell' : ''}`}><nav className="side" aria-label="内容栏目">{kinds.map(item => <button key={item} disabled={busy} aria-current={page === 'content' && kind === item ? 'page' : undefined} onClick={() => { if (!mayLeave()) return; setPage('content'); setMessage(''); setKind(item); setSearch(''); setTab('基础资料'); setPreview(false); const first = records.find(record => record.data.kind === item); if (first) adopt(first); else { setSelected(null); setDraft(null); } }}>{labels[item]}</button>)}<button disabled={busy} aria-current={page === 'accounts' ? 'page' : undefined} onClick={() => {
      if (!mayLeave()) return;
      if (selected) adopt(selected);
      setPage('accounts');
      void run(async () => setAccounts(await api<AdminAccount[]>('admin/accounts')));
    }}>管理员</button></nav>
    {page === 'accounts' ? <Accounts accounts={accounts} currentUsername={currentUsername} busy={busy} message={message} create={async (name, secret) => {
      let success = false;
      await run(async () => {
        const account = await api<AdminAccount>('admin/accounts', 'POST', { username: name, password: secret });
        setAccounts(previous => [...previous, account].sort((a, b) => a.username.localeCompare(b.username)));
        setMessage('账号创建成功'); success = true;
      });
      return success;
    }} /> : <>
    <aside className="listing"><div className="toolbar"><h2>{labels[kind]}</h2><button disabled={busy} onClick={() => { if (mayLeave()) void run(async () => { const record = await api<ContentRecord>('admin/records', 'POST', emptyContent(kind, '未命名' + labels[kind])); adopt(record); setTab('基础资料'); }); }}>新建</button></div><input aria-label="搜索内容" placeholder="搜索标题或 ID" value={search} onChange={event => setSearch(event.target.value)} />{records.filter(record => record.data.kind === kind && (record.data.title + record.id).toLowerCase().includes(search.toLowerCase())).sort((a,b) => kind === 'members' ? a.data.order-b.data.order : b.updatedAt.localeCompare(a.updatedAt)).map(record => <button className="record" key={record.id} aria-pressed={selected?.id === record.id} disabled={busy} onClick={() => { if (mayLeave()) { adopt(record); setTab('基础资料'); setPreview(false); } }}><strong>{record.data.title}</strong><small>{record.publishedVersion ? `已发布 v${record.publishedVersion}` : '未发布'} · 修订 {record.revision}</small></button>)}</aside>
    <main className="editor"><p role="status" className="notice">{busy ? '正在处理…' : message}</p>{draft && selected ? <>
      <div className="toolbar"><div><h1>{draft.title}</h1><p className="meta">{selected.id} · 修订 {selected.revision}</p></div><span>{dirty ? '未保存修改' : '草稿已保存'}</span></div>
      <div className="tabs" role="tablist">{currentTabs.map(item => <button key={item} disabled={busy} role="tab" aria-selected={tab === item} onClick={() => { setTab(item); setPreview(false); if (item === '历史版本') void run(async () => setVersions(await api<Version[]>(path + '/versions'))); }}>{item}</button>)}</div>
      <fieldset disabled={busy}>
      {tab === '基础资料' && <><div className="grid">{field('标题／姓名', 'title')}
        {kind === 'albums' && <>{field('发行日期', 'date', 'date')}{field('目录编号', 'catalog')}<label><span>分类</span><select value={draft.category} onChange={event => update('category', event.target.value as ContentData['category'])}><option value="pending">待确认</option><option value="compilation-solo">Compilation / Solo</option><option value="ep-single">EP / Single</option></select></label></>}
        {kind === 'members' && <label><span>成员排序</span><input type="number" min="0" value={draft.order} onChange={event => update('order', Number(event.target.value))} /></label>}
        {kind === 'news' && field('显示日期','date','date')}
        {kind === 'submissions' && <><label><span>开放状态</span><select value={draft.state} onChange={event => update('state', event.target.value as ContentData['state'])}><option value="closed">已截止</option><option value="open">开放投稿</option></select></label>{field('截止日期','deadline','date')}{field('预计发行','release')}{field('关联作品 ID','album')}</>}
        {kind === 'settings' && <>{field('联系邮箱','email','email')}{field('品牌短句','tagline')}</>}
      </div>      {['albums','members'].includes(kind) && <div className="asset">{draft.image && <img src={draft.image} alt="当前图片" style={{ objectPosition: `center ${draft.crop}%` }} />}<div><label><span>上传图片 · PNG / JPEG / WebP，最多 5MB</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void run(() => upload(file)); event.target.value = ''; }} /></label><label><span>纵向裁切 {draft.crop}%</span><input type="range" min="0" max="100" value={draft.crop} onChange={event => update('crop', Number(event.target.value))} /></label></div></div>}</>}
      {tab === '正文与语言' && <><div className="tabs">{editingLocales.map(locale => <button key={locale} aria-pressed={language === locale} onClick={() => setLanguage(locale)}>{locale.toUpperCase()}{!draft.texts[locale] ? ' · 空' : ''}</button>)}</div><label><span>正文 · {language}</span><textarea rows={12} value={draft.texts[language]} onChange={event => update('texts', { ...draft.texts, [language]: event.target.value })} /></label><p className="meta">空行分段。切换语言保留未保存输入。</p>{draft.texts.original && <div className="rule"><h3>旧原文存档</h3><p className="meta">旧原文不再编辑，仅保留存档，避免丢失。</p><p className="archive-text">{draft.texts.original}</p></div>}</>}
      {tab === '曲目表' && <><div className="toolbar"><h3>{draft.tracks.length} 首曲目</h3><button onClick={() => update('tracks', [...draft.tracks, { title:'',artist:'' }])}>添加曲目</button></div><div className="table-scroll"><table><thead><tr><th>#</th><th>曲名</th><th>艺术家</th><th>排序</th></tr></thead><tbody>{draft.tracks.map((track,index) => <tr key={index}><td>{index+1}</td><td><input aria-label={`曲名 ${index+1}`} value={track.title} onChange={event => update('tracks', draft.tracks.map((item,i) => i === index ? { ...item,title:event.target.value } : item))} /></td><td><input aria-label={`艺术家 ${index+1}`} value={track.artist} onChange={event => update('tracks', draft.tracks.map((item,i) => i === index ? { ...item,artist:event.target.value } : item))} /></td><td><div className="row-actions">{[-1,1].map(direction => <button key={direction} disabled={index+direction<0 || index+direction>=draft.tracks.length} aria-label={`${direction<0?'上':'下'}移曲目 ${index+1}`} onClick={() => { const next=[...draft.tracks], item=next.splice(index,1)[0]; if(item){next.splice(index+direction,0,item);update('tracks',next);} }}>{direction<0?'↑':'↓'}</button>)}<button aria-label={`移除曲目 ${index+1}`} onClick={() => update('tracks',draft.tracks.filter((_,i)=>i!==index))}>×</button></div></td></tr>)}</tbody></table></div></>}
      {tab === '媒体与链接' && <>{kind === 'albums' ? <><div className="grid">{field('Bandcamp','bandcamp','url')}{field('dizzylab','dizzylab','url')}{field('bilibili XFD · ZH','bilibili','url')}{field('YouTube XFD · EN / JA','youtube','url')}</div><label><span>制作信息</span><textarea value={draft.credits} onChange={event=>update('credits',event.target.value)} /></label></> : <><div className="toolbar"><h3>平台账号</h3><button onClick={()=>update('links',[...draft.links,{label:'',url:''}])}>添加链接</button></div>{draft.links.map((link,index)=><div className="link-row" key={index}><input aria-label={`平台 ${index+1}`} value={link.label} onChange={event=>update('links',draft.links.map((item,i)=>i===index?{...item,label:event.target.value}:item))}/><input type="url" aria-label={`链接 ${index+1}`} value={link.url} placeholder="https://" onChange={event=>update('links',draft.links.map((item,i)=>i===index?{...item,url:event.target.value}:item))}/><button onClick={()=>update('links',draft.links.filter((_,i)=>i!==index))}>移除</button></div>)}{!draft.links.length&&<p>尚无链接，公开数据保持空列表。</p>}</>}</>}
      {tab === '历史版本' && <>{!versions.length&&<p>尚未发布版本。</p>}{versions.map(version=><div className="check" key={version.id}><span>版本 {version.id} · {new Date(version.createdAt).toLocaleString()}</span><button onClick={()=>{if(mayLeave())void run(async()=>{adopt(await api<ContentRecord>(path+'/restore','POST',{revision:selected.revision,version:version.id}));setTab('基础资料');setMessage('历史内容已恢复为新草稿，发布版本未改变。');});}}>恢复为草稿</button></div>)}</>}
      </fieldset>
      {preview && <section className={`preview ${kind==='members'?'member-preview':''}`}>{draft.image&&<img src={draft.image} alt={draft.title} style={{objectPosition:`center ${draft.crop}%`}}/>}<div className="preview-copy"><h2>{draft.title}</h2>{isBody?<div className="preview-biography">{(draft.texts[language]||[draft.texts.zh,draft.texts.en,draft.texts.ja,draft.texts.original].find(Boolean)||'正文待补充。').split('\n\n').map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>:<div className="preview-biography"><p>{draft.tagline}</p><p>{draft.email}</p></div>}{kind==='albums'&&!!draft.tracks.length&&<div className="preview-tracks">{draft.tracks.map((track,index)=><p key={index}>{index+1}　{track.title}　{track.artist}</p>)}</div>}{kind==='albums'&&draft.credits&&<p className="preview-credits">{draft.credits}</p>}{!!platformLinks.length&&<nav className="preview-links" aria-label="平台链接">{platformLinks.filter(link=>link.label.trim()&&https(link.url)).map(link=><a key={link.label+link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</nav>}</div></section>}
      {!!issues.length && <div className="rule publish-issues"><h3>发布前待完善</h3>{issues.map(issue=><p className="warning" key={issue}>{issue}</p>)}</div>}
      <footer className="bottom"><span>{dirty?'有未保存修改':'草稿保存在 SQLite'}</span><div><button disabled={busy} onClick={()=>void run(async()=>{if(mayLeave())adopt(await api<ContentRecord>(path));})}>重新加载</button><button disabled={busy} onClick={()=>setPreview(!preview)}>预览草稿</button><button disabled={busy||!dirty} onClick={()=>void run(async()=>{adopt(await api<ContentRecord>(path,'PUT',{revision:selected.revision,data:draft}));setMessage('草稿已保存，刷新或重启后仍保留。');})}>保存草稿</button><button className="primary" disabled={busy||issues.length>0} onClick={()=>void run(async()=>{let revision=selected.revision;if(dirty)revision=(await api<ContentRecord>(path,'PUT',{revision:selected.revision,data:draft})).revision;const published=await api<ContentRecord>(path+'/publish','POST',{revision});adopt(published);setMessage(`已发布本地版本 v${published.publishedVersion}。About 页成员简介与平台链接使用已发布数据。`);})}>发布</button></div></footer>
    </>:<p>此栏目尚无内容，可以新建。</p>}</main></>}</div></div>;
}
createRoot(document.getElementById('root')!).render(<App />);
