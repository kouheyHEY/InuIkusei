/**
 * メニューマスタのモデルクラス。
 */
class MstMenuModel extends BaseModel {
    /**
     * コンストラクタ。
     */
    constructor() {

        super();
        this._menuId = null;
        this._colId = null;
        this._menuName = "";
        this._colName = "";
        this._childMenuId = [];
        this._expl = "";
    }

    /**
     * メニューIDを取得する。
     * @returns {number} メニューID
     */
    get menuId() {
        return this._menuId;
    }

    /**
     * メニューIDを設定する。
     * @param {number} value メニューID
     */
    set menuId(value) {
        this._menuId = value;
    }

    /**
     * 項目IDを取得する。
     * @returns {number} 項目ID
     */
    get colId() {
        return this._colId;
    }

    /**
     * 項目IDを設定する。
     * @param {number} value 項目ID
     */
    set colId(value) {
        this._colId = value;
    }

    /**
     * メニュー名を取得する。
     * @returns {string} メニュー名
     */
    get menuName() {
        return this._menuName;
    }

    /**
     * メニュー名を設定する。
     * @param {string} value メニュー名
     */
    set menuName(value) {
        this._menuName = value;
    }

    /**
     * 項目名を取得する。
     * @returns {string} 項目名
     */
    get colName() {
        return this._colName;
    }

    /**
     * 項目名を設定する。
     * @param {string} value 項目名
     */
    set colName(value) {
        this._colName = value;
    }

    /**
     * 子メニューIDの配列を取得する。
     * @returns {number[]} 子メニューIDの配列
     */
    get childMenuId() {
        return this._childMenuId;
    }

    /**
     * 子メニューIDの配列を設定する。
     * @param {number[]} value 子メニューIDの配列
     */
    set childMenuId(value) {
        this._childMenuId = value;
    }

    /**
     * 説明を取得する。
     * @returns {string} 説明
     */
    get expl() {
        return this._expl;
    }

    /**
     * 説明を設定する。
     * @param {string} value 説明
     */
    set expl(value) {
        this._expl = value;
    }

    /**
     * プロパティにオブジェクトから値をセットする。
     * @param {Object} obj プロパティを含むオブジェクト
     */
    setAllProps(obj) {
        if (obj.menuId !== undefined) this.menuId = obj.menuId;
        if (obj.colId !== undefined) this.colId = obj.colId;
        if (obj.menuName !== undefined) this.menuName = obj.menuName;
        if (obj.colName !== undefined) this.colName = obj.colName;
        if (obj.childMenuId !== undefined) this.childMenuId = obj.childMenuId;
        if (obj.expl !== undefined) this.expl = obj.expl;
    }

    /**
     * すべてのプロパティをオブジェクトで返す。
     * @returns {Object} すべてのプロパティを含むオブジェクト
     */
    getAllProps() {
        return {
            menuId: this.menuId,
            colId: this.colId,
            menuName: this.menuName,
            colName: this.colName,
            childMenuId: this.childMenuId,
            expl: this.expl
        };
    }

    /**
     * すべてのプロパティの物理名を配列で返す。
     * @returns {string[]} すべてのプロパティ名を含む配列
     */
    getPropNames() {
        return [
            "menuId",
            "colId",
            "menuName",
            "colName",
            "childMenuId",
            "expl"
        ];
    }
}
