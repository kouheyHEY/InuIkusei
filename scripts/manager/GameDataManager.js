class GameDataManager {
    /**
     * ゲームデータ取得用マネージャ
     */
    constructor() {
        // キャラステータステーブル
        this.charaSttTable = null;
        // テキストテーブル
        this.textTable = null;
        // メニュー定義テーブル
        this.menuDefTable = null;
        // 進行状況テーブル
        this.ProgSttTable = null;
    }

    /**
     * ゲームデータのオブジェクトを取得し、テーブルに変換
     * @param {Object} data jsonファイルから取得したデータ
     */
    setGameData(data) {
        // キャラステータステーブル
        this.charaSttTable = data.charaSttTable;
        // テキストテーブル
        this.textTable = data.textTable;
        // メニュー定義テーブル
        this.menuDefTable = data.menuDefTable;
        // 進行状況テーブル
        this.ProgSttTable = data.ProgSttTable;
    }

    /**
     * テーブルのデータを更新する
     * @param {string} tableName テーブル名
     * @param {Object} tableData テーブルのデータ
     */
    setTableData(tableName, tableData) {
        this[tableName] = tableData;
    }

    /**
     * テーブルのデータを取得する
     * @param {string} tableName テーブル名
     * @returns {Object} テーブルのデータ
     */
    getTableData(tableName) {
        return this[tableName];
    }
}