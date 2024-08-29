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
        await loadTableData(C_DB.TABLE_NAME.TEXT, C_ASSET.FILENAME_DB_TEXT);
        await loadTableData(C_DB.TABLE_NAME.MENU_DEF, C_ASSET.FILENAME_DB_MENU_DEF);
        await loadTableData(C_DB.TABLE_NAME.CHARA_STT, C_ASSET.FILENAME_DB_CHARA_STT);
        await loadTableData(C_DB.TABLE_NAME.ITEM, C_ASSET.FILENAME_DB_ITEM);
        await loadTableData(C_DB.TABLE_NAME.ITEM_DEF, C_ASSET.FILENAME_DB_ITEM_DEF);

        // タイトルシーンに遷移
        this.scene.start(C_COMMON.SCENE_TITLESCENE);
    }

}
