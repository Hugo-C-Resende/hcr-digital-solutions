#!/usr/bin/env node
/*
 * tools/aql-check.js — conferência da Tabela 2-A (ISO 2859-1, inspeção
 * normal, amostragem simples) antes de construir a calculadora AQL.
 *
 * NÃO é fonte de valores. Faz três coisas:
 *   a) gera uma Tabela 2-A a partir da REGRA abaixo (lida pelo Hugo numa
 *      reprodução da Tabela B da V-Trust; a norma ISO/ANSI ganha se disser
 *      outra coisa);
 *   b) compara-a, célula a célula, com a tabela do servidor da Inspection
 *      Suite (aql.engine.js, lido como texto, nunca alterado);
 *   c) lista células com valores repetidos na mesma letra no servidor.
 *
 * Regra, por coluna de AQL (0,065 a 6,5; AQL 10 e 15 ficam de fora), com
 * S0 = a letra onde n·AQL/100 ≈ 0,125:
 *   - letras antes de S0 ........ ↓ (usa S0: 0/1, com a amostra de S0)
 *   - S0 ........................ 0/1
 *   - S0+1 ...................... ↑ (usa S0: 0/1, com a amostra de S0)
 *   - S0+2 ...................... ↓ (usa S0+3: 1/2, com a amostra de S0+3)
 *   - S0+3 … S0+10 .............. 1/2, 2/3, 3/4, 5/6, 7/8, 10/11, 14/15, 21/22
 *   - depois de S0+10 ........... ↑ (usa a célula 21/22 da coluna)
 *   Se a tabela de letras acabar antes (colunas 0,065 e 0,1), a sequência
 *   fica cortada na letra R.
 *
 * Uso: node tools/aql-check.js [caminho/para/aql.engine.js]
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const ENGINE = process.argv[2] ||
  'C:/hcr-inspection-suite/hcr-backend/src/modules/inspections/aql/aql.engine.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R'];
const N = { A: 2, B: 3, C: 5, D: 8, E: 13, F: 20, G: 32, H: 50, J: 80, K: 125, L: 200, M: 315, N: 500, P: 800, Q: 1250, R: 2000 };
const AQLS = [0.065, 0.10, 0.15, 0.25, 0.40, 0.65, 1.0, 1.5, 2.5, 4.0, 6.5];
// S0 por coluna, tal como indicado (n·AQL/100 ≈ 0,125).
const S0 = { 6.5: 'A', 4.0: 'B', 2.5: 'C', 1.5: 'D', 1.0: 'E', 0.65: 'F', 0.40: 'G', 0.25: 'H', 0.15: 'J', 0.10: 'K', 0.065: 'L' };
const AC_SEQ = [1, 2, 3, 5, 7, 10, 14, 21]; // S0+3 … S0+10
const TARGET = 0.125;

const fmtAql = (a) => String(a).replace('.', ',');
const fmtPlan = (p) => `${p.ac}/${p.re}`;

// ---------------------------------------------------------------------------
// a) Tabela gerada pela regra
// ---------------------------------------------------------------------------
function checkS0() {
  // Confirma que a lista S0 é mesmo a letra com n·AQL/100 mais perto de 0,125.
  for (const aql of AQLS) {
    let best = null;
    let bestD = Infinity;
    for (const L of LETTERS) {
      const d = Math.abs(N[L] * aql / 100 - TARGET);
      if (d < bestD) { bestD = d; best = L; }
    }
    if (best !== S0[aql]) {
      throw new Error(`S0 de AQL ${fmtAql(aql)}: lista diz ${S0[aql]}, n·AQL/100 ≈ 0,125 dá ${best}`);
    }
  }
}

function buildRule() {
  const table = {}; // table[letter][aql] = { kind: 'plan'|'down'|'up', ac, re, n, from }
  for (const L of LETTERS) table[L] = {};
  const plan = (L, ac) => ({ kind: 'plan', ac, re: ac + 1, n: N[L], from: L });
  for (const aql of AQLS) {
    const s = LETTERS.indexOf(S0[aql]);
    // Planos reais da coluna: S0 (0/1) e S0+3 … S0+10 (cortado em R).
    const plans = {};
    plans[s] = plan(LETTERS[s], 0);
    AC_SEQ.forEach((ac, k) => {
      const i = s + 3 + k;
      if (i < LETTERS.length) plans[i] = plan(LETTERS[i], ac);
    });
    const lastPlan = Math.max(...Object.keys(plans).map(Number));
    const ref = (i, kind) => ({ ...plans[i], kind });
    LETTERS.forEach((L, i) => {
      let cell;
      if (i < s) cell = ref(s, 'down');
      else if (plans[i]) cell = plans[i];
      else if (i === s + 1) cell = ref(s, 'up');
      else if (i === s + 2) cell = ref(s + 3 < LETTERS.length ? s + 3 : lastPlan, 'down');
      else cell = ref(lastPlan, 'up'); // depois de S0+10
      table[L][aql] = cell;
    });
  }
  return table;
}

const cellText = (c) =>
  c.kind === 'plan' ? fmtPlan(c) : `${c.kind === 'down' ? '↓' : '↑'}${c.from}`;
const cellLong = (c) =>
  c.kind === 'plan'
    ? `${fmtPlan(c)} (n=${c.n})`
    : `${c.kind === 'down' ? '↓' : '↑'} usa ${c.from}: ${fmtPlan(c)} com n=${c.n}`;

// ---------------------------------------------------------------------------
// Tabela do servidor (lida como texto; SAMPLING_PLANS não é exportado)
// ---------------------------------------------------------------------------
function readServerTable(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = /const SAMPLING_PLANS = (\{[\s\S]*?\n\})/.exec(src);
  if (!m) throw new Error(`SAMPLING_PLANS não encontrado em ${file}`);
  const plans = vm.runInNewContext(`(${m[1]})`, {});
  const table = {};
  for (const L of LETTERS) {
    const row = plans[L];
    if (!row) throw new Error(`servidor sem a letra ${L}`);
    if (row.sampleSize !== N[L]) throw new Error(`servidor: ${L} tem n=${row.sampleSize}, esperado ${N[L]}`);
    table[L] = {};
    for (const aql of AQLS) {
      const c = row.plans[aql];
      if (!c) throw new Error(`servidor sem ${L} / AQL ${aql}`);
      table[L][aql] = { ac: c.ac, re: c.re, n: row.sampleSize };
    }
  }
  return table;
}

// ---------------------------------------------------------------------------
// Impressão
// ---------------------------------------------------------------------------
function printGrid(title, table, cell) {
  const w = 7;
  console.log(`\n${title}`);
  console.log('letra   n    |' + AQLS.map((a) => fmtAql(a).padStart(w)).join(''));
  console.log('-'.repeat(13 + AQLS.length * w));
  for (const L of LETTERS) {
    console.log(`${L.padEnd(4)}${String(N[L]).padStart(5)}    |` + AQLS.map((a) => cell(table[L][a]).padStart(w)).join(''));
  }
}

checkS0();
const rule = buildRule();
const srv = readServerTable(ENGINE);

console.log('=== aql-check — Tabela 2-A (inspeção normal, amostragem simples), AQL 0,065 a 6,5 ===');
console.log(`servidor: ${ENGINE}`);
console.log('AVISO: a tabela "regra" vem de uma reprodução (V-Trust, Tabela B), não da norma; confirma na ISO 2859-1 / ANSI Z1.4.');

console.log('\n--- (a) S0 por coluna (primeira célula 0/1, n·AQL/100 ≈ 0,125) ---');
for (const aql of AQLS) {
  const L = S0[aql];
  console.log(`  AQL ${fmtAql(aql).padEnd(6)} → ${L} (n=${N[L]}, n·AQL/100 = ${(N[L] * aql / 100).toFixed(3)})`);
}
printGrid('--- (a) Tabela 2-A gerada pela regra (↓X/↑X = seta, usa o plano da letra X com a amostra dela) ---', rule, cellText);
printGrid('--- Tabela 2-A do servidor (aql.engine.js; usa sempre a amostra da própria letra) ---', srv, fmtPlan);

// ---------------------------------------------------------------------------
// b) Divergências célula a célula
// ---------------------------------------------------------------------------
console.log('\n--- (b) Divergências servidor vs regra ---');
console.log('Conta como divergência: Ac/Re diferente, ou a regra tem seta (a amostra usada');
console.log('não é a da letra) e o servidor aplica um valor com a amostra da própria letra.\n');
const diffs = [];
for (const L of LETTERS) {
  for (const aql of AQLS) {
    const h = rule[L][aql];
    const s = srv[L][aql];
    const sameAcRe = h.ac === s.ac && h.re === s.re;
    const sameN = h.n === s.n;
    if (!sameAcRe || !sameN) {
      const what = !sameAcRe && !sameN ? 'Ac/Re e amostra' : !sameAcRe ? 'Ac/Re' : 'amostra (seta)';
      diffs.push({ L, aql, s, h, what });
    }
  }
}
console.log('letra  AQL     servidor            regra                         difere em');
for (const d of diffs) {
  console.log(
    `${d.L.padEnd(7)}${fmtAql(d.aql).padEnd(8)}${`${fmtPlan(d.s)} (n=${d.s.n})`.padEnd(20)}${cellLong(d.h).padEnd(30)}${d.what}`
  );
}
const acRe = diffs.filter((d) => d.what !== 'amostra (seta)').length;
console.log(`\nTotal: ${diffs.length} células divergentes de ${LETTERS.length * AQLS.length}`
  + ` (${acRe} com Ac/Re diferente; ${diffs.length - acRe} só pela amostra da seta).`);

console.log('\nResumo por coluna (células divergentes / com Ac/Re diferente):');
for (const aql of AQLS) {
  const col = diffs.filter((d) => d.aql === aql);
  console.log(`  AQL ${fmtAql(aql).padEnd(6)} ${String(col.length).padStart(2)} / ${col.filter((d) => d.what !== 'amostra (seta)').length}`);
}

// ---------------------------------------------------------------------------
// c) Valores repetidos na mesma letra (servidor)
// ---------------------------------------------------------------------------
console.log('\n--- (c) Servidor: o mesmo Ac/Re em várias colunas da mesma letra (AQL 0,065 a 6,5) ---');
const rep = [];
for (const L of LETTERS) {
  const groups = new Map();
  for (const aql of AQLS) {
    const k = fmtPlan(srv[L][aql]);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(aql);
  }
  for (const [k, aqls] of groups) if (aqls.length > 1) rep.push({ L, k, aqls });
}
const show = (r) => `  ${r.L} (n=${N[r.L]})  ${r.k.padEnd(6)} em AQL ${r.aqls.map(fmtAql).join(' / ')}`;
console.log('Fora de 0/1 e 21/22:');
rep.filter((r) => r.k !== '0/1' && r.k !== '21/22').forEach((r) => console.log(show(r)));
console.log('0/1 repetido:');
rep.filter((r) => r.k === '0/1').forEach((r) => console.log(show(r)));
console.log('21/22 repetido:');
rep.filter((r) => r.k === '21/22').forEach((r) => console.log(show(r)));
