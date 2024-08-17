class MenuDefModel {
    constructor() {
        /** @type {number} メニューID */
        this.menuId = null;
        /** @type {number} 項目ID */
        this.menuColId = null;
        /** @type {string} メニュー名 */
        this.menuName = null;
        /** @type {string} 項目名 */
        this.menuColName = null;
        /** @type {number} 親メニューID */
        this.parentMenuId = null;
        /** @type {number} 親項目ID */
        this.parentColId = null;
        /** @type {number} 子メニューID */
        this.childMenuId = null;
        /** @type {number} 子項目ID */
        this.childColId = null;
    }

    /**
     * メニューIDを取得します。
     * @returns {number} メニューID
     */
    getMenuId() {
        return this.menuId;
    }

    /**
     * メニューIDを設定します。
     * @param {number} value - メニューID
     */
    setMenuId(value) {
        this.menuId = value;
    }

    /**
     * 項目IDを取得します。
     * @returns {number} 項目ID
     */
    getMenuColId() {
        return this.menuColId;
    }

    /**
     * 項目IDを設定します。
     * @param {number} value - 項目ID
     */
    setMenuColId(value) {
        this.menuColId = value;
    }

    /**
     * メニュー名を取得します。
     * @returns {string} メニュー名
     */
    getMenuName() {
        return this.menuName;
    }

    /**
     * メニュー名を設定します。
     * @param {string} value - メニュー名
     */
    setMenuName(value) {
        this.menuName = value;
    }

    /**
     * 項目名を取得します。
     * @returns {string} 項目名
     */
    getMenuColName() {
        return this.menuColName;
    }

    /**
     * 項目名を設定します。
     * @param {string} value - 項目名
     */
    setMenuColName(value) {
        this.menuColName = value;
    }

    /**
     * 親メニューIDを取得します。
     * @returns {number} 親メニューID
     */
    getParentMenuId() {
        return this.parentMenuId;
    }

    /**
     * 親メニューIDを設定します。
     * @param {number} value - 親メニューID
     */
    setParentMenuId(value) {
        this.parentMenuId = value;
    }

    /**
     * 親項目IDを取得します。
     * @returns {number} 親項目ID
     */
    getParentColId() {
        return this.parentColId;
    }

    /**
     * 親項目IDを設定します。
     * @param {number} value - 親項目ID
     */
    setParentColId(value) {
        this.parentColId = value;
    }

    /**
     * 子メニューIDを取得します。
     * @returns {number} 子メニューID
     */
    getChildMenuId() {
        return this.childMenuId;
    }

    /**
     * 子メニューIDを設定します。
     * @param {number} value - 子メニューID
     */
    setChildMenuId(value) {
        this.childMenuId = value;
    }

    /**
     * 子項目IDを取得します。
     * @returns {number} 親項目ID
     */
    getChildColId() {
        return this.childColId;
    }

    /**
     * 子項目IDを設定します。
     * @param {number} value - 親項目ID
     */
    setChildColId(value) {
        this.childColId = value;
    }
}
