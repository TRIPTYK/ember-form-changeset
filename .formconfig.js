module.exports = {
  custom: ['checkbox'],
  overrides: {
    text: (type, name) => `<Custom @type="${type}" @name={{${name}}} />`,
    checkbox: (type, name) => `<Checkbox@type="${type}" @name={{${name}}}  />`,
  },
};
