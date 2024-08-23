class ItemDao {

    /**
     * @param { Phaser.Scene } scene 取得対象のシーン
     */
    constructor(scene) {
        // 取得対象のシーン
        this.scene = scene;
        // テーブルデータを取得する
        /** @type {Object[]} テーブルデータ全体 */
        this.tabData = this.scene.registry.get(C_DB.TABLE_NAME.ITEM);
    }

    /** IDで検索し、ItemModelのリストを取得する
     * @param {number} id 取得するID
     * @returns {ItemModel[]} ItemModelのリスト
     */
    getById(id) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COL_NAME_ITEM.ITEMID] == id);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = new ItemModel();
            model.setPropertiesFromObject(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }
}
