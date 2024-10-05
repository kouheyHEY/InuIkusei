/**
 * キャラクターマネージャー
 */
class CharaManager {
    /**
     * コンストラクタ
     * @param {Scene} scene シーン
     */
    constructor(scene) {
        this.scene = scene;
        this.characters = {};
        this.tblSptCharaDao = new TblSptCharaDao(this.scene);
        this.initializeCharacters();
    }

    /**
     * キャラクターを初期化する
     */
    initializeCharacters() {
        const allCharacters = this.tblSptCharaDao.getAll();
        allCharacters.forEach(chara => {
            this.characters[chara.id] = chara;
        });
    }

    /**
     * 指定したIDのキャラクターを取得する
     * @param {number} id キャラクターID
     * @returns {TblSptCharaModel} キャラクターモデル
     */
    getCharacter(id) {
        return this.characters[id];
    }

    /**
     * 指定したIDのキャラクターを更新する
     * @param {number} id キャラクターID
     * @param {TblSptCharaModel} updates 更新内容
     */
    updateCharacter(id, updates) {
        if (this.characters[id]) {
            Object.assign(this.characters[id], updates);
            this.tblSptCharaDao.update(this.characters[id]);
        }
    }

    /**
     * 全キャラクターを取得する
     * @returns {TblSptCharaModel[]} キャラクターモデルの配列
     */
    getAllCharacters() {
        return Object.values(this.characters);
    }

    /**
     * 指定したキャラクターにエフェクトを適用する
     * @param {number} characterId キャラクターID
     * @param {EffectModel} effect エフェクトモデル
     */
    applyEffect(characterId, effect) {
        const character = this.getCharacter(characterId);
        if (character) {
            // エフェクトの適用ロジックをここに実装
            // 例: character.hp += effect.hpChange;
            this.updateCharacter(characterId, character);
        }
    }

}