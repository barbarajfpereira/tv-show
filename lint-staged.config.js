module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
  '*.{css,json,md}': ['prettier --write', 'git add'],
};
