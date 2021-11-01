# **sraft-convert**

[![npm version](https://badge.fury.io/js/sraft-convert.svg)](https://www.npmjs.com/package/sraft-convert) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Installation

`npm install sraft-convert --save` or `yarn add sraft-convert`

## convertToHTML

**Extensibly serialize Draft.js [`ContentState`](http://facebook.github.io/draft-js/docs/api-reference-content-state.html#content) to HTML.**

**基本用法:**

```javascript
const html = convertToHTML(editorState.getCurrentContent());
```

**高级用法:**

```javascript
const html = convertToHTML(editorState.getCurrentContent(), {
  entityTransform: (entity, text) => {
    // 根据类型做不同的处理
    if (entity.type === "block-xxx") {
      return `<a href="${entity.data.url}">${text}</a>`;
    }
    // 返回空则按默认处理
    return "";
  },
});
```
