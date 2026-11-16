/*
 * HCR Digital Solutions — aql-calc-ui.js
 * Interface da calculadora AQL (calculadora-aql.html, aql-calculator.html,
 * calculateur-aql.html). Os textos vêm do bloco JSON #aqlStrings de cada
 * página; o cálculo é do aql-calc.js. Tudo corre no browser: nada é enviado.
 */
(function () {
  'use strict';
  var form = document.getElementById('aqlForm');
  var out = document.getElementById('aqlResult');
  var stringsEl = document.getElementById('aqlStrings');
  if (!form || !out || !stringsEl || !window.AqlCalc) return;

  var T = JSON.parse(stringsEl.textContent);
  var A = window.AqlCalc;
  var nf = new Intl.NumberFormat(T.locale);
  // 1 → "1,0", 4 → "4,0", 0.065 → "0,065" (como nas tabelas AQL)
  var af = new Intl.NumberFormat(T.locale, { minimumFractionDigits: 1, maximumFractionDigits: 3 });
  var CLASSES = A.CLASSES;

  var lotInput = document.getElementById('aqlLot');
  var lotErr = document.getElementById('aqlLotErr');
  var copyBtn = document.getElementById('aqlCopy');
  var copyStatus = document.getElementById('aqlCopyStatus');
  var lastText = '';

  function fmt(tpl, p) {
    return tpl.replace(/\{(\w+)\}/g, function (_, k) { return p[k] !== undefined ? p[k] : ''; });
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function fmtAql(a) { return a === 0 ? '0' : af.format(a); }

  // Preenche as listas de AQL com as colunas verificadas (+ 0 nos críticos).
  CLASSES.forEach(function (cls) {
    var sel = document.getElementById('aql_' + cls);
    var values = A.supportedAqls();
    if (cls === 'critical') values = [0].concat(values);
    sel.innerHTML = values.map(function (a) {
      var label = a === 0 ? T.aqlZeroOption : fmtAql(a);
      return '<option value="' + a + '">' + esc(label) + '</option>';
    }).join('');
    sel.value = String(T.defaults[cls]);
  });

  // "1 200", "1.200", "1,200" (milhares) → 1200; "10,5" / "10.5" → 10.5 (erro: não inteiro).
  function parseLot(raw) {
    var s = String(raw).replace(/[\s  ']/g, '');
    if (s === '') return '';
    if (/^\d+$/.test(s)) return Number(s);
    if (/^\d{1,3}([.,]\d{3})+$/.test(s)) return Number(s.replace(/[.,]/g, ''));
    if (/^-?\d+([.,]\d+)?$/.test(s)) return Number(s.replace(',', '.'));
    return NaN;
  }

  function readInput() {
    var levelEl = form.querySelector('input[name="aqlLevel"]:checked');
    var aql = {};
    CLASSES.forEach(function (cls) { aql[cls] = Number(document.getElementById('aql_' + cls).value); });
    return { lot: parseLot(lotInput.value), level: levelEl ? levelEl.value : 'II', aql: aql };
  }

  function planCell(c) {
    if (c.source === 'arrowDown') return fmt(T.planArrowDown, { letter: c.useLetter });
    if (c.source === 'arrowUp') return fmt(T.planArrowUp, { letter: c.useLetter });
    if (c.source === 'zeroTolerance') return T.planZero;
    return fmt(T.planDirect, { letter: c.useLetter });
  }

  function noteText(n, r) {
    var p = {
      cls: n.cls ? T.classes[n.cls] : '',
      from: n.from, to: n.to,
      n: n.sampleSize !== undefined ? nf.format(n.sampleSize) : '',
      lot: n.lot !== undefined ? nf.format(n.lot) : '',
      planN: n.planSampleSize !== undefined ? nf.format(n.planSampleSize) : '',
    };
    return fmt(T.notes[n.code] || '', p);
  }

  function criteria(r) {
    var pc = r.perClass;
    var crit = pc.critical.ac === 0 ? T.phraseCritZero : fmt(T.phraseCritMax, { ac: pc.critical.ac });
    return fmt(T.phraseCriteria, { major: pc.major.ac, minor: pc.minor.ac, crit: crit });
  }

  function phrase(r) {
    var pc = r.perClass;
    var sizes = CLASSES.map(function (c) { return pc[c].sampleSize; });
    var same = sizes.every(function (s) { return s === sizes[0]; });
    var head = r.sampleSize >= r.lot
      ? fmt(T.phraseAll, { lot: nf.format(r.lot) })
      : fmt(T.phraseInspect, { n: nf.format(r.sampleSize) });
    if (!same) {
      head += ' ' + fmt(T.phrasePerClass, {
        critical: nf.format(pc.critical.sampleSize), major: nf.format(pc.major.sampleSize), minor: nf.format(pc.minor.sampleSize),
      });
    }
    return head + '; ' + criteria(r) + '.';
  }

  function render() {
    var input = readInput();
    var r;
    lotErr.textContent = '';
    lotInput.removeAttribute('aria-invalid');
    copyBtn.disabled = true;
    lastText = '';
    try {
      r = A.calcAql(input);
    } catch (e) {
      if (input.lot === '') {
        out.innerHTML = '<p class="aql-hint">' + esc(T.hintEmpty) + '</p>';
        return;
      }
      var msg = (e && e.code && T.errors[e.code]) || T.errors.GENERIC;
      if (e && e.code && /^LOT_/.test(e.code)) {
        lotErr.textContent = msg;
        lotInput.setAttribute('aria-invalid', 'true');
      }
      out.innerHTML = '<p class="aql-err" role="alert">' + esc(msg) + '</p>';
      return;
    }

    var rows = CLASSES.map(function (cls) {
      var c = r.perClass[cls];
      return '<tr><th scope="row">' + esc(T.classes[cls]) + '<span class="aql-plan">' + esc(planCell(c)) + '</span></th>'
        + '<td>' + esc(fmtAql(c.aql)) + '</td>'
        + '<td>' + esc(nf.format(c.sampleSize)) + (c.inspectAll ? ' <span class="aql-tag">100 %</span>' : '') + '</td>'
        + '<td class="aql-ac">' + c.ac + '</td><td class="aql-re">' + c.re + '</td></tr>';
    }).join('');

    var notes = r.notes.map(function (n) { return noteText(n, r); }).filter(Boolean);
    // Nota da amostra comum mostrada uma vez, no fim.
    var phr = phrase(r);

    out.innerHTML =
      '<div class="aql-kpis">'
      + '<div class="kpi"><b>' + esc(r.code) + '</b><span>' + esc(T.kpiCode) + '</span></div>'
      + '<div class="kpi"><b>' + esc(nf.format(r.sampleSize)) + '</b><span>' + esc(r.inspectAll ? T.kpiSampleAll : T.kpiSample) + '</span></div>'
      + '</div>'
      + '<p class="aql-phrase">' + esc(phr) + '</p>'
      + '<div class="aql-tablewrap"><table class="aql-table"><caption class="sr-only">' + esc(T.tableCaption) + '</caption>'
      + '<thead><tr><th scope="col">' + esc(T.colClass) + '</th><th scope="col">AQL</th><th scope="col">' + esc(T.colSample)
      + '</th><th scope="col">Ac</th><th scope="col">Re</th></tr></thead><tbody>' + rows + '</tbody></table></div>'
      + (notes.length ? '<ul class="aql-notes">' + notes.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '')
      + '<p class="aql-meta">' + esc(fmt(T.meta, { lot: nf.format(r.lot), level: r.level })) + '</p>';

    lastText = [
      T.copyTitle,
      fmt(T.meta, { lot: nf.format(r.lot), level: r.level }),
      T.kpiCode + ': ' + r.code + ' · ' + T.kpiSample + ': ' + nf.format(r.sampleSize),
    ].concat(CLASSES.map(function (cls) {
      var c = r.perClass[cls];
      return '- ' + T.classes[cls] + ' — AQL ' + fmtAql(c.aql) + ' · ' + T.colSample + ' ' + nf.format(c.sampleSize)
        + (c.inspectAll ? ' (100 %)' : '') + ' · Ac ' + c.ac + ' / Re ' + c.re + ' · ' + planCell(c);
    })).concat([phr]).concat(notes.map(function (t) { return '* ' + t; })).concat(['', T.copyFooter, location.href.split('#')[0]]).join('\n');
    copyBtn.disabled = false;
  }

  function copy() {
    if (!lastText) return;
    var done = function () { copyStatus.textContent = T.copied; setTimeout(function () { copyStatus.textContent = ''; }, 2500); };
    var fail = function () { copyStatus.textContent = T.copyFailed; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(lastText).then(done, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = lastText;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) done(); else fail();
    }
  }

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  copyBtn.addEventListener('click', copy);
  render();
})();
