class ItemModel {
    /** @constructor */
    constructor() {
        /** @type {number} アイテムID */
        this.itemId = null;
        /** @type {number} アイテム種別 */
        this.itemType = null;
        /** @type {number} 装備キャラID */
        this.eqpCharaId = null;
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
     * @returns {number} 装備キャラID
     */
    getEqpCharaId() {
        return this.eqpCharaId;
    }

    /**
     * @param {number} eqpCharaId 装備キャラID
     */
    setEqpCharaId(eqpCharaId) {
        this.eqpCharaId = eqpCharaId;
    }

    /**
     * クラスのプロパティとその値を持つオブジェクトを返す
     * @returns {Object} プロパティと値を持つオブジェクト
     */
    getPropertiesFromObject() {
        return {
            itemId: this.itemId,
            itemType: this.itemType,
            eqpCharaId: this.eqpCharaId
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
        if (obj.hasOwnProperty('itemType')) {
            this.itemType = obj.itemType;
        }
        if (obj.hasOwnProperty('eqpCharaId')) {
            this.eqpCharaId = obj.eqpCharaId;
        }
    }

    /**
     * クラスのプロパティ名を配列として返す
     * @returns {string[]} プロパティ名の配列
    */
    getPropertyNames() {
        return [
            'itemId',
            'itemType',
            'eqpCharaId'
        ];
    }

}
