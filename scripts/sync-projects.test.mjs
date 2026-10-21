import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateManifest, publicHttps, syncProject } from './sync-projects.mjs';

const manifest = { version: 1, title: 'Example', stack: ['React'],
  descriptions: { en: 'English', de: 'Deutsch', id: 'Indonesia' } };
test('requires all translations and bounded plain listing fields', () => {
  assert.equal(validateManifest(manifest).title, 'Example');
  for (const invalid of [null, { ...manifest, version: 2 }, { ...manifest, stack: [] },
    { ...manifest, title: 'x'.repeat(101) }, { ...manifest, descriptions: { en: 'English' } }]) {
    assert.throws(() => validateManifest(invalid));
  }
  assert.equal('extra' in validateManifest({ ...manifest, extra: 'ignored' }), false);
});
test('rejects unsafe demo URLs', () => {
  for (const url of ['http://example.com', 'javascript:alert(1)', 'https://localhost',
    'https://127.0.0.1', 'https://10.1.2.3', 'https://192.168.1.1', 'https://172.16.0.1',
    'https://[::1]', 'https://host.internal', 'https://user:pass@example.com', 'https://example.com:8443']) {
    assert.throws(() => publicHttps(url), url);
  }
  assert.equal(publicHttps('https://example.vercel.app/'), 'https://example.vercel.app');
});
test('syncs verified metadata and source date, rejects blocked demos and API redirects', async () => {
  const originalFetch = globalThis.fetch;
  const project = { repo: 'https://github.com/iseto/example', url: 'https://example.vercel.app', sourcePrivate: true };
  let blocked = false;
  let redirect = false;
  globalThis.fetch = async url => {
    if (String(url).includes('api.github.com') && redirect) return new Response(null, { status: 302, headers: { location: 'https://example.com' } });
    let data = {};
    if (String(url).endsWith('/repos/iseto/example')) data = { homepage: project.url, private: false, archived: false };
    if (String(url).endsWith('/portfolio.json')) data = { content: Buffer.from(JSON.stringify(manifest)).toString('base64') };
    if (String(url).includes('/commits?')) data = [{ commit: { committer: { date: '2026-10-21T08:00:00Z' } } }];
    const response = new Response(JSON.stringify(data), { status: blocked && String(url) === project.url ? 403 : 200 });
    Object.defineProperty(response, 'url', { value: url });
    return response;
  };
  try {
    const result = await syncProject(project);
    assert.equal(result.sourcePrivate, false);
    assert.equal(result.sourceUpdated, '2026-10-21');
    assert.deepEqual(result.descriptions, manifest.descriptions);
    blocked = true;
    await assert.rejects(syncProject(project), /403/);
    redirect = true;
    await assert.rejects(syncProject(project), /Unexpected GitHub API redirect/);
  } finally { globalThis.fetch = originalFetch; }
});
test('checked-in projects contain complete localized listing data', async () => {
  const projects = JSON.parse(await readFile(new URL('../data/projects.json', import.meta.url)));
  for (const project of projects) {
    validateManifest({ version: 1, ...project });
    publicHttps(project.url);
    assert.match(project.sourceUpdated, /^\d{4}-\d{2}-\d{2}$/);
  }
});
