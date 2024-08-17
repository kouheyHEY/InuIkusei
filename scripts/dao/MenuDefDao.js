class MenuDefDao {

    /**
     * @param { Phaser.Scene } scene 取得対象のシーン
     */
    constructor(scene) {
        // 取得対象のシーン
        this.scene = scene;
        // テーブルデータを取得する
        /** @type {Object[]} テーブルデータ全体 */
        this.tabData = this.scene.registry.get(C_DB.TABLE_NAME.MENU_DEF);
    }

    /** IDで検索し、メニュー項目のリストを取得する
     * @param {number} menuId 取得するメニューのID
     * @returns {MenuDefModel[]} メニュー項目のリスト
     */
    getMenuById(menuId) {
        let modelList = [];

        // 一致するデータを取得
        let dataList = this.tabData.filter(data => data[C_DB.COL_NAME_MENU_DEF.MENUID] === menuId);

        for (let data of dataList) {
            // データの各項目をモデルにセットする
            let model = new MenuDefModel();
            model.setMenuId(data[C_DB.COL_NAME_MENU_DEF.MENUID]);
            model.setMenuColId(data[C_DB.COL_NAME_MENU_DEF.MENUCOLID]);
            model.setMenuName(data[C_DB.COL_NAME_MENU_DEF.MENUNAME]);
            model.setMenuColName(data[C_DB.COL_NAME_MENU_DEF.MENUCOLNAME]);
            model.setParentMenuId(data[C_DB.COL_NAME_MENU_DEF.PARENTMENUID]);
            model.setParentColId(data[C_DB.COL_NAME_MENU_DEF.PARENTCOLID]);

            // モデルを配列にセット
            modelList.push(model);
        }

        return modelList;
    }
}