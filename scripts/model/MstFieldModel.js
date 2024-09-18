/**
 * フィールドマスタのモデルクラス
 */
class MstFieldModel extends BaseModel {
    constructor() {
        super();
        /** @type {number} id */
        this._id = null;
        /** @type {string} 名前 */
        this._name = null;
        /** @type {number} 難易度 */
        this._dff = null;
        /** @type {string} 敵キャラid（配列） */
        this._enemyIds = null;
        /** @type {string} アイテムid（配列） */
        this._itemIds = null;
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

    get dff() {
        return this._dff;
    }

    set dff(value) {
        this._dff = value;
    }

    get enemyIds() {
        return this._enemyIds;
    }

    set enemyIds(value) {
        this._enemyIds = value;
    }

    get itemIds() {
        return this._itemIds;
    }

    set itemIds(value) {
        this._itemIds = value;
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
        if (obj.dff !== undefined) this.dff = obj.dff;
        if (obj.enemyIds !== undefined) this.enemyIds = obj.enemyIds;
        if (obj.itemIds !== undefined) this.itemIds = obj.itemIds;
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
            dff: this.dff,
            enemyIds: this.enemyIds,
            itemIds: this.itemIds,
            expl: this.expl
        };
    }

    /**
     * プロパティの物理名を配列で返す
     * @returns {string[]} 物理名配列
     */
    getPropNames() {
        return ['id', 'name', 'dff', 'enemyIds', 'itemIds', 'expl'];
    }
}
