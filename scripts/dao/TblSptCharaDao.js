/**
 * 味方キャラテーブルのDao。
 */
class TblSptCharaDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_SPT_CHARA);
    }

    /**
     * TblSptCharaModelのインスタンスを返す。
     * @returns {TblSptCharaModel} インスタンス
     */
    getModel() {
        return new TblSptCharaModel();
    }

    /**
     * 全てのキャラクターを更新する
     * @param {TblSptCharaModel[]} characters キャラクターリスト
     */
    updateAll(characters) {
        // デバッグ
        console.log(characters);
        for (let chara of characters) {
            this.updateChara(chara);
        }
    }

    /**
     * 指定したキャラクターを更新する
     * @param {TblSptCharaModel} chara キャラクター
     */
    updateChara(chara) {
        const index = this.tabData.findIndex(c => c.id == chara.id);
        if (index === -1) {
            // キャラが存在しない場合
            throw new Error(`[TblSptCharaDao.updateChara] キャラが存在しません。characterId: ${chara.id}`);
        }
        this.tabData[index] = chara.getAllProps();
    }
}
