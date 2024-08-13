class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_BATTLESCENE });
    }

    /**
     * 画面生成用メソッド
     */
    create() {
        // ０．初期変数の生成
        this.initInstVal();

        // １．背景の作成
        this.cameras.main.setBackgroundColor(
            C_COMMON.COMMON_COLOR_WHITE);

        // ２．各エリアの作成
        // 描画用オブジェクト作成
        this.grph = this.add.graphics();

        // 各ウインドウのオブジェクト作成
        this.windowChara1Stt = null;
        this.windowChara2Stt = null;
        this.windowField = null;
        this.windowMenu = null;
        this.windowTextMain = null;

        // 各エリアの描画
        this.drawArea();

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
        // 各キャラのステータスを表示するかどうか
        this.isDispChara1 = true;
        this.isDispChara2 = true;
    }

    /** 画面上の各オブジェクトを表示する
     * （テキスト表示などは変動するため、適時別ロジックで表示）
     */
    drawArea() {
        /** @type {TextWindow} キャラ１のステータスウインドウ */
        if (this.isDispChara1) {
            this.windowChara1Stt = new TextWindow(
                C_BS.WINDOW_CHARA1_STATUS_X,
                C_BS.WINDOW_CHARA1_STATUS_Y,
                C_BS.WINDOW_CHARA1_STATUS_W,
                C_BS.WINDOW_CHARA1_STATUS_H,
                C_COMMON.COMMON_COLOR_WINDOW_FRAME,
                C_COMMON.COMMON_COLOR_WINDOW_BG,
                C_COMMON.COMMON_COLOR_WINDOW_FONT,
                this
            );
            this.windowChara1Stt.drawWindow(this.grph);
            this.windowChara1Stt.dispText(["MENU1_TEST", "MENU2_TEST"], true);
        }

        /** @type {TextWindow} キャラ２のステータスウインドウ */
        if (this.isDispChara2) {
            this.windowChara2Stt = new TextWindow(
                C_BS.WINDOW_CHARA2_STATUS_X,
                C_BS.WINDOW_CHARA2_STATUS_Y,
                C_BS.WINDOW_CHARA2_STATUS_W,
                C_BS.WINDOW_CHARA2_STATUS_H,
                C_COMMON.COMMON_COLOR_WINDOW_FRAME,
                C_COMMON.COMMON_COLOR_WINDOW_BG,
                C_COMMON.COMMON_COLOR_WINDOW_FONT,
                this
            );
            this.windowChara2Stt.drawWindow(this.grph);
            this.windowChara2Stt.dispText(["MENU1_TEST", "MENU2_TEST"], true);
        }

        /** @type {TextWindow} 画面右上のフィールドウインドウ */
        this.windowField = new TextWindow(
            C_BS.WINDOW_FIELD_STATUS_X,
            C_BS.WINDOW_FIELD_STATUS_Y,
            C_BS.WINDOW_FIELD_STATUS_W,
            C_BS.WINDOW_FIELD_STATUS_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            this
        );
        this.windowField.drawWindow(this.grph);
        this.windowField.dispText(["場所：砂漠", "天気：はれ", "時間：夜"], true);

        /** @type {TextWindow} 画面左下のメニューウインドウ */
        this.windowMenu = new TextWindow(
            C_BS.WINDOW_MENU_X,
            C_BS.WINDOW_MENU_Y,
            C_BS.WINDOW_MENU_W,
            C_BS.WINDOW_MENU_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            this
        );
        this.windowMenu.drawWindow(this.grph);
        this.windowMenu.dispText(["MENU1_TEST", "MENU2_TEST", "MENU3_TEST", "MENU4_TEST"], true);

        /** @type {TextWindow} 画面右下のテキストウインドウ */
        this.windowTextMain = new TextWindow(
            C_BS.WINDOW_TEXT_MAIN_X,
            C_BS.WINDOW_TEXT_MAIN_Y,
            C_BS.WINDOW_TEXT_MAIN_W,
            C_BS.WINDOW_TEXT_MAIN_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            this
        );
        this.windowTextMain.drawWindow(this.grph);
        this.windowTextMain.dispText(["テスト文字列です。"], false);
    }

}