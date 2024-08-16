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

    create() {

        // データを保持するデータマネージャ
        const gameDataManager = new GameDataManager();

        // データをjsonファイルから取得
        // Electronを使ってJSONデータを読み込む

        const gameData = window.electronAPI.loadJsonData(C_ASSET.FILEPATH_DB + '/' + C_ASSET.FILENAME_DB_TEXT);

        // タイトルシーンに遷移
        this.scene.start(C_COMMON.SCENE_TITLESCENE);
    }
}
