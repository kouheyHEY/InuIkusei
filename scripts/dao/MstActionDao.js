/**
 * アクションマスタのDao。
 */
class MstActionDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_ACTION);
    }

    /**
     * MstActionModelのインスタンスを返す。
     * @returns {MstActionModel} インスタンス
     */
    getModel() {
        return new MstActionModel();
    }
}
