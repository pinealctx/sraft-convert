import { procRangeStyles } from "./RangeStyles";
import {
  Content,
  Block,
  EntityMap,
  Entity,
  ImgEntityData,
  Options,
} from "./typing";

/**
 * 将Content转换为HTML
 *
 * @param {Content} content
 * @param {Options} [opts]
 * @return {*}  {string}
 */
const convertToHTML = (content: Content, opts?: Options): string => {
  return content.blocks
    .map((block) => blockToHTML(block, content.entityMap, opts))
    .join("");
};

const blockToHTML = (
  block: Block,
  entityMap: EntityMap,
  opts?: Options
): string => {
  switch (block.type) {
    case "atomic":
      return atomicBlockToHTML(block, entityMap, opts);
    case "unstyled":
      return unstyledBlockToHTML(block);
  }
};

const unstyledBlockToHTML = (block: Block): string => {
  const text = block.text;
  const html: string[] = procRangeStyles(
    block.inlineStyleRanges,
    text.length
  ).map((range) => {
    const subText = textToHTML(text.substr(range.offset(), range.length()));
    if (range.styles.length === 0) return subText;
    const inlineStyles = procInlineStyles(range.styles);
    return `<span style="${inlineStyles}">${subText}</span>`;
  });
  return "<p>".concat(...html).concat("</p>");
};

const atomicBlockToHTML = (
  block: Block,
  entityMap: EntityMap,
  opts?: Options
): string => {
  const text = block.text;
  const html: string[] = block.entityRanges.map((range) => {
    const subText = text.substr(range.offset, range.length);
    const entity = entityMap[range.key];
    return entityToHTML(entity, subText, opts);
  });
  return "<p>".concat(...html).concat("</p>");
};

const entityToHTML = (entity: Entity, text: string, opts?: Options): string => {
  const fn = opts?.entityTransform;
  if (fn && typeof fn === "function") {
    const html = fn(entity, text);
    if (html) {
      return html;
    }
  }
  switch (entity.type) {
    case "block-img":
      const data = entity.data as ImgEntityData;
      return `<img src="${data.url}" data-id="${data.id}" alt="${text}" class="sraft-img" />`;
  }
};

const textToHTML = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/ /g, "&nbsp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
};

const procInlineStyles = (styles: string[]): string =>
  styles
    .map((style) => {
      const [name, value] = style.split("-");
      switch (name) {
        case "FONTSIZE":
          return `font-size: ${value}px;`;
        case "BOLD":
          return `font-weight: bold;`;
        case "ITALIC":
          return `font-style: italic;`;
        case "UNDERLINE":
          return `text-decoration: underline;`;
        case "COLOR":
          return `color: #${value};`;
      }
      return "";
    })
    .join("");

export * from "./typing";

export { convertToHTML };
