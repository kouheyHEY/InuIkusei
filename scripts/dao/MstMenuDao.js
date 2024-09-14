/**
 * メニューマスタのDao。
 */
class MstMenu extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_MENU);
    }

    /**
     * MstMenuModelのインスタンスを返す。
     * @returns {MstMenuModel} インスタンス
     */
    getModel() {
        return new MstMenuModel();
    }
}

