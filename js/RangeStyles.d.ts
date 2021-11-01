import { StyleRange } from "./typing";
/**
 * offset范围转实际范围
 *
 * @param {number[]} source
 */
declare const toActualRange: (source: number[]) => number[];
/**
 *  处理范围样式集
 *
 * @param {StyleRange[]} ranges
 * @param {number} len
 * @return {*}  {RangeStyles[]}
 */
declare const procRangeStyles: (ranges: StyleRange[], len: number) => RangeStyles[];
/**
 * 范围样式集
 *
 * @class RangeStyles
 */
declare class RangeStyles {
    /**
     * 起始
     *
     * @type {number}
     * @memberof RangeStyles
     */
    start: number;
    /**
     * 结束
     *
     * @type {number}
     * @memberof RangeStyles
     */
    end: number;
    /**
     * 样式列表
     *
     * @type {string[]}
     * @memberof RangeStyles
     */
    styles: string[];
    /**
     * Creates an instance of RangeStyles.
     * @param {number} start
     * @param {number} end
     * @param {string[]} [styles]
     * @memberof RangeStyles
     */
    constructor(start: number, end: number, styles?: string[]);
    /**
     * 偏移量
     *
     * @return {*}  {number}
     * @memberof RangeStyles
     */
    offset(): number;
    /**
     * 长度
     *
     * @return {*}  {number}
     * @memberof RangeStyles
     */
    length(): number;
    /**
     * 克隆当前样式范围
     *
     * @private
     * @return {*}  {RangeStyles}
     * @memberof RangeStyles
     */
    private clone;
    /**
     * 判断指定值是否在当前范围内
     *
     * @private
     * @param {number} offset
     * @return {*}  {boolean}
     * @memberof RangeStyles
     */
    private between;
    /**
     * 分隔指定范围样式
     *
     * @param {StyleRange} range
     * @return {*}  {RangeStyles[]}
     * @memberof RangeStyles
     */
    divide(range: StyleRange): RangeStyles[];
}
export default RangeStyles;
export { toActualRange, procRangeStyles };
