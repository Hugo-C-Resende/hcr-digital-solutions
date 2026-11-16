// Testes do aql-calc.js — node --test tests/
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Aql = require('../aql-calc.js');

const { calcAql, codeLetter, lookupPlan, PLAN_TABLE, LETTERS, SAMPLE_SIZE, ERRORS } = Aql;

// ---------------------------------------------------------------------------
// Regra de construção da Tabela 2-A (conferida contra a reprodução V-Trust):
// S0 = letra onde n·AQL/100 ≈ 0,125 → 0/1; antes de S0: ↓; S0+1: ↑;
// S0+2: ↓; S0+3…S0+10: 1/2 … 21/22; depois: ↑.
// ---------------------------------------------------------------------------
function ruleColumn(aql) {
  let s = 0;
  let best = Infinity;
  LETTERS.forEach((L, i) => {
    const d = Math.abs(SAMPLE_SIZE[L] * aql / 100 - 0.125);
    if (d < best) { best = d; s = i; }
  });
  const seq = [1, 2, 3, 5, 7, 10, 14, 21];
  return LETTERS.map((L, i) => {
    if (i < s) return 'v';
    if (i === s) return '0/1';
    if (i === s + 1) return '^';
    if (i === s + 2) return 'v';
    const k = i - (s + 3);
    if (k < seq.length) return `${seq[k]}/${seq[k] + 1}`;
    return '^';
  });
}

const verifiedAqls = Object.keys(PLAN_TABLE).filter((k) => PLAN_TABLE[k].verified);

test('a tabela literal (colunas verified:true) é igual à gerada pela regra', () => {
  const diffs = [];
  for (const k of verifiedAqls) {
    const expected = ruleColumn(Number(k));
    PLAN_TABLE[k].cells.forEach((cell, i) => {
      if (cell !== expected[i]) diffs.push(`${LETTERS[i]} @ AQL ${k}: tabela=${cell} regra=${expected[i]}`);
    });
  }
  assert.deepEqual(diffs, [], `células diferentes:\n${diffs.join('\n')}`);
});

test('colunas verificadas: exatamente 0,065 a 6,5; 10 e 15 ficam fora', () => {
  assert.deepEqual(Aql.supportedAqls(), [0.065, 0.1, 0.15, 0.25, 0.4, 0.65, 1, 1.5, 2.5, 4, 6.5]);
  assert.equal(PLAN_TABLE['10'].verified, false);
  assert.equal(PLAN_TABLE['15'].verified, false);
});

// ---------------------------------------------------------------------------
// Letras-código por lote (Tabela 1) — níveis I, II e III, fronteiras
// ---------------------------------------------------------------------------
const BOUNDARIES = [
  // lote, I, II, III
  [2, 'A', 'A', 'B'], [8, 'A', 'A', 'B'], [9, 'A', 'B', 'C'], [15, 'A', 'B', 'C'],
  [16, 'B', 'C', 'D'], [25, 'B', 'C', 'D'], [26, 'C', 'D', 'E'], [50, 'C', 'D', 'E'],
  [51, 'C', 'E', 'F'], [90, 'C', 'E', 'F'], [91, 'D', 'F', 'G'], [150, 'D', 'F', 'G'],
  [151, 'E', 'G', 'H'], [280, 'E', 'G', 'H'], [281, 'F', 'H', 'J'], [500, 'F', 'H', 'J'],
  [501, 'G', 'J', 'K'], [1200, 'G', 'J', 'K'], [1201, 'H', 'K', 'L'], [3200, 'H', 'K', 'L'],
  [3201, 'J', 'L', 'M'], [10000, 'J', 'L', 'M'], [10001, 'K', 'M', 'N'], [35000, 'K', 'M', 'N'],
  [35001, 'L', 'N', 'P'], [150000, 'L', 'N', 'P'], [150001, 'M', 'P', 'Q'], [500000, 'M', 'P', 'Q'],
  [500001, 'N', 'Q', 'R'], [1000000, 'N', 'Q', 'R'],
];

