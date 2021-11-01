"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.procRangeStyles = exports.toActualRange = void 0;
/**
 * offset范围转实际范围
 *
 * @param {number[]} source
 */
var toActualRange = function (source) { return [
    source[0] + 1,
    source[0] + source[1],
]; };
exports.toActualRange = toActualRange;
/**
 *  处理范围样式集
 *
 * @param {StyleRange[]} ranges
 * @param {number} len
 * @return {*}  {RangeStyles[]}
 */
var procRangeStyles = function (ranges, len) {
    if (len === 0)
        return [];
    var full = new RangeStyles(1, len);
    var outList = [full];
    ranges.forEach(function (range) {
        var newList = [];
        outList.forEach(function (current) {
            var ranges = current.divide(range);
            newList.push.apply(newList, ranges);
        });
        outList = newList;
    });
    return outList;
};
exports.procRangeStyles = procRangeStyles;
/**
 * 范围样式集
 *
 * @class RangeStyles
 */
var RangeStyles = /** @class */ (function () {
    /**
     * Creates an instance of RangeStyles.
     * @param {number} start
     * @param {number} end
     * @param {string[]} [styles]
     * @memberof RangeStyles
     */
    function RangeStyles(start, end, styles) {
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
    RangeStyles.prototype.offset = function () {
        return this.start - 1;
    };
    /**
     * 长度
     *
     * @return {*}  {number}
     * @memberof RangeStyles
     */
    RangeStyles.prototype.length = function () {
        return this.end - this.offset();
    };
    /**
     * 克隆当前样式范围
     *
     * @private
     * @return {*}  {RangeStyles}
     * @memberof RangeStyles
     */
    RangeStyles.prototype.clone = function () {
        return new RangeStyles(this.start, this.end, __spreadArray([], this.styles, true));
    };
    /**
     * 判断指定值是否在当前范围内
     *
     * @private
     * @param {number} offset
     * @return {*}  {boolean}
     * @memberof RangeStyles
     */
    RangeStyles.prototype.between = function (offset) {
        return offset >= this.start && offset <= this.end;
    };
    /**
     * 分隔指定范围样式
     *
     * @param {StyleRange} range
     * @return {*}  {RangeStyles[]}
     * @memberof RangeStyles
     */
    RangeStyles.prototype.divide = function (range) {
        var result = [];
        var _a = toActualRange([range.offset, range.length]), start = _a[0], end = _a[1];
        var clone = this.clone();
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
            result.push(new RangeStyles(clone.start, end, clone.styles.concat(range.style)));
            result.push(new RangeStyles(end + 1, clone.end, clone.styles));
            return result;
        }
        // 5. range 与 clone 右相交
        if (clone.between(start) && end > clone.end) {
            result.push(new RangeStyles(clone.start, start - 1, clone.styles));
            result.push(new RangeStyles(start, clone.end, clone.styles.concat(range.style)));
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
    };
    return RangeStyles;
}());
exports.default = RangeStyles;
