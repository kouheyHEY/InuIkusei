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
     * 全キャラクターを取得する
     * @returns {TblSptCharaModel[]} キャラクターモデルの配列
     */
    getAllCharacters() {
        return Object.values(this.characters);
    }

    /**
     * 指定したIDのキャラクターが存在するかどうかを確認する
     * @param {number} id キャラクターID
     * @returns {boolean} キャラクターが存在するかどうか
     */
    isCharaExist(id) {
        // TODO: 存在確認の方法を考える
        // return this.characters[id] !== undefined;
        return this.characters[id].name !== C_DB.T_SPT_CHARA.NAME_NULL;
    }

    /**
     * 指定したIDのキャラクターの対象パラメータを更新する
     * @param {number} id キャラクターID
     * @param {object} updateParams 更新パラメータ
     */
    updateCharacter(id, updateParams) {
        if (this.characters[id]) {
            // キャラが存在する場合
            for (const key in updateParams) {
                // 更新パラメータを更新
                this.characters[id][key] = updateParams[key];
            }
        }
    }

    /**
     * 指定したキャラクターにエフェクトを適用する
     * @param {number} characterId キャラクターID
     * @param {EffectModel} effect エフェクトモデル
     * @param {number} type エフェクト種類
     */
    applyEffect(characterId, effect, type) {
        const character = this.getCharacter(characterId);
        if (!character) {
            // キャラが存在しない場合
            throw new Error(`[CharaManager.applyEffect] キャラが存在しません。characterId: ${characterId}`);
        }

        if (type === C_COMMON.EFFECT_TYPE_ITEM) {
            // アイテムの場合
            EffectUtils.applyItemEffect(effect, character);
        } else if (type === C_COMMON.EFFECT_TYPE_ACTION) {
            // アクションの場合
            EffectUtils.applyActionEffect(effect, character);
        }
        this.updateCharacter(characterId, character);
        console.log(character);
    }

}