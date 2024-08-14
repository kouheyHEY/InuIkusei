class CharaSttModel {
    constructor() {
        /** @type {number} キャラID */
        this.charaId = null;
        /** @type {string} キャラ名 */
        this.charaName = null;
        /** @type {number} 攻撃 */
        this.atk = null;
        /** @type {number} 防御 */
        this.def = null;
        /** @type {number} 体力 */
        this.hp = null;
        /** @type {number} やる気 */
        this.yp = null;
        /** @type {number} 運 */
        this.luk = null;
    }

    /**
     * キャラIDを取得します。
     * @returns {number} キャラID
     */
    getCharaId() {
        return this.charaId;
    }

    /**
     * キャラIDを設定します。
     * @param {number} value - キャラID
     */
    setCharaId(value) {
        this.charaId = value;
    }

    /**
     * キャラ名を取得します。
     * @returns {string} キャラ名
     */
    getCharaName() {
        return this.charaName;
    }

    /**
     * キャラ名を設定します。
     * @param {string} value - キャラ名
     */
    setCharaName(value) {
        this.charaName = value;
    }

    /**
     * 攻撃を取得します。
     * @returns {number} 攻撃
     */
    getAtk() {
        return this.atk;
    }

    /**
     * 攻撃を設定します。
     * @param {number} value - 攻撃
     */
    setAtk(value) {
        this.atk = value;
    }

    /**
     * 防御を取得します。
     * @returns {number} 防御
     */
    getDef() {
        return this.def;
    }

    /**
     * 防御を設定します。
     * @param {number} value - 防御
     */
    setDef(value) {
        this.def = value;
    }

    /**
     * 体力を取得します。
     * @returns {number} 体力
     */
    getHp() {
        return this.hp;
    }

    /**
     * 体力を設定します。
     * @param {number} value - 体力
     */
    setHp(value) {
        this.hp = value;
    }

    /**
     * やる気を取得します。
     * @returns {number} やる気
     */
    getYp() {
        return this.yp;
    }

    /**
     * やる気を設定します。
     * @param {number} value - やる気
     */
    setYp(value) {
        this.yp = value;
    }

    /**
     * 運を取得します。
     * @returns {number} 運
     */
    getLuk() {
        return this.luk;
    }

    /**
     * 運を設定します。
     * @param {number} value - 運
     */
    setLuk(value) {
        this.luk = value;
    }
}
