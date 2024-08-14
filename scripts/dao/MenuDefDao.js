class MenuDefDao {
    constructor(gameDataManager) {
        /** @type {GameDataManager} ゲームデータ */
        this.gameDataManager = gameDataManager;
    }

    /** IDで検索し、モデルクラスを取得する
     * @param {number} id 取得するメニューのID
     */
    getModelById(id) {
        let model = null;
        // テーブルデータを取得する
        let data = this.gameDataManager.getTableData(
            C_DB.TABLE_NAME.MENU_DEF)[id];

        if (data != null) {
            // データが存在する場合

            // データの各項目をモデルにセットする
            model = new MenuDefModel();
            model.setMenuId(data[C_DB.COL_NAME_MENU_DEF.MENUID]);
            model.setMenuColId(data[C_DB.COL_NAME_MENU_DEF.MENUCOLID]);
            model.setMenuName(data[C_DB.COL_NAME_MENU_DEF.MENUNAME]);
            model.setMenuColName(data[C_DB.COL_NAME_MENU_DEF.MENUNAME]);
            model.setParentMenuId(data[C_DB.COL_NAME_MENU_DEF.PARENTMENUID]);
            model.setParentColId(data[C_DB.COL_NAME_MENU_DEF.PARENTCOLID]);

        }
        return model;
    }
}