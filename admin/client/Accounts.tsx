import { useState } from 'react';

export type AdminAccount = { username: string };

export function Accounts({ accounts, currentUsername, busy, message, create }: {
  accounts: AdminAccount[];
  currentUsername: string;
  busy: boolean;
  message: string;
  create: (username: string, password: string) => Promise<boolean>;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  return <main className="accounts editor">
    <h1>管理员账号</h1><p>所有账号拥有相同管理权限。</p>
    <div className="accounts-columns">
      <section aria-label="管理员列表"><table><thead><tr><th>用户名</th><th>身份</th></tr></thead>
        <tbody>{accounts.map(account => <tr key={account.username}><td>{account.username}</td><td>{account.username === currentUsername ? '当前账号' : '管理员'}</td></tr>)}</tbody>
      </table>{!accounts.length && <p>{busy ? '正在加载账号…' : '尚未加载账号，请重新进入此页。'}</p>}</section>
      <form onSubmit={event => {
        event.preventDefault();
        if (busy) return;
        if (password !== confirmation) { setError('两次输入的密码不一致'); return; }
        setError('');
        void create(username, password).then(success => { if (success) { setUsername(''); setPassword(''); setConfirmation(''); } });
      }}>
        <h2>新增管理员</h2><fieldset disabled={busy}>
          <label><span>用户名</span><input autoComplete="off" autoCapitalize="none" spellCheck={false} required maxLength={64} pattern="[a-zA-Z0-9_.\-]+" aria-describedby="username-help" value={username} onChange={event => setUsername(event.target.value)} /></label>
          <p id="username-help" className="meta">字母、数字、_、.、-，不区分大小写</p>
          <label><span>密码</span><input type="password" autoComplete="new-password" required minLength={16} maxLength={1024} aria-describedby="password-help" value={password} onChange={event => { setPassword(event.target.value); setError(''); }} /></label>
          <p id="password-help" className="meta">密码至少 16 个字符</p>
          <label><span>确认密码</span><input type="password" autoComplete="new-password" required minLength={16} maxLength={1024} value={confirmation} onChange={event => { setConfirmation(event.target.value); setError(''); }} /></label>
          <button className="primary" type="submit">{busy ? '正在处理…' : '创建账号'}</button>
        </fieldset><p role="status" className="notice">{error || message}</p>
      </form>
    </div>
  </main>;
}
