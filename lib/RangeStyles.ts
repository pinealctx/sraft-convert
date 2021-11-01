import { StyleRange } from "./typing";

/**
 * offset范围转实际范围
 *
 * @param {number[]} source
 */
const toActualRange = (source: number[]) => [
  source[0] + 1,
  source[0] + source[1],
];

/**
 *  处理范围样式集
 *
 * @param {StyleRange[]} ranges
 * @param {number} len
 * @return {*}  {RangeStyles[]}
 */
const procRangeStyles = (ranges: StyleRange[], len: number): RangeStyles[] => {
  if (len === 0) return [];
  const full = new RangeStyles(1, len);
  let outList = [full];
  ranges.forEach((range) => {
    let newList: RangeStyles[] = [];
    outList.forEach((current) => {
      const ranges = current.divide(range);
      newList.push(...ranges);
    });
    outList = newList;
  });
  return outList;
};

/**
 * 范围样式集
 *
 * @class RangeStyles
 */
class RangeStyles {
  /**
   * 起始
   *
   * @type {number}
   * @memberof RangeStyles
   */
  public start: number;

  /**
   * 结束
   *
   * @type {number}
   * @memberof RangeStyles
   */
  public end: number;

  /**
   * 样式列表
   *
   * @type {string[]}
   * @memberof RangeStyles
   */
  public styles: string[];

  /**
   * Creates an instance of RangeStyles.
   * @param {number} start
   * @param {number} end
   * @param {string[]} [styles]
   * @memberof RangeStyles
   */
  constructor(start: number, end: number, styles?: string[]) {
    this.start = start;
    this.end = end;
    this.styles = styles || [];
  }

  /**
   * 偏移量
   *
   * @return {*}  {number}
   * @memberof RangeStyles
   */
  public offset(): number {
    return this.start - 1;
  }

  /**
   * 长度
   *
   * @return {*}  {number}
   * @memberof RangeStyles
   */
  public length(): number {
    return this.end - this.offset();
  }

  /**
   * 克隆当前样式范围
   *
   * @private
   * @return {*}  {RangeStyles}
   * @memberof RangeStyles
   */
  private clone(): RangeStyles {
    return new RangeStyles(this.start, this.end, [...this.styles]);
  }

  /**
   * 判断指定值是否在当前范围内
   *
   * @private
   * @param {number} offset
   * @return {*}  {boolean}
   * @memberof RangeStyles
   */
  private between(offset: number): boolean {
    return offset >= this.start && offset <= this.end;
  }

  /**
   * 分隔指定范围样式
   *
   * @param {StyleRange} range
   * @return {*}  {RangeStyles[]}
   * @memberof RangeStyles
   */
  public divide(range: StyleRange): RangeStyles[] {
    const result: RangeStyles[] = [];
    const [start, end] = toActualRange([range.offset, range.length]);
    const clone = this.clone();

    // 1. range < clone
    if (clone.start > end) {
      result.push(clone);
      return result;
    }
    // 2. range > clone
    if (clone.end < start) {
      result.push(clone);
      return result;
    }
    // 3. range 包含 clone
    if (start <= clone.start && clone.end <= end) {
      clone.styles.push(range.style);
      result.push(clone);
      return result;
    }
    // 4. range 与 clone 左相交
    if (start < clone.start && clone.between(end)) {
      result.push(
        new RangeStyles(clone.start, end, clone.styles.concat(range.style))
      );
      result.push(new RangeStyles(end + 1, clone.end, clone.styles));
      return result;
    }
    // 5. range 与 clone 右相交
    if (clone.between(start) && end > clone.end) {
      result.push(new RangeStyles(clone.start, start - 1, clone.styles));
      result.push(
        new RangeStyles(start, clone.end, clone.styles.concat(range.style))
      );
      return result;
    }
    // 6. clone 内含 range 且不全等
    if (clone.end === end) {
      result.push(new RangeStyles(clone.start, start - 1, clone.styles));
    }
    result.push(new RangeStyles(start, end, clone.styles.concat(range.style)));
    if (clone.start === start) {
      result.push(new RangeStyles(end + 1, clone.end, clone.styles));
    }
    return result;
  }
}

export default RangeStyles;
export { toActualRange, procRangeStyles };
