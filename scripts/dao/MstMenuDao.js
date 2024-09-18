/**
 * メニューマスタのDao。
 */
class MstMenuDao extends BaseDao {
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

    /** MenuIDで検索し、Modelのリストを取得する
     * @param {number} id 取得するMenuID
     * @returns {MstMenuModel[]} Modelのリスト
     */
    getByMenuId(id) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COLNAME_MENUID] == id);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = this.getModel();
            model.setAllProps(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }

    /** メニューIDと項目IDで検索し、対象のModelを取得する
     * @param {number} id 取得するMenuID
     * @returns {MstMenuModel} 対象のModel
     */
    getByMenuAndColId(menuId, colId) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data =>
            data[C_DB.COLNAME_MENUID] == menuId &&
            data[C_DB.COLNAME_COLID] == colId
        );

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = this.getModel();
            model.setAllProps(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }
}

