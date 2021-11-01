"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToHTML = void 0;
var RangeStyles_1 = require("./RangeStyles");
/**
 * 将Content转换为HTML
 *
 * @param {Content} content
 * @param {Options} [opts]
 * @return {*}  {string}
 */
var convertToHTML = function (content, opts) {
    return content.blocks
        .map(function (block) { return blockToHTML(block, content.entityMap, opts); })
        .join("");
};
exports.convertToHTML = convertToHTML;
var blockToHTML = function (block, entityMap, opts) {
    switch (block.type) {
        case "atomic":
            return atomicBlockToHTML(block, entityMap, opts);
        case "unstyled":
            return unstyledBlockToHTML(block);
    }
};
var unstyledBlockToHTML = function (block) {
    var text = block.text;
    var html = (0, RangeStyles_1.procRangeStyles)(block.inlineStyleRanges, text.length).map(function (range) {
        var subText = textToHTML(text.substr(range.offset(), range.length()));
        if (range.styles.length === 0)
            return subText;
        var inlineStyles = procInlineStyles(range.styles);
        return "<span style=\"" + inlineStyles + "\">" + subText + "</span>";
    });
    return "<p>".concat.apply("<p>", html).concat("</p>");
};
var atomicBlockToHTML = function (block, entityMap, opts) {
    var text = block.text;
    var html = block.entityRanges.map(function (range) {
        var subText = text.substr(range.offset, range.length);
        var entity = entityMap[range.key];
        return entityToHTML(entity, subText, opts);
    });
    return "<p>".concat.apply("<p>", html).concat("</p>");
};
var entityToHTML = function (entity, text, opts) {
    var fn = opts === null || opts === void 0 ? void 0 : opts.entityTransform;
    if (fn && typeof fn === "function") {
        var html = fn(entity, text);
        if (html) {
            return html;
        }
    }
    switch (entity.type) {
        case "block-img":
            var data = entity.data;
            return "<img src=\"" + data.url + "\" data-id=\"" + data.id + "\" alt=\"" + text + "\" class=\"sraft-img\" />";
    }
};
var textToHTML = function (text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/ /g, "&nbsp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
};
var procInlineStyles = function (styles) {
    return styles
        .map(function (style) {
        var _a = style.split("-"), name = _a[0], value = _a[1];
        switch (name) {
            case "FONTSIZE":
                return "font-size: " + value + "px;";
            case "BOLD":
                return "font-weight: bold;";
            case "ITALIC":
                return "font-style: italic;";
            case "UNDERLINE":
                return "text-decoration: underline;";
            case "COLOR":
                return "color: #" + value + ";";
        }
        return "";
    })
        .join("");
};
__exportStar(require("./typing"), exports);
