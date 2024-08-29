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

        // 初期にアクティブにするウインドウの設定
        this.windowMenu.isActive = true;

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
    }

    /**
     * 画面更新用メソッド
     */
    update() {

        // TODO: デバッグ用
        this.updateCharaStt(0);

        /* メニューがアクティブの時の更新処理 */
        if (this.windowMenu.isActive) {
            /* メニュー項目の説明文の表示処理 */
            this.windowTextMain.setContent(
                this.windowMenu.dispContent[this.windowMenu.choosedMenuIdx].getColDetail(),
                C_COMMON.WINDOW_CONTENT_TYPE_LINE
            );

            /* メニュー選択時の処理 */
            if (this.windowMenu.pressedMenu) {
                // メニューが押された時
                /** @type {MenuDefModel} 選択されたメニュー */
                const pressedMenu = this.windowMenu.pressedObj;

                if (pressedMenu.getChildColId() == C_DB.CHILDCOLID_USEITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_EQPITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_SPITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_SPRT
                ) {
                    // メインウインドウに詳細の表示を行う場合

                    // フォーカスをメインウインドウに移動
                    this.windowMenu.isActive = false;
                    this.windowTextMain.isActive = true;

                    console.log(this.itemDao);

                    /* メインウインドウ表示対象のリスト取得処理 */
                    if (pressedMenu.getChildColId() == C_DB.CHILDCOLID_USEITEM) {
                        // 消費アイテム一覧を取得する
                        this.dispItemList = this.itemDao.getByType(C_DB.ITEMTYPE_USEITEM);
                    } else if (pressedMenu.getChildColId() == C_DB.CHILDCOLID_EQPITEM) {
                        // 装備アイテム一覧を取得する
                        this.dispItemList = this.itemDao.getByType(C_DB.ITEMTYPE_EQPITEM);
                    } else if (pressedMenu.getChildColId() == C_DB.CHILDCOLID_SPITEM) {
                        // 特別アイテム一覧を取得する
                        this.dispItemList = this.itemDao.getByType(C_DB.ITEMTYPE_SPITEM);
                    }

                    // メインウインドウにリストを表示する
                    this.windowTextMain.changeToList(true, C_IS.WINDOW_TEXT_MAIN_COL_NUM);
                    this.windowTextMain.setContent(this.dispItemList, C_COMMON.WINDOW_CONTENT_TYPE_ITEM);

                } else {
                    // 子メニューの表示を行う場合
                    // 子メニューを取得
                    const childMenu = this.menuDefDao.getMenuById(pressedMenu.getChildMenuId());

                    // メニューの状態を更新する
                    this.windowMenu.setContent(childMenu, C_COMMON.WINDOW_CONTENT_TYPE_MENU);
                }
            }
        }

        /* メインウインドウがアクティブの時の更新処理 */
        if (this.windowTextMain.isActive) {

            if (this.dispItemList != null) {
                // リスト表示時

            }
        }

        /* 各キー押下時の処理を記載 */

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_ENTER)) {
            // エンターキー押下時

            if (this.windowTextMain.isActive) {
                // テキストウインドウがアクティブの場合

                // テキストウインドウの文字列を更新する
                let textData = this.registry.get(C_DB.TABLE_NAME.TEXT);
                this.windowTextMain.updateText([textData[0][C_DB.COL_NAME_TEXT.TEXT]]);
            }

            if (this.windowMenu.isActive) {
                // メニューウインドウがアクティブの場合

                // TODO: メニューウインドウの文字列を更新する
            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_SPACE)) {
            // スペースキー押下時

            // TODO: デバッグ用
            // フォーカスを切り替える
            if (this.windowTextMain.isActive) {
                this.windowTextMain.isActive = false;
                this.windowMenu.isActive = true;
            } else {
                this.windowTextMain.isActive = true;
                this.windowMenu.isActive = false;

            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_UP)) {
            // 上キー押下時

            if (this.windowMenu.isActive) {
                // メニューウインドウがアクティブの場合

                // 上のメニュー項目を選択する
                this.windowMenu.upMenu();
            }
        }

        if (this.inputManager.isKeyPressed(C_COMMON.KEY_DOWN)) {
            // 下キー押下時

            if (this.windowMenu.isActive) {
                // メニューウインドウがアクティブの場合

                // 下のメニュー項目を選択する
                this.windowMenu.downMenu();
            }
        }
    }

    /**
     * インスタンス変数の定義メソッド
     * this.XXXはここに記載
     */
    initInstVal() {
        // メインウインドウに表示するアイテムのリスト
        this.dispItemList = null;
        // 処理を行うアイテム
        this.useItem = null;

        /** @type {TextWindow} キャラ１のステータスウインドウ */
        this.windowChara1Stt = null;
        /** @type {TextWindow} キャラ２のステータスウインドウ */
        this.windowChara2Stt = null;
        /** @type {TextWindow} 画面左下のメニューウインドウ */
        this.windowMenu = null;
        /** @type {TextWindow} 画面右下のテキストウインドウ */
        this.windowTextMain = null;

        // 各Daoの取得
        /** @type {CharaSttDao} キャラステータステーブルDao */
        this.charaSttDao = new CharaSttDao(this);
        /** @type {MenuDefDao} メニュー定義テーブルDao */
        this.menuDefDao = new MenuDefDao(this);
        /** @type {ItemDao} アイテムDao */
        this.itemDao = new ItemDao(this);
        /** @type {ItemDefDao} アイテム定義Dao */
        this.itemDefDao = new ItemDefDao(this);

        /** @type {CharaSttModel} キャラ１のステータス */
        this.chara1SttModel = this.charaSttDao.getById(C_DB.CHARAID_SPRT1);
        /** @type {CharaSttModel} キャラ２のステータス */
        this.chara2SttModel = this.charaSttDao.getById(C_DB.CHARAID_SPRT2);

        // キャラのステータスなどを表示するかどうかのフラグ
        this.isDispChara1 = this.chara1SttModel.getCharaName() !== C_DB.CHARANAME_NULL;
        this.isDispChara2 = this.chara2SttModel.getCharaName() !== C_DB.CHARANAME_NULL;

        /** @type {TextModel} テキストモデル */
        this.textModel = null;

        /** @type {MenuDefModel[]} キャラステータス項目名メニュー */
        this.charaSttColList = this.menuDefDao.getMenuById(C_DB.MENU_ID_CHARA_STT);

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
                {
                    startX: C_IS.WINDOW_CHARA1_STATUS_X,
                    startY: C_IS.WINDOW_CHARA1_STATUS_Y,
                    hSize: C_IS.WINDOW_CHARA1_STATUS_W,
                    vSize: C_IS.WINDOW_CHARA1_STATUS_H,
                    menuColNum: 1,
                    isLine: false, isList: true, isMenu: false
                },
                this);
            this.windowChara1Stt.drawWindow(this.grph);
        }

        if (this.isDispChara2) {
            // キャラ２が存在する場合

            // キャラ２のステータスウインドウを描画
            this.windowChara2Stt = new TextWindow(
                {
                    startX: C_IS.WINDOW_CHARA2_STATUS_X,
                    startY: C_IS.WINDOW_CHARA2_STATUS_Y,
                    hSize: C_IS.WINDOW_CHARA2_STATUS_W,
                    vSize: C_IS.WINDOW_CHARA2_STATUS_H,
                    menuColNum: 1,
                    isLine: false, isList: true, isMenu: false
                },
                this);
            this.windowChara2Stt.drawWindow(this.grph);
        }

        // 画面左下のメニューウインドウを描画
        this.windowMenu = new TextWindow(
            {
                startX: C_IS.WINDOW_MENU_X,
                startY: C_IS.WINDOW_MENU_Y,
                hSize: C_IS.WINDOW_MENU_W,
                vSize: C_IS.WINDOW_MENU_H,
                menuColNum: 1,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                isLine: false, isList: true, isMenu: true
            },
            this);
        this.windowMenu.drawWindow(this.grph);
        this.windowMenu.setContent(this.menuIkuseiList, C_COMMON.WINDOW_CONTENT_TYPE_MENU);

        // 画面右下のテキストウインドウを描画
        this.windowTextMain = new TextWindow(
            {
                startX: C_IS.WINDOW_TEXT_MAIN_X,
                startY: C_IS.WINDOW_TEXT_MAIN_Y,
                hSize: C_IS.WINDOW_TEXT_MAIN_W,
                vSize: C_IS.WINDOW_TEXT_MAIN_H,
                menuCol: 1,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                isLine: true, isList: false, isMenu: false
            },
            this);
        this.windowTextMain.drawWindow(this.grph);
        this.windowTextMain.setContent("テスト文字列です。");
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号(0, 1)
     */
    updateCharaStt(charaIdx) {
        let window = null;
        let charaSttList = null;

        if (charaIdx === 0) {
            // キャラ１の場合
            window = this.windowChara1Stt;
            charaSttList = this.chara1SttModel.getDispValList();
        } else if (charaIdx === 1) {
            // キャラ２の場合
            window = this.windowChara2Stt;
            charaSttList = this.chara2SttModel.getDispValList();
        }

        if (window != null && charaSttList != null) {

            let sttTextList = [];

            for (let i = 0; i < this.charaSttColList.length; i++) {

                // 表示するステータス項目の値
                let sttVal = null;
                // 装備を表示する場合
                if (this.charaSttColList[i].getMenuColId() == C_DB.COL_ID_EQP1 ||
                    this.charaSttColList[i].getMenuColId() == C_DB.COL_ID_EQP2) {

                    // 装備品をアイテム定義から取得する
                    let eqpItem = this.itemDao.getById(charaSttList[i]);
                    sttVal = eqpItem.length != 0 ? eqpItem[0].getItemName() : 'なし';
                } else {
                    sttVal = charaSttList[i];
                }

                // 項目名と値をウインドウの両端に配置する
                sttTextList.push(GraphicUtil.adjust2StrBothEnd(
                    this, this.charaSttColList[i].getMenuColName(), sttVal,
                    this.windowChara1Stt.hSize - C_COMMON.WINDOW_PADDING_LINE * 2,
                    {
                        fontSize: C_COMMON.FONT_SIZE_SMALL_2,
                        fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                        fontFamily: C_COMMON.FONT_FAMILY_BIT12
                    }
                ));
            }

            // ウインドウの文字列を更新する
            window.setContent(sttTextList, C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST, true);
        }
    }

}