/**
 * テキストマスタのDao。
 */
class MstTextDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_TEXT);
    }

    /**
     * MstTextModelのインスタンスを返す。
     * @returns {MstTextModel} インスタンス
     */
    getModel() {
        return new MstTextModel();
    }
}
