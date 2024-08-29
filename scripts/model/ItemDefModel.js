class ItemDefModel {
    /** @constructor */
    constructor() {
        /** @type {number} アイテムID */
        this.itemId = null;
        /** @type {string} アイテム名 */
        this.itemName = null;
        /** @type {number} アイテム種別 */
        this.itemType = null;
        /** @type {string} 効果対象項目1 */
        this.targetCol1 = null;
        /** @type {number} 効果量1 */
        this.effectVal1 = null;
        /** @type {string} 効果対象項目2 */
        this.targetCol2 = null;
        /** @type {number} 効果量2 */
        this.effectVal2 = null;
        /** @type {string} 効果対象項目3 */
        this.targetCol3 = null;
        /** @type {number} 効果量3 */
        this.effectVal3 = null;
        /** @type {string} 効果対象項目4 */
        this.targetCol4 = null;
        /** @type {number} 効果量4 */
        this.effectVal4 = null;
        /** @type {number} 使用アイテムフラグ */
        this.useItemFlg = null;
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
     * @returns {string} 効果対象項目1
     */
    getTargetCol1() {
        return this.targetCol1;
    }

    /**
     * @param {string} targetCol1 効果対象項目1
     */
    setTargetCol1(targetCol1) {
        this.targetCol1 = targetCol1;
    }

    /**
     * @returns {number} 効果量1
     */
    getEffectVal1() {
        return this.effectVal1;
    }

    /**
     * @param {number} effectVal1 効果量1
     */
    setEffectVal1(effectVal1) {
        this.effectVal1 = effectVal1;
    }

    /**
     * @returns {string} 効果対象項目2
     */
    getTargetCol2() {
        return this.targetCol2;
    }

    /**
     * @param {string} targetCol2 効果対象項目2
     */
    setTargetCol2(targetCol2) {
        this.targetCol2 = targetCol2;
    }

    /**
     * @returns {number} 効果量2
     */
    getEffectVal2() {
        return this.effectVal2;
    }

    /**
     * @param {number} effectVal2 効果量2
     */
    setEffectVal2(effectVal2) {
        this.effectVal2 = effectVal2;
    }

    /**
     * @returns {string} 効果対象項目3
     */
    getTargetCol3() {
        return this.targetCol3;
    }

    /**
     * @param {string} targetCol3 効果対象項目3
     */
    setTargetCol3(targetCol3) {
        this.targetCol3 = targetCol3;
    }

    /**
     * @returns {number} 効果量3
     */
    getEffectVal3() {
        return this.effectVal3;
    }

    /**
     * @param {number} effectVal3 効果量3
     */
    setEffectVal3(effectVal3) {
        this.effectVal3 = effectVal3;
    }

    /**
     * @returns {string} 効果対象項目4
     */
    getTargetCol4() {
        return this.targetCol4;
    }

    /**
     * @param {string} targetCol4 効果対象項目4
     */
    setTargetCol4(targetCol4) {
        this.targetCol4 = targetCol4;
    }

    /**
     * @returns {number} 効果量4
     */
    getEffectVal4() {
        return this.effectVal4;
    }

    /**
     * @param {number} effectVal4 効果量4
     */
    setEffectVal4(effectVal4) {
        this.effectVal4 = effectVal4;
    }

    /**
     * @returns {number} 使用アイテムフラグ
     */
    getUseItemFlg() {
        return this.useItemFlg;
    }

    /**
     * @param {number} useItemFlg 使用アイテムフラグ
     */
    setUseItemFlg(useItemFlg) {
        this.useItemFlg = useItemFlg;
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
            targetCol1: this.targetCol1,
            effectVal1: this.effectVal1,
            targetCol2: this.targetCol2,
            effectVal2: this.effectVal2,
            targetCol3: this.targetCol3,
            effectVal3: this.effectVal3,
            targetCol4: this.targetCol4,
            effectVal4: this.effectVal4,
            useItemFlg: this.useItemFlg,
            itemDetail: this.itemDetail
        };
    }

    /**
     * オブジェクトからプロパティの値を設定する
     * @param {Object} obj プロパティと値を持つオブジェクト
     */
    setPropertiesFromObject(obj) {
        if (obj.hasOwnProperty('itemId')) {
            this.itemId = obj.itemId;
        }
        if (obj.hasOwnProperty('itemName')) {
            this.itemName = obj.itemName;
        }
        if (obj.hasOwnProperty('itemType')) {
            this.itemType = obj.itemType;
        }
        if (obj.hasOwnProperty('targetCol1')) {
            this.targetCol1 = obj.targetCol1;
        }
        if (obj.hasOwnProperty('effectVal1')) {
            this.effectVal1 = obj.effectVal1;
        }
        if (obj.hasOwnProperty('targetCol2')) {
            this.targetCol2 = obj.targetCol2;
        }
        if (obj.hasOwnProperty('effectVal2')) {
            this.effectVal2 = obj.effectVal2;
        }
        if (obj.hasOwnProperty('targetCol3')) {
            this.targetCol3 = obj.targetCol3;
        }
        if (obj.hasOwnProperty('effectVal3')) {
            this.effectVal3 = obj.effectVal3;
        }
        if (obj.hasOwnProperty('targetCol4')) {
            this.targetCol4 = obj.targetCol4;
        }
        if (obj.hasOwnProperty('effectVal4')) {
            this.effectVal4 = obj.effectVal4;
        }
        if (obj.hasOwnProperty('useItemFlg')) {
            this.useItemFlg = obj.useItemFlg;
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
            'targetCol1',
            'effectVal1',
            'targetCol2',
            'effectVal2',
            'targetCol3',
            'effectVal3',
            'targetCol4',
            'effectVal4',
            'useItemFlg',
            'itemDetail'
        ];
    }

}
