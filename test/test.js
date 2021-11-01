"use strict";
const expect = require("chai").expect;
const RangeStyles = require("../js/RangeStyles").default;
const procRangeStyles = require("../js/RangeStyles").procRangeStyles;
const { convertToHTML } = require("../js/index");

const expectArray = (a, b) =>
  expect(JSON.stringify(a)).to.eql(JSON.stringify(b));

describe("RangeStyles divide", () => {
  it("A > B", () => {
    const rangeStyles = new RangeStyles(10, 20, ["UNDERLINE"]);
    const ranges = rangeStyles.divide({
      offset: 0,
      length: 9,
      style: "BOLD",
    });
    expectArray(ranges, [rangeStyles]);
  });

  it("A < B", () => {
    const rangeStyles = new RangeStyles(10, 20, ["UNDERLINE"]);
    const ranges = rangeStyles.divide({
      offset: 40,
      length: 10,
      style: "BOLD",
    });
    expectArray(ranges, [rangeStyles]);
  });

  it("B(A)", () => {
    const rangeStyles = new RangeStyles(10, 20, ["UNDERLINE"]);
    const ranges = rangeStyles.divide({
      offset: 9,
      length: 21,
      style: "BOLD",
    });
    rangeStyles.styles.push("BOLD");
    expectArray(ranges, [rangeStyles]);
  });
});

describe("Sraft convert", () => {
  it("procRangeStyles", () => {
    const result = procRangeStyles(
      [
        {
          offset: 0,
          length: 10,
          style: "FONTSIZE-30",
        },
        {
          offset: 10,
          length: 28,
          style: "FONTSIZE-14",
        },
        {
          offset: 10,
          length: 10,
          style: "BOLD",
        },
        {
          offset: 20,
          length: 8,
          style: "ITALIC",
        },
        {
          offset: 28,
          length: 10,
          style: "UNDERLINE",
        },
      ],
      38
    );
    expectArray(result, [
      { start: 1, end: 10, styles: ["FONTSIZE-30"] },
      { start: 11, end: 20, styles: ["FONTSIZE-14", "BOLD"] },
      { start: 21, end: 28, styles: ["FONTSIZE-14", "ITALIC"] },
      { start: 29, end: 38, styles: ["FONTSIZE-14", "UNDERLINE"] },
    ]);
  });

  it("convertToHTML", () => {
    const html = convertToHTML({
      blocks: [
        {
          key: "62ms9",
          text: "这是30号字体   这是加粗14号字体 这是斜体14号 这是下划线14号字体",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 10,
              style: "FONTSIZE-30",
            },
            {
              offset: 10,
              length: 28,
              style: "FONTSIZE-14",
            },
            {
              offset: 10,
              length: 10,
              style: "BOLD",
            },
            {
              offset: 20,
              length: 8,
              style: "ITALIC",
            },
            {
              offset: 28,
              length: 10,
              style: "UNDERLINE",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "7cq81",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "68auj",
          text: "这是蓝色14号字体",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 9,
              style: "FONTSIZE-14",
            },
            {
              offset: 0,
              length: 9,
              style: "COLOR-003BA5",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "d0d81",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "6k0b9",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "bbmvm",
          text: " ",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [
            {
              offset: 0,
              length: 1,
              key: 0,
            },
          ],
          data: {},
        },
        {
          key: "fjsfb",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "4dnut",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "b314t",
          text: "这是加粗斜体下划线20号黄色字体",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 16,
              style: "FONTSIZE-20",
            },
            {
              offset: 0,
              length: 16,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 16,
              style: "ITALIC",
            },
            {
              offset: 0,
              length: 16,
              style: "UNDERLINE",
            },
            {
              offset: 0,
              length: 16,
              style: "COLOR-FDDA00",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "auuq",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "505j0",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "6oau1",
          text: " ",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [
            {
              offset: 0,
              length: 1,
              key: 1,
            },
          ],
          data: {},
        },
        {
          key: "4po2t",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {
        0: {
          type: "block-img",
          mutability: "IMMUTABLE",
          data: {
            url: "https://ututes.oss-cn-chengdu.aliyuncs.com/106414083233812480.jpg",
            id: "106414083233812480",
          },
        },
        1: {
          type: "block-img",
          mutability: "IMMUTABLE",
          data: {
            url: "https://ututes.oss-cn-chengdu.aliyuncs.com/106413601182453760.jpg",
            id: "106413601182453760",
          },
        },
      },
    });
    expect(html).to.equal(
      `<p><span style="font-size: 30px;">这是30号字体&nbsp;&nbsp;&nbsp;</span><span style="font-size: 14px;font-weight: bold;">这是加粗14号字体&nbsp;</span><span style="font-size: 14px;font-style: italic;">这是斜体14号&nbsp;</span><span style="font-size: 14px;text-decoration: underline;">这是下划线14号字体</span></p><p></p><p><span style="font-size: 14px;color: #003BA5;">这是蓝色14号字体</span></p><p></p><p></p><p><img src="https://ututes.oss-cn-chengdu.aliyuncs.com/106414083233812480.jpg" data-id="106414083233812480" alt=" " class="sraft-img" /></p><p></p><p></p><p><span style="font-size: 20px;font-weight: bold;font-style: italic;text-decoration: underline;color: #FDDA00;">这是加粗斜体下划线20号黄色字体</span></p><p></p><p></p><p><img src="https://ututes.oss-cn-chengdu.aliyuncs.com/106413601182453760.jpg" data-id="106413601182453760" alt=" " class="sraft-img" /></p><p></p>`
    );
  });
});
