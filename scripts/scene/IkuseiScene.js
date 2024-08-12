class IkuseiScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_IKUSEISCENE });
    }

    /**
     * 画面生成用メソッド
     */
    create() {
        // １．背景の作成
        this.cameras.main.setBackgroundColor(
            C_COMMON.COMMON_COLOR_WHITE);

        // ２．各エリアの作成

        // 描画用オブジェクト作成
        this.grph = this.add.graphics();

        /** @type {TextWindow} 画面右下のテキストウインドウ */
        this.windowTextMain = new TextWindow(
            C_IS.WINDOW_TEXT_MAIN_X,
            C_IS.WINDOW_TEXT_MAIN_Y,
            C_IS.WINDOW_TEXT_MAIN_W,
            C_IS.WINDOW_TEXT_MAIN_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            this
        );
        this.windowTextMain.drawWindow(this.grph);
        this.windowTextMain.dispText(["テスト文字列です。"], false);

    }

    /**
     * 画面更新用メソッド
     */
    update() {

    }

    /**
     * インスタンス変数の定義メソッド
     * this.XXXはここに記載
     */
    initInstVal() {

    }

}