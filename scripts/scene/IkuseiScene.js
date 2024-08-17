class IkuseiScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_IKUSEISCENE });

    }

    /**
     * 画面生成用メソッド
     */
    create() {

        // ０．インスタンス変数などの初期化
        this.initInstVal();

        // １．背景の作成
        this.cameras.main.setBackgroundColor(
            C_COMMON.COMMON_COLOR_WHITE);

        // ２．各エリアの作成
        // 描画を行う
        this.grph = this.add.graphics();
        this.initArea();

        // ３．Phaser用メソッドの初期化
        /** @type {InputManager} 入力マネージャ */
        this.inputManager = new InputManager(this, [
            C_COMMON.KEY_UP,
            C_COMMON.KEY_DOWN,
            C_COMMON.KEY_RIGHT,
            C_COMMON.KEY_LEFT,
            C_COMMON.KEY_ENTER,
            C_COMMON.KEY_SPACE
        ]);

        // データの読み込み
        this.chara1SttModel = new CharaSttModel();

        // メニュー項目を初期化する
        let defaultMenuList = this.menuIkuseiList.map(menu => menu[C_DB.COL_NAME_MENU_DEF.MENUCOLNAME]);

        this.windowMenu.updateText(defaultMenuList);

    }

    /**
     * 画面更新用メソッド
     */
    update() {
        // キャラクターのステータスを更新する
        this.chara1SttModel.setHp(Math.floor(Date.now() / 1000) % 1000 + 1);
        this.chara1SttModel.setYp(Math.floor(Date.now() / 1000) % 1000 + 2);
        this.chara1SttModel.setAtk(Math.floor(Date.now() / 1000) % 1000 + 3);
        this.chara1SttModel.setDef(Math.floor(Date.now() / 1000) % 1000 + 4);
        this.chara1SttModel.setLuk(Math.floor(Date.now() / 1000) % 1000 + 5);

        this.updateCharaStt(0);

        /** 各キー押下時の処理を記載 */

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_ENTER)) {
            // エンターキー押下時

            if (this.isTextMainActive) {
                // テキストウインドウがアクティブの場合

                // テキストウインドウの文字列を更新する
                let textData = this.registry.get(C_DB.TABLE_NAME.TEXT);
                this.windowTextMain.updateText([textData[0][C_DB.COL_NAME_TEXT.TEXT]]);
            }

            if (this.isMenuActive) {
                // メニューウインドウがアクティブの場合

                // TODO: メニューウインドウの文字列を更新する
            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_SPACE)) {
            // スペースキー押下時

            // TODO: デバッグ用
            // フォーカスを切り替える
            if (this.isTextMainActive) {
                this.isTextMainActive = false;
                this.isMenuActive = true;
            } else {
                this.isTextMainActive = true;
                this.isMenuActive = false;

            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_UP)) {
            // 上キー押下時

            if (this.isMenuActive) {
                // メニューウインドウがアクティブの場合

                // 上のメニュー項目を選択する
                this.windowMenu.upMenu();
            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_DOWN)) {
            // 下キー押下時

            if (this.isMenuActive) {
                // メニューウインドウがアクティブの場合

                // 下のメニュー項目を選択する
                this.windowMenu.downMenu();
            }
        }

        console.log("update.");
    }

    /**
     * インスタンス変数の定義メソッド
     * this.XXXはここに記載
     */
    initInstVal() {
        // キャラのステータスなどを表示するかどうかのフラグ
        this.isDispChara1 = true;
        this.isDispChara2 = true;

        // 各ウインドウがフォーカスされているかどうかのフラグ
        this.isMenuActive = false;
        this.isTextMainActive = true;

        /** @type {TextWindow} キャラ１のステータスウインドウ */
        this.windowChara1Stt = null;
        /** @type {TextWindow} キャラ２のステータスウインドウ */
        this.windowChara2Stt = null;
        /** @type {TextWindow} 画面左下のメニューウインドウ */
        this.windowMenu = null;
        /** @type {TextWindow} 画面右下のテキストウインドウ */
        this.windowTextMain = null;

        // 各Daoの取得
        /** @type {MenuDefDao} メニュー定義テーブルDao */
        this.menuDefDao = new MenuDefDao(this);

        /** @type {CharaSttModel} キャラ１のステータス */
        this.chara1SttModel = null;
        /** @type {CharaSttModel} キャラ２のステータス */
        this.chara2SttModel = null;

        /** @type {MenuDefModel} キャラのステータス項目名のリスト */
        this.charaSttColModel = null;
        /** @type {TextModel} */
        this.TextModel = null;

        /** @type {string[]} デバッグ用 キャラステータス項目名メニュー */
        this.charaSttColList = ["HP", "やる気", "攻撃", "防御", "運"];

        // 育成メニュー
        /** @type {MenuDefModel[]} 育成メニューリスト */
        this.menuIkuseiList = this.menuDefDao.getMenuById(C_DB.MENU_ID_IKUSEI_MENU);


    }

    /** 画面上の各オブジェクトを表示する
     * （テキスト表示などは変動するため、適時別ロジックで表示）
     */
    initArea() {
        if (this.isDispChara1) {
            // キャラ１が存在する場合

            // キャラ１のステータスウインドウを描画
            this.windowChara1Stt = new TextWindow(
                C_IS.WINDOW_CHARA1_STATUS_X,
                C_IS.WINDOW_CHARA1_STATUS_Y,
                C_IS.WINDOW_CHARA1_STATUS_W,
                C_IS.WINDOW_CHARA1_STATUS_H,
                C_COMMON.COMMON_COLOR_WINDOW_FRAME,
                C_COMMON.COMMON_COLOR_WINDOW_BG,
                C_COMMON.COMMON_COLOR_WINDOW_FONT,
                false, true, false,
                this
            );
            this.windowChara1Stt.drawWindow(this.grph);
            this.windowChara1Stt.dispText(this.charaSttColList, true);
        }

        if (this.isDispChara2) {
            // キャラ２が存在する場合

            // キャラ２のステータスウインドウを描画
            this.windowChara2Stt = new TextWindow(
                C_IS.WINDOW_CHARA2_STATUS_X,
                C_IS.WINDOW_CHARA2_STATUS_Y,
                C_IS.WINDOW_CHARA2_STATUS_W,
                C_IS.WINDOW_CHARA2_STATUS_H,
                C_COMMON.COMMON_COLOR_WINDOW_FRAME,
                C_COMMON.COMMON_COLOR_WINDOW_BG,
                C_COMMON.COMMON_COLOR_WINDOW_FONT,
                false, true, false,
                this
            );
            this.windowChara2Stt.drawWindow(this.grph);
            this.windowChara2Stt.dispText(this.charaSttColList, true);
        }

        // 画面左下のメニューウインドウを描画
        this.windowMenu = new TextWindow(
            C_IS.WINDOW_MENU_X,
            C_IS.WINDOW_MENU_Y,
            C_IS.WINDOW_MENU_W,
            C_IS.WINDOW_MENU_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            false, true, true,
            this
        );
        this.windowMenu.drawWindow(this.grph);
        this.windowMenu.dispText(["MENU1", "MENU2", "MENU3", "MENU4"], true);

        // 画面右下のテキストウインドウを描画
        this.windowTextMain = new TextWindow(
            C_IS.WINDOW_TEXT_MAIN_X,
            C_IS.WINDOW_TEXT_MAIN_Y,
            C_IS.WINDOW_TEXT_MAIN_W,
            C_IS.WINDOW_TEXT_MAIN_H,
            C_COMMON.COMMON_COLOR_WINDOW_FRAME,
            C_COMMON.COMMON_COLOR_WINDOW_BG,
            C_COMMON.COMMON_COLOR_WINDOW_FONT,
            true, false, false,
            this
        );
        this.windowTextMain.drawWindow(this.grph);
        this.windowTextMain.dispText(["テスト文字列です。"], false);
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号(0, 1)
     */
    updateCharaStt(charaIdx) {
        let window = null;
        let charaModel = null;
        if (charaIdx === 0) {
            // キャラ１の場合
            window = this.windowChara1Stt;
            charaModel = this.chara1SttModel;
        } else if (charaIdx === 1) {
            // キャラ２の場合
            window = this.windowChara2Stt;
            charaModel = this.chara2SttModel;
        }

        if (window != null && charaModel != null) {

            // ステータスのリスト
            let sttList = [
                this.chara1SttModel.getHp(),
                this.chara1SttModel.getYp(),
                this.chara1SttModel.getAtk(),
                this.chara1SttModel.getDef(),
                this.chara1SttModel.getLuk()
            ];

            let sttTextList = [];

            for (let i = 0; i < sttList.length; i++) {
                // 項目名と値をウインドウの両端に配置する
                sttTextList.push(GraphicUtil.adjust2StrBothEnd(
                    this, this.charaSttColList[i], sttList[i],
                    this.windowChara1Stt.hSize - C_COMMON.WINDOW_PADDING_LINE * 2,
                    {
                        fontSize: C_COMMON.FONT_SIZE_SMALL,
                        fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                        fontFamily: C_COMMON.FONT_FAMILY_BIT12
                    }
                ));
            }

            // ウインドウの文字列を更新する
            window.updateText(sttTextList);
        }
    }

}