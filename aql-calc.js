/*
 * HCR Digital Solutions — aql-calc.js
 * Calculadora AQL: inspeção NORMAL por atributos, amostragem SIMPLES.
 * Puro e sem dependências; UMD (browser: window.AqlCalc; Node: require).
 *
 * Fonte dos dados: reprodução V-Trust das tabelas A (letras-código) e
 * B (planos de amostragem simples, inspeção normal) da ISO 2859-1 /
 * ANSI/ASQ Z1.4 — Tabela 1 e Tabela 2-A da ISO 2859-1. Valores a confirmar
 * contra a norma impressa. Não cobre inspeção reduzida/apertada, amostragem
 * dupla/múltipla nem os níveis especiais S-1 a S-4.
 *
 * calcAql({ lot, level, aql: { critical, major, minor } }) →
 *   { code, codeSampleSize, sampleSize, inspectAll, perClass, notes }
 * Erros: lança AqlError com .code (ver ERRORS).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AqlCalc = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SOURCE = 'reprodução V-Trust da Tabela B (ISO 2859-1 / ANSI Z1.4); a confirmar na norma impressa';

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R'];
  var SAMPLE_SIZE = { A: 2, B: 3, C: 5, D: 8, E: 13, F: 20, G: 32, H: 50, J: 80, K: 125, L: 200, M: 315, N: 500, P: 800, Q: 1250, R: 2000 };

  // Níveis de inspeção. Só os gerais I, II e III estão verificados; os
  // especiais ficam fora da calculadora (sem dados).
  var LEVELS = {
    I: { verified: true }, II: { verified: true }, III: { verified: true },
    'S-1': { verified: false }, 'S-2': { verified: false }, 'S-3': { verified: false }, 'S-4': { verified: false },
  };

  // Tabela 1 (letras-código), níveis gerais I / II / III. max: null = "e mais".
  var CODE_LETTERS = [
    { min: 2,      max: 8,      I: 'A', II: 'A', III: 'B' },
    { min: 9,      max: 15,     I: 'A', II: 'B', III: 'C' },
    { min: 16,     max: 25,     I: 'B', II: 'C', III: 'D' },
    { min: 26,     max: 50,     I: 'C', II: 'D', III: 'E' },
    { min: 51,     max: 90,     I: 'C', II: 'E', III: 'F' },
    { min: 91,     max: 150,    I: 'D', II: 'F', III: 'G' },
    { min: 151,    max: 280,    I: 'E', II: 'G', III: 'H' },
    { min: 281,    max: 500,    I: 'F', II: 'H', III: 'J' },
    { min: 501,    max: 1200,   I: 'G', II: 'J', III: 'K' },
    { min: 1201,   max: 3200,   I: 'H', II: 'K', III: 'L' },
    { min: 3201,   max: 10000,  I: 'J', II: 'L', III: 'M' },
    { min: 10001,  max: 35000,  I: 'K', II: 'M', III: 'N' },
    { min: 35001,  max: 150000, I: 'L', II: 'N', III: 'P' },
    { min: 150001, max: 500000, I: 'M', II: 'P', III: 'Q' },
    { min: 500001, max: null,   I: 'N', II: 'Q', III: 'R' },
  ];

  // Tabela 2-A (inspeção normal, amostragem simples). Uma coluna por AQL,
  // uma célula por letra A…R: "Ac/Re", "v" (seta para baixo: usa o primeiro
  // plano abaixo, com a amostra dele) ou "^" (seta para cima: usa o primeiro
  // plano acima, com a amostra dele).
  var v = 'v', u = '^';
  var PLAN_TABLE = {
    //            A    B    C    D    E    F    G    H    J      K      L      M      N      P      Q      R
    '0.065': { verified: true, cells: [v, v, v, v, v, v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4'] },
    '0.1':   { verified: true, cells: [v, v, v, v, v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6'] },
    '0.15':  { verified: true, cells: [v, v, v, v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8'] },
    '0.25':  { verified: true, cells: [v, v, v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11'] },
    '0.4':   { verified: true, cells: [v, v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15'] },
    '0.65':  { verified: true, cells: [v, v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22'] },
    '1':     { verified: true, cells: [v, v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22', u] },
    '1.5':   { verified: true, cells: [v, v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22', u, u] },
    '2.5':   { verified: true, cells: [v, v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22', u, u, u] },
    '4':     { verified: true, cells: [v, '0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22', u, u, u, u] },
    '6.5':   { verified: true, cells: ['0/1', u, v, '1/2', '2/3', '3/4', '5/6', '7/8', '10/11', '14/15', '21/22', u, u, u, u, u] },
    // Fora da calculadora até serem conferidas contra a norma.
    '10':    { verified: false, cells: null },
    '15':    { verified: false, cells: null },
  };

  // AQL 0 não existe na norma: prática de tolerância zero (Ac 0 / Re 1, com
  // a amostra da letra-código). Só para defeitos críticos.
  var ZERO = 0;

  var CLASSES = ['critical', 'major', 'minor'];

  var ERRORS = {
    LOT_REQUIRED: 'LOT_REQUIRED',         // vazio / ausente
    LOT_NOT_INTEGER: 'LOT_NOT_INTEGER',   // não é inteiro (ou não é número)
    LOT_TOO_SMALL: 'LOT_TOO_SMALL',       // < 2
    LEVEL_INVALID: 'LEVEL_INVALID',       // não é I, II, III
    LEVEL_UNSUPPORTED: 'LEVEL_UNSUPPORTED', // S-1…S-4 (verified:false)
    AQL_REQUIRED: 'AQL_REQUIRED',
    AQL_INVALID: 'AQL_INVALID',           // não é um valor normalizado da tabela
    AQL_UNSUPPORTED: 'AQL_UNSUPPORTED',   // coluna verified:false (10, 15)
    AQL_ZERO_NOT_CRITICAL: 'AQL_ZERO_NOT_CRITICAL', // AQL 0 fora dos críticos
  };

  function AqlError(code, message, details) {
    var e = new Error(message);
    e.name = 'AqlError';
    e.code = code;
    if (details) e.details = details;
    return e;
  }

  function aqlKey(value) {
    if (typeof value !== 'number' || !isFinite(value)) return null;
    for (var k in PLAN_TABLE) {
      if (Object.prototype.hasOwnProperty.call(PLAN_TABLE, k) && Math.abs(Number(k) - value) < 1e-9) return k;
    }
    return null;
  }

  // Valores de AQL que a calculadora oferece (colunas verified:true), por ordem.
  function supportedAqls() {
    return Object.keys(PLAN_TABLE)
      .filter(function (k) { return PLAN_TABLE[k].verified; })
      .map(Number)
      .sort(function (a, b) { return a - b; });
  }

  function validateLot(lot) {
    if (lot === undefined || lot === null || lot === '') throw AqlError(ERRORS.LOT_REQUIRED, 'Lot size is required.');
    if (typeof lot !== 'number' || !isFinite(lot) || !Number.isInteger(lot) || !Number.isSafeInteger(lot)) {
      throw AqlError(ERRORS.LOT_NOT_INTEGER, 'Lot size must be a whole number.', { lot: lot });
    }
    if (lot < 2) throw AqlError(ERRORS.LOT_TOO_SMALL, 'Lot size must be at least 2.', { lot: lot });
  }

  function validateLevel(level) {
    if (!Object.prototype.hasOwnProperty.call(LEVELS, level)) {
      throw AqlError(ERRORS.LEVEL_INVALID, 'Inspection level must be I, II or III.', { level: level });
    }
    if (!LEVELS[level].verified) {
      throw AqlError(ERRORS.LEVEL_UNSUPPORTED, 'Special inspection levels are not supported.', { level: level });
    }
  }

  // Letra-código para um lote e nível (Tabela 1).
  function codeLetter(lot, level) {
    validateLot(lot);
    validateLevel(level);
    for (var i = 0; i < CODE_LETTERS.length; i++) {
      var r = CODE_LETTERS[i];
      if (lot >= r.min && (r.max === null || lot <= r.max)) return r[level];
    }
    throw AqlError(ERRORS.LOT_TOO_SMALL, 'Lot size must be at least 2.', { lot: lot });
  }

  function parsePlan(cell) {
    var p = cell.split('/');
    return { ac: Number(p[0]), re: Number(p[1]) };
  }

  // Resolve uma célula da Tabela 2-A, seguindo as setas.
  // → { source: 'plan'|'arrowDown'|'arrowUp', useLetter, sampleSize, ac, re }
  function lookupPlan(letter, aql) {
    var key = aqlKey(aql);
    if (key === null) throw AqlError(ERRORS.AQL_INVALID, 'AQL must be one of the standard values.', { aql: aql });
    var col = PLAN_TABLE[key];
    if (!col.verified) throw AqlError(ERRORS.AQL_UNSUPPORTED, 'This AQL value is not supported.', { aql: aql });
    var i = LETTERS.indexOf(letter);
    if (i < 0) throw new Error('Unknown code letter: ' + letter);
    var cell = col.cells[i];
    var source = 'plan';
    var j = i;
    if (cell === v) {
      source = 'arrowDown';
      while (j < LETTERS.length && (col.cells[j] === v || col.cells[j] === u)) j++;
    } else if (cell === u) {
      source = 'arrowUp';
      while (j >= 0 && (col.cells[j] === v || col.cells[j] === u)) j--;
    }
    if (j < 0 || j >= LETTERS.length) throw new Error('Arrow without a plan at ' + letter + ' / AQL ' + key);
    var plan = parsePlan(col.cells[j]);
    return { source: source, useLetter: LETTERS[j], sampleSize: SAMPLE_SIZE[LETTERS[j]], ac: plan.ac, re: plan.re };
  }

  function calcAql(input) {
    input = input || {};
    var lot = input.lot;
    var level = input.level === undefined ? 'II' : input.level;
    var aqls = input.aql || {};
    validateLot(lot);
    validateLevel(level);

    // Validar todas as classes antes de calcular.
    CLASSES.forEach(function (cls) {
      var a = aqls[cls];
      if (a === undefined || a === null || a === '') throw AqlError(ERRORS.AQL_REQUIRED, 'AQL is required for ' + cls + '.', { cls: cls });
      if (a === ZERO) {
        if (cls !== 'critical') throw AqlError(ERRORS.AQL_ZERO_NOT_CRITICAL, 'AQL 0 is only allowed for critical defects.', { cls: cls });
        return;
      }
      var key = aqlKey(a);
      if (key === null) throw AqlError(ERRORS.AQL_INVALID, 'AQL must be one of the standard values.', { cls: cls, aql: a });
      if (!PLAN_TABLE[key].verified) throw AqlError(ERRORS.AQL_UNSUPPORTED, 'This AQL value is not supported.', { cls: cls, aql: a });
    });

    var code = codeLetter(lot, level);
    var codeN = SAMPLE_SIZE[code];
    var perClass = {};
    var notes = [];

    CLASSES.forEach(function (cls) {
      var a = aqls[cls];
      var r;
      if (a === ZERO) {
        r = { source: 'zeroTolerance', useLetter: code, sampleSize: codeN, ac: 0, re: 1 };
        notes.push({ code: 'AQL_ZERO', cls: cls });
      } else {
        r = lookupPlan(code, a);
        if (r.source !== 'plan') {
          notes.push({ code: r.source === 'arrowDown' ? 'ARROW_DOWN' : 'ARROW_UP', cls: cls, from: code, to: r.useLetter, sampleSize: r.sampleSize });
        }
      }
      var inspectAll = r.sampleSize >= lot;
      perClass[cls] = {
        aql: a,
        source: r.source,
        useLetter: r.useLetter,
        planSampleSize: r.sampleSize,
        sampleSize: inspectAll ? lot : r.sampleSize,
        inspectAll: inspectAll,
        ac: r.ac,
        re: r.re,
      };
      if (inspectAll) notes.push({ code: 'INSPECT_ALL', cls: cls, lot: lot, planSampleSize: r.sampleSize });
    });

    var sizes = CLASSES.map(function (c) { return perClass[c].sampleSize; });
    var sampleSize = Math.max.apply(null, sizes);
    var distinct = sizes.filter(function (s, i) { return sizes.indexOf(s) === i; });
    if (distinct.length > 1) notes.push({ code: 'DIFFERENT_SAMPLE_SIZES', sizes: sizes.slice(), largest: sampleSize });

    return {
      lot: lot,
      level: level,
      code: code,
      codeSampleSize: codeN,
      sampleSize: sampleSize,
      inspectAll: sampleSize >= lot,
      perClass: perClass,
      notes: notes,
    };
  }

  return {
    SOURCE: SOURCE,
    LETTERS: LETTERS,
    SAMPLE_SIZE: SAMPLE_SIZE,
    LEVELS: LEVELS,
    CODE_LETTERS: CODE_LETTERS,
    PLAN_TABLE: PLAN_TABLE,
    CLASSES: CLASSES,
    ERRORS: ERRORS,
    supportedAqls: supportedAqls,
    codeLetter: codeLetter,
    lookupPlan: lookupPlan,
    calcAql: calcAql,
  };
});
