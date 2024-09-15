/**
 * 敵キャラマスタのDao。
 */
class MstEnemyDao extends BaseDao {
    constructor(scene) {
        super(scene, C_DB.TABLE_NAME.M_ENEMY);
    }

    /**
     * MstEnemyModelのインスタンスを返す。
     * @returns {MstEnemyModel} インスタンス
     */
    getModel() {
        return new MstEnemyModel();
    }
}
