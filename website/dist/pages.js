const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function syncGptModel(source) {
  const option = source.selectedOptions[0];
  if (!option) return;
  const values = {
    '#gpt-model-id': option.value,
    '#gpt-context': `${option.dataset.context} tokens`,
    '#gpt-output': `${option.dataset.output} tokens`,
    '#gpt-input-price': `${option.dataset.inputPrice} / 1M`,
    '#gpt-output-price': `${option.dataset.outputPrice} / 1M`
  };
  Object.entries(values).forEach(([selector,value]) => { if ($(selector)) $(selector).textContent=value; });
  const peer = source.id === 'gpt-version' ? $('#playground-model') : $('#gpt-version');
  if (peer) peer.value = source.value;
}
if ($('#gpt-version')) {
  $('#gpt-version').addEventListener('change', event => syncGptModel(event.currentTarget));
  $('#playground-model').addEventListener('change', event => syncGptModel(event.currentTarget));
  $('#temperature').addEventListener('input', event => $('#temperature-value').textContent=event.currentTarget.value);
  $('#max-tokens').addEventListener('input', event => $('#max-tokens-value').textContent=event.currentTarget.value);
  $('#gpt-playground-form').addEventListener('submit', event => {
    event.preventDefault();
    const prompt=$('#user-prompt').value.trim();
    if (!prompt) { $('#user-prompt').focus(); return; }
    const model=$('#playground-model').value;
    $('#playground-status').textContent='Generating…';
    event.currentTarget.querySelector('button[type="submit"]').disabled=true;
    window.setTimeout(() => {
      const topic=prompt.split(/\n/).filter(Boolean).pop().replace(/^User:\s*/i,'');
      $('#playground-answer').innerHTML=`<p>Here’s a concise response to <strong>“${escapeHTML(topic.slice(0,110))}${topic.length>110?'…':''}”</strong>:</p><ul><li><strong>One integration:</strong> connect your application once and access multiple model versions through a consistent API.</li><li><strong>More flexibility:</strong> match quality, latency and price to each workload without rebuilding your stack.</li><li><strong>Simpler operations:</strong> centralize credentials, usage tracking and model routing as your product grows.</li></ul><p>You can refine this result by changing the system instructions, temperature or token limit.</p>`;
      $('#playground-used-model').textContent=model;
      $('#playground-token-estimate').textContent=`${Math.max(86,Math.round(prompt.length/3.6))} tokens`;
      $('#playground-latency').textContent='0.8 s simulated';
      $('#playground-empty').hidden=true;
      $('#playground-result').hidden=false;
      $('#playground-status').textContent='Complete';
      event.currentTarget.querySelector('button[type="submit"]').disabled=false;
    },650);
  });
  syncGptModel($('#gpt-version'));
}
function filterCatalog() {
  const query = $('#model-search').value.trim().toLowerCase();
  const kind = $('input[name="capability"]:checked').value;
  const providers = $$('input[name="provider"]:checked').map(x => x.value);
  const cards = $$('.catalog-grid .model-card');
  const sort = $('#model-sort').value;
  cards.forEach(card => {
    card.hidden = !(card.textContent.toLowerCase().includes(query) && (kind === 'all' || card.dataset.category === kind) && (!providers.length || providers.includes(card.dataset.provider)));
  });
  const visible = cards.filter(card => !card.hidden).length;
  $('#result-count').textContent = `${visible} model ${visible === 1 ? 'family' : 'families'}`;
  $('#no-results').hidden = visible !== 0;
  const ordered = [...cards].sort((a,b) => sort === 'featured' ? Number(a.dataset.order) - Number(b.dataset.order) : a.dataset.name.localeCompare(b.dataset.name) * (sort === 'za' ? -1 : 1));
  ordered.forEach(card => $('.catalog-grid').append(card));
}
if ($('#model-search')) {
  $$('.catalog-grid .model-card').forEach((card,i) => card.dataset.order = i);
  const requested = new URLSearchParams(location.search).get('type');
  const capability = $$('input[name="capability"]').find(x => x.value === requested);
  if (capability) capability.checked = true;
  $('#model-search').addEventListener('input', filterCatalog);
  $$('.catalog-sidebar input, #model-sort').forEach(input => input.addEventListener('change', filterCatalog));
  function resetCatalog() {
    $('#model-search').value = '';
    $$('input[name="provider"]').forEach(x => x.checked = false);
    $('input[name="capability"][value="all"]').checked = true;
    $('#model-sort').value = 'featured';
    filterCatalog();
  }
  $('#reset-filters').addEventListener('click', resetCatalog);
  $('#empty-reset').addEventListener('click', resetCatalog);
  filterCatalog();
}
function updateEstimate() {
  const budgetInput = $('#budget');
  const budget = Number(budgetInput.value);
  const validBudget = budgetInput.value !== '' && Number.isFinite(budget) && budget > 0 && budget <= 1000000;
  for (const kind of ['text','image','video']) {
    const rateInput = $(`#rate-${kind}`);
    const rate = Number(rateInput.value);
    const valid = validBudget && rateInput.value !== '' && Number.isFinite(rate) && rate > 0 && rate <= 1000000;
    const amount = kind === 'text' ? budget / rate * 1000000 : budget / rate;
    $(`#estimate-${kind}`).textContent = valid ? new Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format(kind === 'video' ? amount : Math.floor(amount)) : '—';
    rateInput.setAttribute('aria-invalid', String(!(rate > 0 && rate <= 1000000)));
  }
  budgetInput.setAttribute('aria-invalid', String(!validBudget));
}
if ($('#budget')) {
  $('#budget').addEventListener('input', () => { $('#budget-range').value = Math.min(5000,Math.max(10,Number($('#budget').value))); updateEstimate(); });
  $('#budget-range').addEventListener('input', () => { $('#budget').value = $('#budget-range').value; updateEstimate(); });
  $$('[id^="rate-"]').forEach(input => input.addEventListener('input',updateEstimate));
  updateEstimate();
}
$$('[data-price-kind]').forEach(button => button.addEventListener('click', () => {
  $$('[data-price-kind]').forEach(x => x.setAttribute('aria-pressed',String(x === button)));
  $$('[data-price-row]').forEach(row => row.hidden = row.dataset.priceRow !== button.dataset.priceKind);
}));
function filterArticles() {
  const category = $('[data-blog-filter][aria-pressed="true"]')?.dataset.blogFilter || 'all';
  const query = $('#blog-search')?.value.trim().toLowerCase() || '';
  const articles = $$('[data-article-category]');
  articles.forEach(card => card.hidden = !((category === 'all' || category === card.dataset.articleCategory) && card.textContent.toLowerCase().includes(query)));
  const count = articles.filter(card => !card.hidden).length;
  if ($('#blog-count')) $('#blog-count').textContent = `${count} ${count === 1 ? 'article' : 'articles'}`;
  if ($('#blog-empty')) $('#blog-empty').hidden = count > 0;
}
$$('[data-blog-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-blog-filter]').forEach(x => x.setAttribute('aria-pressed',String(x === button)));
  filterArticles();
}));
$('#blog-search')?.addEventListener('input', filterArticles);
$('#blog-reset')?.addEventListener('click', () => {
  $('#blog-search').value = '';
  $$('[data-blog-filter]').forEach(x => x.setAttribute('aria-pressed',String(x.dataset.blogFilter === 'all')));
  filterArticles();
});
if ($('#enterprise-form')) {
  $('#enterprise-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    $('#brief-text').textContent = `RunBridge AI — Project brief\n\nCompany: ${data.get('company').trim()}\nWork email: ${data.get('email').trim()}\nCompany size: ${data.get('size')}\n\nProject requirements\n${data.get('project').trim()}\n\nPrepared locally. Not submitted to RunBridge.`;
    $('#brief-result').hidden = false;
    notify('Project brief prepared. Nothing has been sent.');
  });
  $('#copy-brief').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('#brief-text').textContent); notify('Project brief copied'); }
    catch { const range=document.createRange();range.selectNodeContents($('#brief-text'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);notify('Select and copy the highlighted brief'); }
  });
}
const troubleshooting = {
  auth: { title: 'Check the account connection.', steps: ['Confirm the key is loaded in your server environment and sent as a bearer credential.', 'Use the base URL provisioned for the same account. Check for missing or duplicated path segments.', 'Check whether the account is authorized to use the selected model.'], href: '/docs/authentication/', link: 'Review authentication' },
  request: { title: 'Match the request to the model.', steps: ['Copy the exact model version ID from the account catalog.', 'Validate input types, file formats and required fields against that model’s schema.', 'Remove unsupported parameters and use the full error message to locate the rejected field.'], href: '/docs/api-reference/', link: 'Review request patterns' },
  rate: { title: 'Reduce concurrency and retry deliberately.', steps: ['Inspect the response for quota or rate-limit details.', 'Honor Retry-After when present; otherwise use bounded backoff with jitter.', 'Limit simultaneous requests and stop retrying when the account quota is exhausted.'], href: '/docs/errors/', link: 'Read retry guidance' },
  timeout: { title: 'Check the existing request first.', steps: ['Find the request or job ID recorded before the timeout.', 'For a job-based endpoint, check its status using the documented status flow.', 'Avoid creating another generation until you know whether the first request started.'], href: '/docs/errors/', link: 'Handle unknown request outcomes' },
  upstream: { title: 'Keep the failure in context.', steps: ['Record the timestamp, model ID, response status and request ID.', 'Retry only when the endpoint and operation can be retried safely; use a fixed retry budget.', 'If failures continue, preserve a minimal reproduction for support.'], href: '/docs/errors/', link: 'Review error handling' },
  usage: { title: 'Reconcile the request and billing unit.', steps: ['Match the charge or usage record to its request ID and timestamp.', 'Check input and output tokens separately, or confirm image/video settings and billable units.', 'Keep the usage record for review. A timeout alone does not establish a failed or refundable request.'], href: '/pricing/', link: 'Understand billing units' }
};
function showTroubleshooting() {
  const info = troubleshooting[$('#support-issue').value] || troubleshooting.request;
  $('#support-guidance').innerHTML = `<h3>${escapeHTML(info.title)}</h3><ol>${info.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol><a class="text-link" href="${info.href}">${escapeHTML(info.link)} →</a>`;
}
if ($('#support-issue')) {
  $('#support-issue').addEventListener('change', showTroubleshooting);
  showTroubleshooting();
}
$$('[data-copy-target]').forEach(button => button.addEventListener('click', async () => {
  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;
  try { await navigator.clipboard.writeText(target.textContent); notify('Template copied'); }
  catch { const range=document.createRange();range.selectNodeContents(target);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);notify('Select and copy the highlighted template'); }
}));