test('letra-código nas fronteiras de lote (níveis I, II, III)', () => {
  for (const [lot, I, II, III] of BOUNDARIES) {
    assert.equal(codeLetter(lot, 'I'), I, `lote ${lot}, nível I`);
    assert.equal(codeLetter(lot, 'II'), II, `lote ${lot}, nível II`);
    assert.equal(codeLetter(lot, 'III'), III, `lote ${lot}, nível III`);
  }
});

test('nível II: letra e amostra da letra (casos conhecidos)', () => {
  const cases = [
    [2, 'A', 2], [8, 'A', 2], [9, 'B', 3], [15, 'B', 3], [16, 'C', 5], [50, 'D', 8], [51, 'E', 13],
    [90, 'E', 13], [91, 'F', 20], [150, 'F', 20], [151, 'G', 32], [280, 'G', 32], [281, 'H', 50],
    [500, 'H', 50], [501, 'J', 80], [1200, 'J', 80], [1201, 'K', 125], [3200, 'K', 125], [3201, 'L', 200],
    [10000, 'L', 200], [10001, 'M', 315], [35000, 'M', 315], [35001, 'N', 500], [150000, 'N', 500],
    [150001, 'P', 800], [500000, 'P', 800], [500001, 'Q', 1250], [1000000, 'Q', 1250],
  ];
  for (const [lot, letter, n] of cases) {
    const r = calcAql({ lot, level: 'II', aql: { critical: 0, major: 2.5, minor: 4 } });
    assert.equal(r.code, letter, `lote ${lot}`);
    assert.equal(r.codeSampleSize, n, `lote ${lot}`);
  }
});

test('níveis I e III: lote 1000 e lote 1 000 000', () => {
  assert.equal(codeLetter(1000, 'I'), 'G');
  assert.equal(SAMPLE_SIZE.G, 32);
  assert.equal(codeLetter(1000, 'III'), 'K');
  assert.equal(SAMPLE_SIZE.K, 125);
  assert.equal(codeLetter(1000000, 'I'), 'N');
  assert.equal(SAMPLE_SIZE.N, 500);
  assert.equal(codeLetter(1000000, 'III'), 'R');
  assert.equal(SAMPLE_SIZE.R, 2000);
});

// ---------------------------------------------------------------------------
// Ac/Re
// ---------------------------------------------------------------------------
test('Ac/Re em planos diretos (AQL 2,5 / 4,0 / 1,0)', () => {
  const at = (letter, aql) => { const p = lookupPlan(letter, aql); return `${p.ac}/${p.re}`; };
  assert.equal(at('H', 2.5), '3/4');
  assert.equal(at('J', 2.5), '5/6');
  assert.equal(at('K', 2.5), '7/8');
  assert.equal(at('L', 2.5), '10/11');
  assert.equal(at('H', 4), '5/6');
  assert.equal(at('J', 4), '7/8');
  assert.equal(at('K', 4), '10/11');
  assert.equal(at('L', 4), '14/15');
  assert.equal(at('J', 1), '2/3');
});

// ---------------------------------------------------------------------------
// Casos ponta a ponta do ponto 3
// ---------------------------------------------------------------------------
const DEFAULT_AQL = { critical: 0, major: 2.5, minor: 4 };

