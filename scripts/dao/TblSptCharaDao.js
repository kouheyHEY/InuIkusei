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
}
