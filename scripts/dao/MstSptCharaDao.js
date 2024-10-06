/**
 * 味方キャラマスタのDao。
 */
class MstSptCharaDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_SPT_CHARA);
    }

    /**
     * MstSptCharaModelのインスタンスを返す。
     * @returns {MstSptCharaModel} インスタンス
     */
    getModel() {
        return new MstSptCharaModel();
    }
}
