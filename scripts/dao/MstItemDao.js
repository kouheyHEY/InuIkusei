/**
 * アイテムマスタのDao。
 */
class MstItemDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_ITEM);
    }

    /**
     * MstItemModelのインスタンスを返す。
     * @returns {MstItemModel} インスタンス
     */
    getModel() {
        return new MstItemModel();
    }
}
