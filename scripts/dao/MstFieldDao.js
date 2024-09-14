/**
 * フィールドマスタのDao。
 */
class MstFiled extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_FILED);
    }

    /**
     * MstFiledModelのインスタンスを返す。
     * @returns {MstFiledModel} インスタンス
     */
    getModel() {
        return new MstFiledModel();
    }
}
