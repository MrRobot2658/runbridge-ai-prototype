const examples = {
  python: { file: 'quickstart.py', code: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(\n    api_key=os.environ["RUNBRIDGE_API_KEY"],\n    base_url=os.environ["RUNBRIDGE_BASE_URL"],\n)\n\nresponse = client.chat.completions.create(\n    model=os.environ["RUNBRIDGE_MODEL"],\n    messages=[{\n        "role": "user",\n        "content": "Build something great."\n    }]\n)\n\nprint(response.choices[0].message.content)` },
  javascript: { file: 'quickstart.js', code: `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  apiKey: process.env.RUNBRIDGE_API_KEY,\n  baseURL: process.env.RUNBRIDGE_BASE_URL,\n});\n\nconst response = await client.chat.completions.create({\n  model: process.env.RUNBRIDGE_MODEL,\n  messages: [{\n    role: "user",\n    content: "Build something great."\n  }]\n});\n\nconsole.log(response.choices[0].message.content);` },
  curl: { file: 'quickstart.sh', code: `curl "$RUNBRIDGE_BASE_URL/chat/completions" \\\n  -H "Authorization: Bearer $RUNBRIDGE_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d "{\n    \\"model\\": \\"$RUNBRIDGE_MODEL\\",\n    \\"messages\\": [{\n      \\"role\\": \\"user\\",\n      \\"content\\": \\"Build something great.\\"\n    }]\n  }"` }
};
let currentLanguage = 'python';
const codeEl = document.querySelector('#quickstart');
function renderCode(language) {
  currentLanguage = language;
  const escaped = examples[language].code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  codeEl.innerHTML = escaped.replace(/("(?:[^"\\]|\\.)*"|'[^']*'|\b(?:import|from|const|await|print)\b)/g, (match) => `<span class="${/^["']/.test(match) ? 'token-string' : 'token-keyword'}">${match}</span>`);
  document.querySelector('.code-file span').textContent = examples[language].file;
  document.querySelectorAll('[data-lang]').forEach(button => {
    const selected = button.dataset.lang === language;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => renderCode(button.dataset.lang)));
if (codeEl) renderCode(Object.hasOwn(examples, new URLSearchParams(location.search).get('lang')) ? new URLSearchParams(location.search).get('lang') : 'python');
let toastTimer;
function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.querySelector('.copy-button')?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(examples[currentLanguage].code); notify('Code copied to clipboard'); }
  catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(codeEl); selection.removeAllRanges(); selection.addRange(range); notify('Select and copy the highlighted code'); }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('.model-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
