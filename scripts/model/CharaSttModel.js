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
     * @returns {number} キャラID
     */
    getCharaId() {
        return this.charaId;
    }

    /**
     * @param {number} charaId キャラID
     */
    setCharaId(charaId) {
        this.charaId = charaId;
    }

    /**
     * @returns {string} キャラ名
     */
    getCharaName() {
        return this.charaName;
    }

    /**
     * @param {string} charaName キャラ名
     */
    setCharaName(charaName) {
        this.charaName = charaName;
    }

    /**
     * @returns {number} 最大体力
     */
    getMaxHp() {
        return this.maxHp;
    }

    /**
     * @param {number} maxHp 最大体力
     */
    setMaxHp(maxHp) {
        this.maxHp = maxHp;
    }

    /**
     * @returns {number} 体力
     */
    getHp() {
        return this.hp;
    }

    /**
     * @param {number} hp 体力
     */
    setHp(hp) {
        this.hp = hp;
    }

    /**
     * @returns {number} 最大やる気
     */
    getMaxYp() {
        return this.maxYp;
    }

    /**
     * @param {number} maxYp 最大やる気
     */
    setMaxYp(maxYp) {
        this.maxYp = maxYp;
    }

    /**
     * @returns {number} やる気
     */
    getYp() {
        return this.yp;
    }

    /**
     * @param {number} yp やる気
     */
    setYp(yp) {
        this.yp = yp;
    }

    /**
     * @returns {number} 運
     */
    getLuk() {
        return this.luk;
    }

    /**
     * @param {number} luk 運
     */
    setLuk(luk) {
        this.luk = luk;
    }

    /**
     * @returns {number} 攻撃力
     */
    getAtk() {
        return this.atk;
    }

    /**
     * @param {number} atk 攻撃力
     */
    setAtk(atk) {
        this.atk = atk;
    }

    /**
     * @returns {number} 防御力
     */
    getDef() {
        return this.def;
    }

    /**
     * @param {number} def 防御力
     */
    setDef(def) {
        this.def = def;
    }

    /**
     * @returns {number} 装備1id
     */
    getEqp1() {
        return this.eqp1;
    }

    /**
     * @param {number} eqp1 装備1id
     */
    setEqp1(eqp1) {
        this.eqp1 = eqp1;
    }

    /**
     * @returns {number} 装備2id
     */
    getEqp2() {
        return this.eqp2;
    }

    /**
     * @param {number} eqp2 装備2id
     */
    setEqp2(eqp2) {
        this.eqp2 = eqp2;
    }

    /**
     * クラスのプロパティとその値を持つオブジェクトを返す
     * @returns {Object} プロパティと値を持つオブジェクト
     */
    getPropertiesObject() {
        return {
            charaId: this.charaId,
            charaName: this.charaName,
            maxHp: this.maxHp,
            hp: this.hp,
            maxYp: this.maxYp,
            yp: this.yp,
            luk: this.luk,
            atk: this.atk,
            def: this.def,
            eqp1: this.eqp1,
            eqp2: this.eqp2
        };
    }

    /**
     * オブジェクトからプロパティの値を設定する
     * @param {Object} obj プロパティと値を持つオブジェクト
     */
    setPropertiesFromObject(obj) {
        if (obj.hasOwnProperty('charaId')) {
            this.charaId = obj.charaId;
        }
        if (obj.hasOwnProperty('charaName')) {
            this.charaName = obj.charaName;
        }
        if (obj.hasOwnProperty('maxHp')) {
            this.maxHp = obj.maxHp;
        }
        if (obj.hasOwnProperty('hp')) {
            this.hp = obj.hp;
        }
        if (obj.hasOwnProperty('maxYp')) {
            this.maxYp = obj.maxYp;
        }
        if (obj.hasOwnProperty('yp')) {
            this.yp = obj.yp;
        }
        if (obj.hasOwnProperty('luk')) {
            this.luk = obj.luk;
        }
        if (obj.hasOwnProperty('atk')) {
            this.atk = obj.atk;
        }
        if (obj.hasOwnProperty('def')) {
            this.def = obj.def;
        }
        if (obj.hasOwnProperty('eqp1')) {
            this.eqp1 = obj.eqp1;
        }
        if (obj.hasOwnProperty('eqp2')) {
            this.eqp2 = obj.eqp2;
        }
    }


    /**
     * クラスのプロパティ名を配列として返す
     * @returns {string[]} プロパティ名の配列
     */
    getPropertyNames() {
        return [
            'charaId',
            'charaName',
            'maxHp',
            'hp',
            'maxYp',
            'yp',
            'luk',
            'atk',
            'def',
            'eqp1',
            'eqp2'
        ];
    }

    /**
     * キャラの表示用ステータス文字列を返す
     */
    getDispValList() {
        return [
            this.charaName,
            `${this.hp}/${this.maxHp}`,
            `${this.yp}/${this.maxYp}`,
            this.luk,
            this.atk,
            this.def,
            this.eqp1,
            this.eqp2
        ];
    }
}
