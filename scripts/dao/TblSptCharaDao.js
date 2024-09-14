/**
 * 味方キャラテーブルのDao。
 */
class TblSptChara extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_SPTCHARA);
    }

    /**
     * TblSptCharaModelのインスタンスを返す。
     * @returns {TblSptCharaModel} インスタンス
     */
    getModel() {
        return new TblSptCharaModel();
    }
}
