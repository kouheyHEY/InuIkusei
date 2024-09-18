/**
 * テキストマスタのモデルクラス
 */
class MstTextModel extends BaseModel {
    constructor() {
        super();
        /** @type {number} id */
        this._id = null;
        /** @type {string} テキスト */
        this._text = null;
        /** @type {boolean} 進行フラグ */
        this._flgStry = null;
    }

    // getterとsetterの実装

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get flgStry() {
        return this._flgStry;
    }

    set flgStry(value) {
        this._flgStry = value;
    }

    /** 
     * プロパティをオブジェクトからセットする
     * @param {Object} obj 
     */
    setAllProps(obj) {
        if (obj.id !== undefined) this.id = obj.id;
        if (obj.text !== undefined) this.text = obj.text;
        if (obj.flgStry !== undefined) this.flgStry = obj.flgStry;
    }

    /**
     * すべてのプロパティをオブジェクトで返す
     * @returns {Object} プロパティオブジェクト
     */
    getAllProps() {
        return {
            id: this.id,
            text: this.text,
            flgStry: this.flgStry
        };
    }

    /**
     * プロパティの物理名を配列で返す
     * @returns {string[]} 物理名配列
     */
    getPropNames() {
        return ['id', 'text', 'flgStry'];
    }
}
