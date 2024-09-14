/**
 * 所持アイテムテーブルのDao。
 */
class TblItem extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_ITEM);
    }

    /**
     * TblItemModelのインスタンスを返す。
     * @returns {TblItemModel} インスタンス
     */
    getModel() {
        return new TblItemModel();
    }
}
