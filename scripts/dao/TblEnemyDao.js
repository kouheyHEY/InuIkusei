/**
 * 敵キャラテーブルのDao。
 */
class TblEnemyDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.T_ENEMY);
    }

    /**
     * TblEnemyModelのインスタンスを返す。
     * @returns {TblEnemyModel} インスタンス
     */
    getModel() {
        return new TblEnemyModel();
    }
}