test('lote 20, nível II, AQL 2,5 → C, n=5, 0/1', () => {
  const r = calcAql({ lot: 20, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.code, 'C');
  assert.deepEqual(pick(r.perClass.major), { source: 'plan', useLetter: 'C', sampleSize: 5, ac: 0, re: 1 });
});

test('lote 60, nível II, AQL 2,5 → E, ↓F, n=20, 1/2', () => {
  const r = calcAql({ lot: 60, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.code, 'E');
  assert.deepEqual(pick(r.perClass.major), { source: 'arrowDown', useLetter: 'F', sampleSize: 20, ac: 1, re: 2 });
  assert.ok(r.notes.some((n) => n.code === 'ARROW_DOWN' && n.cls === 'major' && n.to === 'F'));
});

test('lote 1000, nível II, AQL 2,5 → J, n=80, 5/6', () => {
  const r = calcAql({ lot: 1000, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.code, 'J');
  assert.deepEqual(pick(r.perClass.major), { source: 'plan', useLetter: 'J', sampleSize: 80, ac: 5, re: 6 });
  assert.deepEqual(pick(r.perClass.minor), { source: 'plan', useLetter: 'J', sampleSize: 80, ac: 7, re: 8 });
  assert.equal(r.sampleSize, 80);
  assert.equal(r.inspectAll, false);
});

test('lote 3500, nível II, AQL 2,5 → L, n=200, 10/11', () => {
  const r = calcAql({ lot: 3500, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.code, 'L');
  assert.deepEqual(pick(r.perClass.major), { source: 'plan', useLetter: 'L', sampleSize: 200, ac: 10, re: 11 });
});

// ---------------------------------------------------------------------------
// Setas
// ---------------------------------------------------------------------------
test('setas: ↑ usa o plano acima, ↓ o plano abaixo, cada um com a sua amostra', () => {
  // AQL 2,5: D é ↑ (usa C: 0/1, n=5); B é ↓ (usa C).
  assert.deepEqual(lookupPlan('D', 2.5), { source: 'arrowUp', useLetter: 'C', sampleSize: 5, ac: 0, re: 1 });
  assert.deepEqual(lookupPlan('B', 2.5), { source: 'arrowDown', useLetter: 'C', sampleSize: 5, ac: 0, re: 1 });
  // AQL 2,5: depois do 21/22 (N), P/Q/R são ↑ (usa N: 21/22, n=500).
  assert.deepEqual(lookupPlan('R', 2.5), { source: 'arrowUp', useLetter: 'N', sampleSize: 500, ac: 21, re: 22 });
  // AQL 0,065: A…K ↓ (usa L: 0/1, n=200).
  assert.deepEqual(lookupPlan('A', 0.065), { source: 'arrowDown', useLetter: 'L', sampleSize: 200, ac: 0, re: 1 });
});

test('setas mudam a amostra por classe: nota DIFFERENT_SAMPLE_SIZES e amostra global = maior', () => {
  // Lote 60 (E): maior 2,5 → ↓F n=20; menor 4,0 → E 1/2 n=13; críticos AQL 0 → n=13.
  const r = calcAql({ lot: 60, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.perClass.major.sampleSize, 20);
  assert.equal(r.perClass.minor.sampleSize, 13);
  assert.equal(r.perClass.critical.sampleSize, 13);
  assert.equal(r.sampleSize, 20);
  assert.ok(r.notes.some((n) => n.code === 'DIFFERENT_SAMPLE_SIZES' && n.largest === 20));
});

// ---------------------------------------------------------------------------
// AQL 0 nos críticos
// ---------------------------------------------------------------------------
test('AQL 0 (críticos) → Ac 0 / Re 1 com a amostra da letra e nota AQL_ZERO', () => {
  const r = calcAql({ lot: 1000, level: 'II', aql: DEFAULT_AQL });
  assert.deepEqual(pick(r.perClass.critical), { source: 'zeroTolerance', useLetter: 'J', sampleSize: 80, ac: 0, re: 1 });
  assert.ok(r.notes.some((n) => n.code === 'AQL_ZERO'));
});

test('AQL 0 só é aceite nos críticos', () => {
  assertErr(() => calcAql({ lot: 1000, level: 'II', aql: { critical: 0, major: 0, minor: 4 } }), ERRORS.AQL_ZERO_NOT_CRITICAL);
});

test('críticos com AQL da tabela (ex.: 0,65) seguem a tabela', () => {
  const r = calcAql({ lot: 1000, level: 'II', aql: { critical: 0.65, major: 2.5, minor: 4 } });
  assert.deepEqual(pick(r.perClass.critical), { source: 'plan', useLetter: 'J', sampleSize: 80, ac: 1, re: 2 });
});

// ---------------------------------------------------------------------------
// Inspeção a 100 %
// ---------------------------------------------------------------------------
test('amostra do plano ≥ lote → inspeção a 100 % (amostra = lote)', () => {
  // Lote 5, nível II → A (n=2); AQL 2,5 em A é ↓ (usa C, n=5) → 5 ≥ 5.
  const r = calcAql({ lot: 5, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r.code, 'A');
  assert.equal(r.perClass.major.planSampleSize, 5);
  assert.equal(r.perClass.major.sampleSize, 5);
  assert.equal(r.perClass.major.inspectAll, true);
  assert.equal(r.inspectAll, true);
  assert.ok(r.notes.some((n) => n.code === 'INSPECT_ALL' && n.cls === 'major'));
  // Lote 2, nível II → A (n=2) → críticos AQL 0 com n=2 = lote.
  const r2 = calcAql({ lot: 2, level: 'II', aql: DEFAULT_AQL });
  assert.equal(r2.perClass.critical.inspectAll, true);
  assert.equal(r2.sampleSize, 2);
});

test('AQL 0,065 com lote pequeno: plano de n=200 → inspecionar tudo', () => {
  const r = calcAql({ lot: 150, level: 'II', aql: { critical: 0.065, major: 2.5, minor: 4 } });
  assert.equal(r.perClass.critical.planSampleSize, 200);
  assert.equal(r.perClass.critical.sampleSize, 150);
  assert.equal(r.perClass.critical.inspectAll, true);
});

// ---------------------------------------------------------------------------
// Entradas inválidas
// ---------------------------------------------------------------------------
test('entradas inválidas dão erro com código', () => {
  const ok = { level: 'II', aql: DEFAULT_AQL };
  assertErr(() => calcAql({ ...ok, lot: undefined }), ERRORS.LOT_REQUIRED);
  assertErr(() => calcAql({ ...ok, lot: '' }), ERRORS.LOT_REQUIRED);
  assertErr(() => calcAql({ ...ok, lot: 0 }), ERRORS.LOT_TOO_SMALL);
  assertErr(() => calcAql({ ...ok, lot: 1 }), ERRORS.LOT_TOO_SMALL);
  assertErr(() => calcAql({ ...ok, lot: -5 }), ERRORS.LOT_TOO_SMALL);
  assertErr(() => calcAql({ ...ok, lot: 10.5 }), ERRORS.LOT_NOT_INTEGER);
  assertErr(() => calcAql({ ...ok, lot: '100' }), ERRORS.LOT_NOT_INTEGER);
  assertErr(() => calcAql({ ...ok, lot: NaN }), ERRORS.LOT_NOT_INTEGER);
  assertErr(() => calcAql({ ...ok, lot: Infinity }), ERRORS.LOT_NOT_INTEGER);
  assertErr(() => calcAql({ lot: 100, level: 'IV', aql: DEFAULT_AQL }), ERRORS.LEVEL_INVALID);
  assertErr(() => calcAql({ lot: 100, level: 'S-1', aql: DEFAULT_AQL }), ERRORS.LEVEL_UNSUPPORTED);
  assertErr(() => calcAql({ lot: 100, level: 'II', aql: { critical: 0, major: 2.6, minor: 4 } }), ERRORS.AQL_INVALID);
  assertErr(() => calcAql({ lot: 100, level: 'II', aql: { critical: 0, major: 10, minor: 4 } }), ERRORS.AQL_UNSUPPORTED);
  assertErr(() => calcAql({ lot: 100, level: 'II', aql: { critical: 0, major: 2.5 } }), ERRORS.AQL_REQUIRED);
  assertErr(() => calcAql({ lot: 100, level: 'II', aql: { critical: 0, major: '2.5', minor: 4 } }), ERRORS.AQL_INVALID);
});

test('nível por omissão é II', () => {
  assert.equal(calcAql({ lot: 1000, aql: DEFAULT_AQL }).code, 'J');
});

// ---------------------------------------------------------------------------
function pick(c) {
  return { source: c.source, useLetter: c.useLetter, sampleSize: c.sampleSize, ac: c.ac, re: c.re };
}
function assertErr(fn, code) {
  assert.throws(fn, (e) => e && e.name === 'AqlError' && e.code === code, `esperado erro ${code}`);
}
