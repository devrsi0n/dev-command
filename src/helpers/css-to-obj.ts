import { parse } from 'css';
import stylis from 'stylis';

const SEL = '_';
const SELRE = new RegExp(`^${SEL}`);

const camel = str =>
  str.replace(/(-[a-z])/g, x => x.toUpperCase()).replace(/-/g, '');

const parsePx = val =>
  /px$/.test(val) ? parseFloat(val.replace(/px$/, '')) : val;

interface Opts {
  camelCase?: boolean;
  numbers?: boolean;
}

const getDeclarations = (decs, opts: Opts = {}) => {
  const result = decs
    .map(d => ({
      key: opts.camelCase ? camel(d.property) : d.property,
      value: opts.numbers ? parsePx(d.value) : d.value,
    }))
    .reduce((a, b) => {
      const copyA = a;
      copyA[b.key] = b.value;
      return copyA;
    }, {});
  return result;
};

/* eslint-disable no-param-reassign */
const transform = opts => (rules, result = {}) => {
  rules.forEach(rule => {
    if (rule.type === 'media') {
      const key = `@media ${rule.media}`;
      const decs = transform(opts)(rule.rules);
      result[key] = decs;
      return;
    }

    const [selector] = rule.selectors;
    const key = selector
      .replace(SELRE, '')
      .trim()
      .replace(/(-[a-z])/g, x => x.toUpperCase())
      .replace(/-/g, '')
      .replace(/\./g, '');

    if (key.length) {
      Object.assign(result, {
        [key]: getDeclarations(rule.declarations, opts),
      });
    } else {
      Object.assign(result, getDeclarations(rule.declarations, opts));
    }
  });
  return result;
};

const toObj = (css, opts) => {
  stylis.set({
    prefix: false,
    preserve: true,
  });
  const wrapped = stylis(SEL, css);
  const ast = parse(wrapped);
  const obj = transform(opts)(ast.stylesheet.rules);
  return obj;
};

export default toObj;
