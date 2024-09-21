/**
 * フィールドマスタのDao。
 */
class MstFieldDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_FIELD);
    }

    /**
     * MstFieldModelのインスタンスを返す。
     * @returns {MstFieldModel} インスタンス
     */
    getModel() {
        return new MstFieldModel();
    }
}
