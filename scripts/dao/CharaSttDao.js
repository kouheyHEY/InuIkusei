class CharaSttDao {

    /**
     * @param { Phaser.Scene } scene 取得対象のシーン
     */
    constructor(scene) {
        // 取得対象のシーン
        this.scene = scene;
        // テーブルデータを取得する
        /** @type {Object[]} テーブルデータ全体 */
        this.tabData = this.scene.registry.get(C_DB.TABLE_NAME.CHARA_STT);
    }

    /** IDで検索し、CharaSttModelのリストを取得する
     * @param {number} id 取得するID
     * @returns {CharaSttModel[]} CharaSttModelのリスト
     */
    getById(id) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COL_NAME_CHARASTT.CHARAID] == id);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = new CharaSttModel();
            model.setPropertiesFromObject(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }

    /** Typeで検索し、CharaSttModelのリストを取得する
     * @param {number} type 取得するタイプ
     * @returns {CharaSttModel[]} CharaSttModelのリスト
     */
    getByType(type) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COL_NAME_CHARASTT.CHARATYPE] == type);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = new CharaSttModel();
            model.setPropertiesFromObject(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }
}
