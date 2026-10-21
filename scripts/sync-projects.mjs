import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const locales = ['en', 'de', 'id'];
const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
export function validateManifest(manifest) {
  if (manifest?.version !== 1 || !text(manifest.title, 100) ||
      !Array.isArray(manifest.stack) || !manifest.stack.length || manifest.stack.length > 12 ||
      !manifest.stack.every(tag => text(tag, 50)) ||
      !locales.every(locale => text(manifest.descriptions?.[locale], 600))) {
    throw new Error('Invalid portfolio.json: version, title, stack and all three descriptions are required');
  }
  return { title: manifest.title, stack: manifest.stack,
    descriptions: Object.fromEntries(locales.map(locale => [locale, manifest.descriptions[locale]])) };
}

export function publicHttps(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !url.hostname.includes('.') || /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname) ||
      url.hostname.endsWith('.local') || url.hostname.endsWith('.internal') || url.hostname.startsWith('[')) {
    throw new Error(`Expected a public HTTPS URL: ${value}`);
  }
  return url.href.replace(/\/$/, '');
}

async function request(url, { github = false } = {}) {
  for (let redirects = 0; redirects <= 5; redirects++) {
    publicHttps(url);
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000),
      headers: github ? { Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) } : {} });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const destination = new URL(response.headers.get('location'), url).href;
      await response.body?.cancel();
      if (github && new URL(destination).origin !== 'https://api.github.com') throw new Error('Unexpected GitHub API redirect');
      url = destination;
      continue;
    }
    if (!response.ok) { await response.body?.cancel(); throw new Error(`${url}: HTTP ${response.status}`); }
    return response;
  }
  throw new Error(`Too many redirects: ${url}`);
}

export async function syncProject(project) {
  const repoUrl = new URL(project.repo);
  if (repoUrl.origin !== 'https://github.com' || !/^\/iseto\/[\w.-]+$/.test(repoUrl.pathname)) throw new Error('Unexpected source repository');
  const api = `https://api.github.com/repos${repoUrl.pathname}`;
  const repo = await (await request(api, { github: true })).json();
  if (repo.private || repo.archived) throw new Error(`${project.repo}: repository must be public and active`);
  const manifest = await (await request(`${api}/contents/portfolio.json`, { github: true })).json();
  const metadata = validateManifest(JSON.parse(Buffer.from(manifest.content, 'base64').toString('utf8')));
  const url = publicHttps(repo.homepage || project.url);
  const demo = await request(url);
  // Do not replace a canonical URL with a hosting login or unrelated redirect.
  if (new URL(demo.url).origin !== new URL(url).origin) {
    await demo.body?.cancel(); throw new Error(`${url}: unexpected cross-origin demo redirect`);
  }
  await demo.body?.cancel();
  const source = await request(project.repo);
  await source.body?.cancel();
  const commits = await (await request(`${api}/commits?per_page=1`, { github: true })).json();
  const updated = commits[0]?.commit?.committer?.date;
  if (!/^\d{4}-\d{2}-\d{2}T/.test(updated || '')) throw new Error('Invalid source commit date');
  return { ...project, ...metadata, description: metadata.descriptions.en, url,
    sourcePrivate: false, sourceUpdated: updated.slice(0, 10) };
}

export async function main() {
  const path = new URL('../data/projects.json', import.meta.url);
  const original = await readFile(path, 'utf8');
  const projects = JSON.parse(original);
  // All-or-nothing: a failed repository, invalid translation or dead demo prevents publishing.
  const updated = [];
  for (const project of projects) updated.push(await syncProject(project));
  const output = `${JSON.stringify(updated, null, 2)}\n`;
  if (output !== original) await writeFile(path, output);
  console.log(output === original ? 'Project listings unchanged.' : 'Verified project listings updated.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
