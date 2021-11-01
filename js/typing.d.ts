/**
 * Content
 *
 * @export
 * @interface Content
 */
export interface Content {
    blocks: Block[];
    entityMap: EntityMap;
}
/**
 * Block
 *
 * @export
 * @interface Block
 */
export interface Block {
    key: string;
    text: string;
    type: "unstyled" | "atomic";
    depth: number;
    inlineStyleRanges: StyleRange[];
    entityRanges: EntityRange[];
    data: {
        [key: string]: any;
    };
}
/**
 * 样式范围
 *
 * @export
 * @interface StyleRange
 */
export interface StyleRange {
    offset: number;
    length: number;
    style: string;
}
/**
 * 实体范围
 *
 * @export
 * @interface EntityRange
 */
export interface EntityRange {
    offset: number;
    length: number;
    key: number;
}
/**
 * 实体Map
 *
 * @export
 * @interface EntityMap
 */
export interface EntityMap {
    [key: string]: Entity;
}
/**
 * 实体
 *
 * @export
 * @interface Entity
 */
export interface Entity {
    type: "block-img";
    mutability: "IMMUTABLE";
    data: ImgEntityData | {
        [key: string]: any;
    };
}
/**
 * 图片实体数据
 *
 * @export
 * @interface ImgEntityData
 */
export interface ImgEntityData {
    /**
     * 图片ID
     *
     * @type {string}
     * @memberof ImgEntityData
     */
    id: string;
    /**
     * 图片URL
     *
     * @type {string}
     * @memberof ImgEntityData
     */
    url: string;
}
/**
 * 转换设置
 *
 * @export
 * @interface Options
 */
export interface Options {
    /**
     * 实体自定义处理方法
     *
     * @memberof Options
     */
    entityTransform?: (entiy: Entity, text: string) => string;
}
