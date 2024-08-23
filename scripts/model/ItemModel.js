class ItemModel {
    /** @constructor */
    constructor() {
        /** @type {number} アイテムID */
        this.itemId = null;
        /** @type {string} アイテム名 */
        this.itemName = null;
        /** @type {number} アイテム種別 */
        this.itemType = null;
        /** @type {number} アイテム効果対象項目ID */
        this.parentMenuId = null;
        /** @type {number} 親項目ID */
        this.parentColId = null;
        /** @type {number} 子メニューID */
        this.childMenuId = null;
        /** @type {number} 子項目ID */
        this.childColId = null;
    }

    /**
     * アイテムID
     * @returns {number}
     */
    getItemId() {
        return this.itemId;
    }

    /**
     * @param {number} value - アイテムID
     */
    setItemId(value) {
        this.itemId = value;
    }

    /**
     * アイテム名
     * @returns {string}
     */
    getItemName() {
        return this.itemName;
    }

    /**
     * @param {string} value - アイテム名
     */
    setItemName(value) {
        this.itemName = value;
    }

    /**
     * アイテム種別
     * @returns {number}
     */
    getItemType() {
        return this.itemType;
    }

    /**
     * @param {number} value - アイテム種別
     */
    setItemType(value) {
        this.itemType = value;
    }

    /**
     * アイテム効果対象項目ID
     * @returns {number}
     */
    getParentMenuId() {
        return this.parentMenuId;
    }

    /**
     * @param {number} value - アイテム効果対象項目ID
     */
    setParentMenuId(value) {
        this.parentMenuId = value;
    }

    /**
     * 親項目ID
     * @returns {number}
     */
    getParentColId() {
        return this.parentColId;
    }

    /**
     * @param {number} value - 親項目ID
     */
    setParentColId(value) {
        this.parentColId = value;
    }

    /**
     * 子メニューID
     * @returns {number}
     */
    getChildMenuId() {
        return this.childMenuId;
    }

    /**
     * @param {number} value - 子メニューID
     */
    setChildMenuId(value) {
        this.childMenuId = value;
    }

    /**
     * 子項目ID
     * @returns {number}
     */
    getChildColId() {
        return this.childColId;
    }

    /**
     * @param {number} value - 子項目ID
     */
    setChildColId(value) {
        this.childColId = value;
    }

    /**
     * オブジェクトのプロパティをモデルにセットします。
     * @param {Object} obj - セットするオブジェクト
     */
    setPropertiesFromObject(obj) {
        if (obj.hasOwnProperty('itemId')) {
            this.setItemId(obj['itemId']);
        }
        if (obj.hasOwnProperty('itemName')) {
            this.setItemName(obj['itemName']);
        }
        if (obj.hasOwnProperty('itemType')) {
            this.setItemType(obj['itemType']);
        }
        if (obj.hasOwnProperty('parentMenuId')) {
            this.setParentMenuId(obj['parentMenuId']);
        }
        if (obj.hasOwnProperty('parentColId')) {
            this.setParentColId(obj['parentColId']);
        }
        if (obj.hasOwnProperty('childMenuId')) {
            this.setChildMenuId(obj['childMenuId']);
        }
        if (obj.hasOwnProperty('childColId')) {
            this.setChildColId(obj['childColId']);
        }
    }

}
