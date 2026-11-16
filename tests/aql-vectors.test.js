// Confere tests/aql-vectors.json: hash, fins de linha e reprodução pelo módulo.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Aql = require('../aql-calc.js');

const JSON_PATH = path.join(__dirname, 'aql-vectors.json');
const SHA_PATH = path.join(__dirname, 'aql-vectors.sha256');
const raw = fs.readFileSync(JSON_PATH);
const doc = JSON.parse(raw.toString('utf8'));

test('aql-vectors.sha256 confere com aql-vectors.json (formato sha256sum)', () => {
  const sha = fs.readFileSync(SHA_PATH, 'utf8');
  assert.match(sha, /^[0-9a-f]{64} {2}aql-vectors\.json\n$/);
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  assert.equal(sha.slice(0, 64), hash);
});

test('aql-vectors.json usa LF e termina com newline', () => {
  assert.equal(raw.includes(0x0d), false, 'tem CR');
  assert.equal(raw[raw.length - 1], 0x0a);
});

test('células: as 11 colunas verificadas × 16 letras, reproduzidas pelo módulo', () => {
  assert.deepEqual(doc.aqlColumns, Aql.supportedAqls());
  assert.equal(doc.cells.length, doc.aqlColumns.length * Aql.LETTERS.length);
  for (const c of doc.cells) {
    const p = Aql.lookupPlan(c.letter, c.aql);
    assert.deepEqual(
      { kind: p.source, useLetter: p.useLetter, sampleSize: p.sampleSize, ac: p.ac, re: p.re },
      { kind: c.kind, useLetter: c.useLetter, sampleSize: c.sampleSize, ac: c.ac, re: c.re },
      `${c.letter} @ AQL ${c.aql}`
    );
  }
});

test('casos ponta a ponta reproduzidos pelo módulo', () => {
  for (const c of doc.cases) {
    const r = Aql.calcAql({ level: c.level, lot: c.lot, aql: c.aql });
    const perClass = {};
    for (const cls of Aql.CLASSES) {
      const x = r.perClass[cls];
      perClass[cls] = { sampleSize: x.sampleSize, ac: x.ac, re: x.re, source: x.source, useLetter: x.useLetter };
    }
    assert.deepEqual({ code: r.code, perClass, inspectAll: r.inspectAll }, c.expected, `nível ${c.level}, lote ${c.lot}`);
  }
});

test('casos de erro reproduzidos pelo módulo', () => {
  for (const e of doc.errors) {
    assert.throws(() => Aql.calcAql({ level: e.level, lot: e.lot, aql: e.aql }),
      (err) => err.code === e.expectedError, `${JSON.stringify(e)}`);
  }
});

test('os vetores contêm os exemplos de referência', () => {
  const find = (lot) => doc.cases.find((c) => c.level === 'II' && c.lot === lot && c.aql.major === 2.5);
  assert.deepEqual(find(20).expected.perClass.major, { sampleSize: 5, ac: 0, re: 1, source: 'plan', useLetter: 'C' });
  assert.deepEqual(find(60).expected.perClass.major, { sampleSize: 20, ac: 1, re: 2, source: 'arrowDown', useLetter: 'F' });
  assert.deepEqual(find(1000).expected.perClass.major, { sampleSize: 80, ac: 5, re: 6, source: 'plan', useLetter: 'J' });
  assert.deepEqual(find(3500).expected.perClass.major, { sampleSize: 200, ac: 10, re: 11, source: 'plan', useLetter: 'L' });
});
