// PreloadScene.js
class PreLoadScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_PRELOADSCENE });
    }

    preload() {
        // 画像の読み込み
        // プレイヤー
        // this.load.image(
        //     C_ASSETS.IMAGE_KEY_PLAYER,
        //     C_ASSETS.FILE_PATH_IMAGE +
        //     C_ASSETS.FILE_PATH_IMAGE_PLAYER +
        //     C_ASSETS.IMAGE_FILE_PLAYER);

        // 弾の発射音
        // this.load.audio(
        //     C_ASSETS.MUSIC_KEY_SHOOT_1,
        //     C_ASSETS.FILE_PATH_MUSIC + C_ASSETS.MUSIC_FILE_SHOOT_1);

    }

    async create() {
        // データを保持するデータマネージャ
        const gameDataManager = new GameDataManager();

        // JSONデータを読み込み、GameDataManagerとレジストリにセットする関数
        const loadTableData = async (tableName, fileName) => {
            try {
                const jsonData = await window.electronAPI.readCSV(`${C_ASSET.FILEPATH_DB}/${fileName}`);
                if (jsonData) {
                    gameDataManager.setTableData(tableName, jsonData);
                    this.registry.set(tableName, gameDataManager.getTableData(tableName));
                }
            } catch {
                console.error(`Failed to load data for ${tableName}`);
            }
        };

        // テーブルデータの読み込み
        await loadTableData(C_DB.TABLE_NAME.M_MENU, C_ASSET.FILENAME_DB_M_MENU);
        await loadTableData(C_DB.TABLE_NAME.M_ENEMY, C_ASSET.FILENAME_DB_M_ENEMY);
        await loadTableData(C_DB.TABLE_NAME.M_TEXT, C_ASSET.FILENAME_DB_M_TEXT);
        await loadTableData(C_DB.TABLE_NAME.M_ITEM, C_ASSET.FILENAME_DB_M_ITEM);
        await loadTableData(C_DB.TABLE_NAME.M_FIELD, C_ASSET.FILENAME_DB_M_FIELD);
        await loadTableData(C_DB.TABLE_NAME.M_ACTION, C_ASSET.FILENAME_DB_M_ACTION);
        await loadTableData(C_DB.TABLE_NAME.T_ITEM, C_ASSET.FILENAME_DB_T_ITEM);
        await loadTableData(C_DB.TABLE_NAME.T_SPT_CHARA, C_ASSET.FILENAME_DB_T_SPT_CHARA);
        await loadTableData(C_DB.TABLE_NAME.T_ENEMY, C_ASSET.FILENAME_DB_T_ENEMY);
        await loadTableData(C_DB.TABLE_NAME.T_ACTION, C_ASSET.FILENAME_DB_T_ACTION);
        // タイトルシーンに遷移
        this.scene.start(C_COMMON.SCENE_TITLESCENE);
    }

}
