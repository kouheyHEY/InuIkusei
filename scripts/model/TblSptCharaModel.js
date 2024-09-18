/**
 * 味方キャラテーブルのモデルクラス
 */
class TblSptCharaModel extends BaseModel {
    constructor() {
        super();
        /** @type {number} id */
        this._id = null;
        /** @type {string} 名前 */
        this._name = null;
        /** @type {number} レベル */
        this._lvl = null;
        /** @type {number} 体力最大値 */
        this._maxHp = null;
        /** @type {number} 体力 */
        this._hp = null;
        /** @type {number} やる気最大値 */
        this._maxYp = null;
        /** @type {number} やる気 */
        this._yp = null;
        /** @type {number} 攻撃 */
        this._atk = null;
        /** @type {number} 防御 */
        this._def = null;
        /** @type {number} 運 */
        this._luk = null;
        /** @type {string} 装備アイテムid（配列） */
        this._eqpIds = null;
        /** @type {string} 特技id（配列） */
        this._spIds = null;
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

    get lvl() {
        return this._lvl;
    }

    set lvl(value) {
        this._lvl = value;
    }

    get maxHp() {
        return this._maxHp;
    }

    set maxHp(value) {
        this._maxHp = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    get maxYp() {
        return this._maxYp;
    }

    set maxYp(value) {
        this._maxYp = value;
    }

    get yp() {
        return this._yp;
    }

    set yp(value) {
        this._yp = value;
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

    get eqpIds() {
        return this._eqpIds;
    }

    set eqpIds(value) {
        this._eqpIds = value;
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
        if (obj.lvl !== undefined) this.lvl = obj.lvl;
        if (obj.maxHp !== undefined) this.maxHp = obj.maxHp;
        if (obj.hp !== undefined) this.hp = obj.hp;
        if (obj.maxYp !== undefined) this.maxYp = obj.maxYp;
        if (obj.yp !== undefined) this.yp = obj.yp;
        if (obj.atk !== undefined) this.atk = obj.atk;
        if (obj.def !== undefined) this.def = obj.def;
        if (obj.luk !== undefined) this.luk = obj.luk;
        if (obj.eqpIds !== undefined) this.eqpIds = obj.eqpIds;
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
            lvl: this.lvl,
            maxHp: this.maxHp,
            hp: this.hp,
            maxYp: this.maxYp,
            yp: this.yp,
            atk: this.atk,
            def: this.def,
            luk: this.luk,
            eqpIds: this.eqpIds,
            spIds: this.spIds,
            expl: this.expl
        };
    }

    /**
     * プロパティの物理名を配列で返す
     * @returns {string[]} 物理名配列
     */
    getPropNames() {
        return ['id', 'name', 'lvl', 'maxHp', 'hp', 'maxYp', 'yp', 'atk', 'def', 'luk', 'eqpIds', 'spIds', 'expl'];
    }
}
