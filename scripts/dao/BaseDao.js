/**
 * Daoのベースクラス。
 */
class BaseDao {

    /**
     * @param { Phaser.Scene } scene 取得対象のシーン
     * @param { string } tabName 対象のテーブル名
     */
    constructor(scene, tabName) {
        // 取得対象のシーン
        this.scene = scene;
        // テーブルデータを取得する
        /** @type {Object[]} テーブルデータ全体 */
        this.tabData = this.scene.registry.get(tabName);
    }

    /** IDで検索し、Modelのリストを取得する
     * @param {number} id 取得するID
     * @returns {BaseModel[]} Modelのリスト
     */
    getById(id) {
        /** @type {BaseModel[]} */
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COLNAME_COM_ID] == id);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = this.getModel();
            model.setAllProps(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /** Typeで検索し、Modelのリストを取得する
     * @param {number} type 取得するタイプ
     * @returns {Object[]} Modelのリスト
     */
    getByType(type) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COLNAME_COM_TYPE] == type);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = this.getModel();
            model.setAllProps(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /** すべてのレコードを取得。
     * @returns {BaseModel[]} 全てのModelリスト
     */
    getAll() {
        let modelList = [];

        for (let data of this.tabData) {
            // データの各項目をモデルにセットする
            /** @type {BaseModel} */
            let model = this.getModel();
            model.setAllProps(data);
            // モデルを配列にセット
            modelList.push(model);
        }

        return ObjectUtil.deepCopy(modelList);
    }

    /**
     * 子クラスで実装。対応するモデルクラスを返す
     * @returns 対応するモデルクラス
     */
    getModel() {
        throw new Error("[BaseDao]継承されていません。");
    }
}
