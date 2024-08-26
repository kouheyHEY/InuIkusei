class ItemDefModel {
    /** @constructor */
    constructor() {
        /** @type {number} アイテムID */
        this.itemId = null;
        /** @type {string} アイテム名 */
        this.itemName = null;
        /** @type {number} アイテム種別 */
        this.itemType = null;
        /** @type {string} 効果対象項目 */
        this.targetCol = null;
        /** @type {number} 効果量 */
        this.effectVal = null;
        /** @type {string} アイテム詳細 */
        this.itemDetail = null;
    }

    /**
     * @returns {number} アイテムID
     */
    getItemId() {
        return this.itemId;
    }

    /**
     * @param {number} itemId アイテムID
     */
    setItemId(itemId) {
        this.itemId = itemId;
    }

    /**
     * @returns {string} アイテム名
     */
    getItemName() {
        return this.itemName;
    }

    /**
     * @param {string} itemName アイテム名
     */
    setItemName(itemName) {
        this.itemName = itemName;
    }

    /**
     * @returns {number} アイテム種別
     */
    getItemType() {
        return this.itemType;
    }

    /**
     * @param {number} itemType アイテム種別
     */
    setItemType(itemType) {
        this.itemType = itemType;
    }

    /**
     * @returns {string} 効果対象項目
     */
    getTargetCol() {
        return this.targetCol;
    }

    /**
     * @param {string} targetCol 効果対象項目
     */
    setTargetCol(targetCol) {
        this.targetCol = targetCol;
    }

    /**
     * @returns {number} 効果量
     */
    getEffectVal() {
        return this.effectVal;
    }

    /**
     * @param {number} effectVal 効果量
     */
    setEffectVal(effectVal) {
        this.effectVal = effectVal;
    }

    /**
     * @returns {string} アイテム詳細
     */
    getItemDetail() {
        return this.itemDetail;
    }

    /**
     * @param {string} itemDetail アイテム詳細
     */
    setItemDetail(itemDetail) {
        this.itemDetail = itemDetail;
    }

    /**
     * クラスのプロパティとその値を持つオブジェクトを返す
     * @returns {Object} プロパティと値を持つオブジェクト
     */
    getPropertiesFromObject() {
        return {
            itemId: this.itemId,
            itemName: this.itemName,
            itemType: this.itemType,
            targetCol: this.targetCol,
            effectVal: this.effectVal,
            itemDetail: this.itemDetail
        };
    }

    /**
     * オブジェクトからプロパティの値を設定する
     * @param {Object} obj プロパティと値を持つオブジェクト
     */
    setPropertiesObject(obj) {
        if (obj.hasOwnProperty('itemId')) {
            this.itemId = obj.itemId;
        }
        if (obj.hasOwnProperty('itemName')) {
            this.itemName = obj.itemName;
        }
        if (obj.hasOwnProperty('itemType')) {
            this.itemType = obj.itemType;
        }
        if (obj.hasOwnProperty('targetCol')) {
            this.targetCol = obj.targetCol;
        }
        if (obj.hasOwnProperty('effectVal')) {
            this.effectVal = obj.effectVal;
        }
        if (obj.hasOwnProperty('itemDetail')) {
            this.itemDetail = obj.itemDetail;
        }
    }

    /**
     * クラスのプロパティ名を配列として返す
     * @returns {string[]} プロパティ名の配列
    */
    getPropertyNames() {
        return [
            'itemId',
            'itemName',
            'itemType',
            'targetCol',
            'effectVal',
            'itemDetail'
        ];
    }

}
