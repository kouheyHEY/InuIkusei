/**
 * アクションテーブルのDao。
 */
class TblActionDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.TBL_ACTION);
    }

    /**
     * MstActionModelのインスタンスを返す。
     * @returns {MstActionModel} インスタンス
     */
    getModel() {
        return new TblActionModel();
    }
}
