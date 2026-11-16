#!/usr/bin/env node
/*
 * tools/gen-aql-vectors.js — exporta tests/aql-vectors.json (+ .sha256) a
 * partir do aql-calc.js, para outras implementações (app, servidor)
 * conferirem os seus resultados. Determinístico: sem datas nem ordem
 * variável, para o hash só mudar quando os dados mudam.
 *
 * Uso: node tools/gen-aql-vectors.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Aql = require('../aql-calc.js');

const OUT = path.join(__dirname, '..', 'tests', 'aql-vectors.json');
const SHA = path.join(__dirname, '..', 'tests', 'aql-vectors.sha256');

const AQLS = Aql.supportedAqls();
const DEFAULT_AQL = { critical: 0, major: 2.5, minor: 4 };
const LEVELS = ['I', 'II', 'III'];
const BOUNDARY_LOTS = [
  2, 8, 9, 15, 16, 25, 26, 50, 51, 90, 91, 150, 151, 280, 281, 500, 501, 1200, 1201,
  3200, 3201, 10000, 10001, 35000, 35001, 150000, 150001, 500000, 500001, 1000000,
];

// --- células da Tabela 2-A (colunas verified:true), setas incluídas -------
const cells = [];
for (const aql of AQLS) {
  for (const letter of Aql.LETTERS) {
    const p = Aql.lookupPlan(letter, aql);
    cells.push({
      letter, n: Aql.SAMPLE_SIZE[letter], aql,
      kind: p.source, useLetter: p.useLetter, sampleSize: p.sampleSize, ac: p.ac, re: p.re,
    });
  }
}

// --- casos ponta a ponta ----------------------------------------------------
function expected(r) {
  const perClass = {};
  for (const cls of Aql.CLASSES) {
    const c = r.perClass[cls];
    perClass[cls] = { sampleSize: c.sampleSize, ac: c.ac, re: c.re, source: c.source, useLetter: c.useLetter };
  }
  return { code: r.code, perClass, inspectAll: r.inspectAll };
}
function caseFor(level, lot, aql, label) {
  const input = { level, lot, aql: { ...aql } };
  const c = { ...input, expected: expected(Aql.calcAql(input)) };
  if (label) c.label = label;
  return c;
}

const cases = [];
// Exemplos de referência (ponto 3).
cases.push(caseFor('II', 20, DEFAULT_AQL, 'lote 20, AQL 2,5: C, n=5, 0/1'));
cases.push(caseFor('II', 60, DEFAULT_AQL, 'lote 60, AQL 2,5: E, ↓F, n=20, 1/2'));
cases.push(caseFor('II', 1000, DEFAULT_AQL, 'lote 1000, AQL 2,5: J, n=80, 5/6'));
cases.push(caseFor('II', 3500, DEFAULT_AQL, 'lote 3500, AQL 2,5: L, n=200, 10/11'));
// Fronteiras de lote dos níveis I, II e III, com os AQL por omissão.
for (const level of LEVELS) {
  for (const lot of BOUNDARY_LOTS) cases.push(caseFor(level, lot, DEFAULT_AQL));
}
// Críticos com AQL da tabela, setas ↑ e inspeção a 100 %.
cases.push(caseFor('II', 1000, { critical: 0.65, major: 1, minor: 2.5 }, 'críticos com AQL 0,65'));
cases.push(caseFor('II', 150, { critical: 0.065, major: 2.5, minor: 4 }, 'AQL 0,065: plano n=200 ≥ lote → 100 %'));
cases.push(caseFor('II', 5, DEFAULT_AQL, 'lote 5: maiores ↓C n=5 = lote → 100 %'));
cases.push(caseFor('III', 500000, { critical: 0, major: 6.5, minor: 6.5 }, 'AQL 6,5 na letra Q: seta ↑ para L'));

// --- casos de erro -------------------------------------------------------------
const E = Aql.ERRORS;
const errors = [
  { level: 'II', lot: 1, aql: DEFAULT_AQL, expectedError: E.LOT_TOO_SMALL },
  { level: 'II', lot: 0, aql: DEFAULT_AQL, expectedError: E.LOT_TOO_SMALL },
  { level: 'II', lot: 10.5, aql: DEFAULT_AQL, expectedError: E.LOT_NOT_INTEGER },
  { level: 'II', lot: null, aql: DEFAULT_AQL, expectedError: E.LOT_REQUIRED },
  { level: 'S-1', lot: 1000, aql: DEFAULT_AQL, expectedError: E.LEVEL_UNSUPPORTED },
  { level: 'IV', lot: 1000, aql: DEFAULT_AQL, expectedError: E.LEVEL_INVALID },
  { level: 'II', lot: 1000, aql: { critical: 0, major: 2.6, minor: 4 }, expectedError: E.AQL_INVALID },
  { level: 'II', lot: 1000, aql: { critical: 0, major: 10, minor: 4 }, expectedError: E.AQL_UNSUPPORTED },
  { level: 'II', lot: 1000, aql: { critical: 0, major: 0, minor: 4 }, expectedError: E.AQL_ZERO_NOT_CRITICAL },
];
for (const e of errors) {
  let code = null;
  try { Aql.calcAql({ level: e.level, lot: e.lot, aql: e.aql }); } catch (err) { code = err.code; }
  if (code !== e.expectedError) throw new Error(`erro esperado ${e.expectedError}, obtido ${code} (${JSON.stringify(e)})`);
}

const doc = {
  format: 'hcr-aql-vectors/1',
  standard: 'ISO 2859-1 / ANSI/ASQ Z1.4',
  table: 'Tabela 1 (letras-código, níveis I/II/III) e Tabela 2-A (inspeção normal, amostragem simples)',
  source: Aql.SOURCE,
  generatedBy: 'tools/gen-aql-vectors.js a partir de aql-calc.js',
  semantics: {
    aql: 'valores normalizados; 0 só nos críticos (tolerância zero: Ac 0 / Re 1 com a amostra da letra-código)',
    cells: 'kind: plan | arrowDown (usa o primeiro plano abaixo) | arrowUp (usa o primeiro plano acima); sampleSize/ac/re são os do plano usado (useLetter)',
    cases: 'perClass.sampleSize é a amostra a inspecionar: a do plano, ou o lote se o plano for igual ou maior (100 %); source zeroTolerance = AQL 0; inspectAll = alguma classe a 100 %',
    errors: 'expectedError é o código do erro (AqlError.code)',
  },
  aqlColumns: AQLS,
  levels: LEVELS,
  cells,
  cases,
  errors,
};

const json = JSON.stringify(doc, null, 2) + '\n';
fs.writeFileSync(OUT, json, { encoding: 'utf8' });
const hash = crypto.createHash('sha256').update(json, 'utf8').digest('hex');
fs.writeFileSync(SHA, `${hash}  aql-vectors.json\n`, { encoding: 'utf8' });
console.log(`tests/aql-vectors.json: ${cells.length} células, ${cases.length} casos, ${errors.length} erros`);
console.log(`sha256 ${hash}`);
