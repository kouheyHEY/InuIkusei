class TextModel {
    constructor() {
        /** @type {number} テキストID */
        this.textId = null;

        /** @type {string} 本文 */
        this.text = null;

        /** @type {number} 前テキストID */
        this.prevTextId = null;

        /** @type {number} 次テキストID */
        this.nextTextId = null;
    }

    /**
     * テキストIDを取得します。
     * @returns {number} テキストID
     */
    getTextId() {
        return this.textId;
    }

    /**
     * テキストIDを設定します。
     * @param {number} value - テキストID
     */
    setTextId(value) {
        this.textId = value;
    }

    /**
     * 本文を取得します。
     * @returns {string} 本文
     */
    getText() {
        return this.text;
    }

    /**
     * 本文を設定します。
     * @param {string} value - 本文
     */
    setText(value) {
        this.text = value;
    }

    /**
     * 前テキストIDを取得します。
     * @returns {number} 前テキストID
     */
    getPrevTextId() {
        return this.prevTextId;
    }

    /**
     * 前テキストIDを設定します。
     * @param {number} value - 前テキストID
     */
    setPrevTextId(value) {
        this.prevTextId = value;
    }

    /**
     * 次テキストIDを取得します。
     * @returns {number} 次テキストID
     */
    getNextTextId() {
        return this.nextTextId;
    }

    /**
     * 次テキストIDを設定します。
     * @param {number} value - 次テキストID
     */
    setNextTextId(value) {
        this.nextTextId = value;
    }
}