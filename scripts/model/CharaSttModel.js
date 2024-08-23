class CharaSttModel {
    /** @constructor */
    constructor() {
        /** @type {number} キャラID */
        this.charaId = null;
        /** @type {string} キャラ名 */
        this.charaName = null;
        /** @type {number} 最大体力 */
        this.maxHp = null;
        /** @type {number} 体力 */
        this.hp = null;
        /** @type {number} 最大やる気 */
        this.maxYp = null;
        /** @type {number} やる気 */
        this.yp = null;
        /** @type {number} 運 */
        this.luk = null;
        /** @type {number} 攻撃力 */
        this.atk = null;
        /** @type {number} 防御力 */
        this.def = null;
        /** @type {number} 装備1id */
        this.eqp1 = null;
        /** @type {number} 装備2id */
        this.eqp2 = null;
    }

    /**
     * キャラID
     * @returns {number}
     */
    getCharaId() {
        return this.charaId;
    }

    /**
     * @param {number} value - キャラID
     */
    setCharaId(value) {
        this.charaId = value;
    }

    /**
     * キャラ名
     * @returns {string}
     */
    getCharaName() {
        return this.charaName;
    }

    /**
     * @param {string} value - キャラ名
     */
    setCharaName(value) {
        this.charaName = value;
    }

    /**
     * 最大体力
     * @returns {number}
     */
    getMaxHp() {
        return this.maxHp;
    }

    /**
     * @param {number} value - 最大体力
     */
    setMaxHp(value) {
        this.maxHp = value;
    }

    /**
     * 体力
     * @returns {number}
     */
    getHp() {
        return this.hp;
    }

    /**
     * @param {number} value - 体力
     */
    setHp(value) {
        this.hp = value;
    }

    /**
     * 最大やる気
     * @returns {number}
     */
    getMaxYp() {
        return this.maxYp;
    }

    /**
     * @param {number} value - 最大やる気
     */
    setMaxYp(value) {
        this.maxYp = value;
    }

    /**
     * やる気
     * @returns {number}
     */
    getYp() {
        return this.yp;
    }

    /**
     * @param {number} value - やる気
     */
    setYp(value) {
        this.yp = value;
    }

    /**
     * 運
     * @returns {number}
     */
    getLuk() {
        return this.luk;
    }

    /**
     * @param {number} value - 運
     */
    setLuk(value) {
        this.luk = value;
    }

    /**
     * 攻撃力
     * @returns {number}
     */
    getAtk() {
        return this.atk;
    }

    /**
     * @param {number} value - 攻撃力
     */
    setAtk(value) {
        this.atk = value;
    }

    /**
     * 防御力
     * @returns {number}
     */
    getDef() {
        return this.def;
    }

    /**
     * @param {number} value - 防御力
     */
    setDef(value) {
        this.def = value;
    }

    /**
     * 装備1id
     * @returns {number}
     */
    getEqp1() {
        return this.eqp1;
    }

    /**
     * @param {number} value - 装備1id
     */
    setEqp1(value) {
        this.eqp1 = value;
    }

    /**
     * 装備2id
     * @returns {number}
     */
    getEqp2() {
        return this.eqp2;
    }

    /**
     * @param {number} value - 装備2id
     */
    setEqp2(value) {
        this.eqp2 = value;
    }

    /**
     * オブジェクトのプロパティをモデルにセットします。
     * @param {Object} obj - セットするオブジェクト
     */
    setPropertiesFromObject(obj) {
        if (obj.hasOwnProperty('charaId')) {
            this.setCharaId(obj['charaId']);
        }
        if (obj.hasOwnProperty('charaName')) {
            this.setCharaName(obj['charaName']);
        }
        if (obj.hasOwnProperty('maxHp')) {
            this.setMaxHp(obj['maxHp']);
        }
        if (obj.hasOwnProperty('hp')) {
            this.setHp(obj['hp']);
        }
        if (obj.hasOwnProperty('maxYp')) {
            this.setMaxYp(obj['maxYp']);
        }
        if (obj.hasOwnProperty('yp')) {
            this.setYp(obj['yp']);
        }
        if (obj.hasOwnProperty('luk')) {
            this.setLuk(obj['luk']);
        }
        if (obj.hasOwnProperty('atk')) {
            this.setAtk(obj['atk']);
        }
        if (obj.hasOwnProperty('def')) {
            this.setDef(obj['def']);
        }
        if (obj.hasOwnProperty('eqp1')) {
            this.setEqp1(obj['eqp1']);
        }
        if (obj.hasOwnProperty('eqp2')) {
            this.setEqp2(obj['eqp2']);
        }
    }

}
