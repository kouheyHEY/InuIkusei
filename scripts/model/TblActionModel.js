/**
 * アクションテーブルのモデルクラス
 */
class TblActionModel extends BaseModel {
    constructor() {
        super();
        /** @type {number} id */
        this._id = null;
        /** @type {string} 名前 */
        this._name = null;
        /** @type {string} タイプ */
        this._type = null;
        /** @type {string} 対象項目（配列） */
        this._trgtCols = null;
        /** @type {number} 効果値（配列） */
        this._efctVals = null;
        /** @type {string} 必要項目（配列） */
        this._needCols = null;
        /** @type {number} 必要項目値（配列） */
        this._needVals = null;
        /** @type {string} 説明 */
        this._expl = null;
    }

    // getterとsetterの実装

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get trgtCols() {
        return this._trgtCols;
    }

    set trgtCols(value) {
        this._trgtCols = value;
    }

    get efctVals() {
        return this._efctVals;
    }

    set efctVals(value) {
        this._efctVals = value;
    }

    get needCols() {
        return this._needCols;
    }

    set needCols(value) {
        this._needCols = value;
    }

    get needVals() {
        return this._needVals;
    }

    set needVals(value) {
        this._needVals = value;
    }

    get expl() {
        return this._expl;
    }

    set expl(value) {
        this._expl = value;
    }

    /** 
     * プロパティをオブジェクトからセットする
     * @param {Object} obj 
     */
    setAllProps(obj) {
        if (obj.id !== undefined) this.id = obj.id;
        if (obj.name !== undefined) this.name = obj.name;
        if (obj.type !== undefined) this.type = obj.type;
        if (obj.trgtCols !== undefined) this.trgtCols = obj.trgtCols;
        if (obj.efctVals !== undefined) this.efctVals = obj.efctVals;
        if (obj.needCols !== undefined) this.needCols = obj.needCols;
        if (obj.needVals !== undefined) this.needVals = obj.needVals;
        if (obj.expl !== undefined) this.expl = obj.expl;
    }

    /**
     * すべてのプロパティをオブジェクトで返す
     * @returns {Object} プロパティオブジェクト
     */
    getAllProps() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            trgtCols: this.trgtCols,
            efctVals: this.efctVals,
            needCols: this.needCols,
            needVals: this.needVals,
            expl: this.expl
        };
    }

    /**
     * プロパティの物理名を配列で返す
     * @returns {string[]} 物理名配列
     */
    getPropNames() {
        return ['id', 'name', 'type', 'trgtCols', 'efctVals', 'needCols', 'needVals', 'expl'];
    }
}
