/**
 * 敵キャラマスタのモデルクラス
 */
class MstEnemyModel extends BaseModel {
    constructor() {
        super();
        /** @type {number} id */
        this._id = null;
        /** @type {string} 名前 */
        this._name = null;
        /** @type {number} 体力最大値 */
        this._maxHp = null;
        /** @type {number} やる気最大値 */
        this._maxYp = null;
        /** @type {number} 攻撃 */
        this._atk = null;
        /** @type {number} 防御 */
        this._def = null;
        /** @type {number} 運 */
        this._luk = null;
        /** @type {string} 特技ID */
        this._spIds = [];
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

    get maxHp() {
        return this._maxHp;
    }

    set maxHp(value) {
        this._maxHp = value;
    }

    get maxYp() {
        return this._maxYp;
    }

    set maxYp(value) {
        this._maxYp = value;
    }

    get atk() {
        return this._atk;
    }

    set atk(value) {
        this._atk = value;
    }

    get def() {
        return this._def;
    }

    set def(value) {
        this._def = value;
    }

    get luk() {
        return this._luk;
    }

    set luk(value) {
        this._luk = value;
    }

    get spIds() {
        return this._spIds;
    }

    set spIds(value) {
        this._spIds = value;
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
        if (obj.maxHp !== undefined) this.maxHp = obj.maxHp;
        if (obj.maxYp !== undefined) this.maxYp = obj.maxYp;
        if (obj.atk !== undefined) this.atk = obj.atk;
        if (obj.def !== undefined) this.def = obj.def;
        if (obj.luk !== undefined) this.luk = obj.luk;
        if (obj.spIds !== undefined) this.spIds = obj.spIds;
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
            maxHp: this.maxHp,
            maxYp: this.maxYp,
            atk: this.atk,
            def: this.def,
            luk: this.luk,
            spIds: this.spIds,
            expl: this.expl
        };
    }

    /**
     * プロパティの物理名を配列で返す
     * @returns {string[]} 物理名配列
     */
    getPropNames() {
        return ['id', 'name', 'maxHp', 'maxYp', 'atk', 'def', 'luk', 'spIds', 'expl'];
    }
}
