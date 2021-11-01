import { Content, Options } from "./typing";
/**
 * 将Content转换为HTML
 *
 * @param {Content} content
 * @param {Options} [opts]
 * @return {*}  {string}
 */
declare const convertToHTML: (content: Content, opts?: Options | undefined) => string;
export * from "./typing";
export { convertToHTML };
