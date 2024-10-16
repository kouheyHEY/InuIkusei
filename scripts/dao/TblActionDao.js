/**
 * アクションテーブルのDao。
 */
class TblActionDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_ACTION);
    }

    /**
     * TblActionModelのインスタンスを返す。
     * @returns {TblActionModel} インスタンス
     */
    getModel() {
        return new TblActionModel();
    }
}
