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
        this.cameras.main.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

        // ２．各エリアの作成
        // 描画を行う
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

        /* メニューがアクティブの時の更新処理 */
        if (this.windowMenu.isActive) {

            /* メニュー選択時の処理 */
            if (this.windowMenu.pressedMenu) {
                // メニューが押された時
                const pressedMenu = this.windowMenu.pressedObj;

                if (pressedMenu.getChildColId() == C_DB.CHILDCOLID_USEITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_EQPITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_SPITEM ||
                    pressedMenu.getChildColId() == C_DB.CHILDCOLID_SPRT
                ) {
                    // メインウインドウに詳細の表示を行う場合

                    // フォーカスをメインウインドウに移動
                    this.windowMenu.setActive(false);
                    this.windowTextMain.setActive(true);

                    // 子メニューを取得
                    const childObj = this.dispCttMenu.getChildContent(this.windowMenu.choosedMenuIdx);

                    // メニューの状態を更新する
                    this.dispCttTextMain.initContent();
                    this.dispCttTextMain.addContentListFromObject(childObj);
                    this.windowTextMain.menuColNum = C_IS.WINDOW_TEXT_MAIN_COL_NUM;
                    this.windowTextMain.setDispContent(this.dispCttTextMain);

                } else {
                    // 子メニューの表示を行う場合
                    // 子メニューを取得し、そのまま表示コンテンツとして設定
                    this.dispCttMenu.setChildContent(this.windowMenu.choosedMenuIdx);

                    // メニューの状態を更新する
                    this.windowMenu.setDispContent(this.dispCttMenu);
                }
            }
        }

        /* メインウインドウがアクティブの時の更新処理 */
        if (this.windowTextMain.isActive) {
            if (this.windowTextMain.pressedMenu) {
                // メニューが押された時

                // 子メニューを取得する
                const childObj = this.dispCttTextMain.getChildContent(this.windowTextMain.choosedMenuIdx);

                if (this.windowTextMain.pressedObj == C_COMMON.WINDOW_MENU_BACK) {
                    // 戻る押下時
                    if (childObj == C_COMMON.CHILDMENU_NULL_BACK) {
                        // 表示履歴がない場合
                        // フォーカスをメニューウインドウに戻す
                        this.windowTextMain.setActive(false, true);
                        this.windowMenu.setActive(true);

                    } else {
                        // 表示履歴がある場合
                        // 表示履歴を復元する
                        this.dispCttTextMain.restoreContent();
                        this.windowTextMain.setDispContent(this.dispCttTextMain);
                    }
                } else if (childObj == C_COMMON.CHILDMENU_NULL_NEXT) {
                    // 「戻る」以外押下かつ次表示要素がない場合
                    // TODO: キャラに効果を適用
                } else {
                    // それ以外の場合

                    // 子メニューを表示内容にセット
                    this.dispCttTextMain.archiveContent();
                    this.dispCttTextMain.addContentListFromObject(childObj);
                    this.windowTextMain.setDispContent(this.dispCttTextMain);
                }
            }
        }

        // メインウインドウの項目がフォーカスされている場合
        if (this.windowTextMain.isFocused) {
            const dispDetail = this.dispCttTextMain.dispDetailList[this.windowTextMain.choosedMenuIdx];

            // 説明文を表示する
            this.cursorText = dispDetail.length != 0 ? dispDetail : null;

        } else if (this.windowMenu.isFocused) {
            const dispDetail = this.dispCttMenu.dispDetailList[this.windowMenu.choosedMenuIdx];

            // 説明文を表示する
            this.cursorText = dispDetail.length != 0 ? dispDetail : null;
        } else {
            this.cursorText = null;
        }

        /* 各項目フォーカス時のカーソルウインドウの表示 */
        if (this.cursorText != null) {
            // カーソルウインドウのテキストがセットされている場合

            if (this.windowCursor == null) {
                // カーソルウインドウが作成されていない場合
                // カーソルウインドウを作成
                this.windowCursor = new TextWindow({
                    startX: C_COMMON.WINDOW_CURSOR_X,
                    startY: C_COMMON.WINDOW_CURSOR_Y,
                    hSize: C_COMMON.WINDOW_CURSOR_W,
                    vSize: C_COMMON.WINDOW_CURSOR_H,
                    paddingLine: C_COMMON.WINDOW_PADDING_LEFT_SMALL_2,
                }, this);
                this.windowCursor.drawWindow();

                // カーソルウインドウに内容を表示
                const cursorDispCtt = new DispContent(false, true, false, C_COMMON.WINDOW_CONTENT_TYPE_LINE, this);
                cursorDispCtt.addContent(this.cursorText);
                this.windowCursor.setDispContent(cursorDispCtt);
            }

            // ウインドウの位置を調整
            this.windowCursor.setWindowPosition(this.input.activePointer.x, this.input.activePointer.y);

        } else {
            // カーソルウインドウのテキストがセットされていない場合
            if (this.windowCursor != null) {
                // カーソルウインドウが作成されている場合

                // カーソルウインドウを削除
                this.windowCursor.destroy();
                this.windowCursor = null;
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
        // メインウインドウに表示するキャラのリスト
        this.dispCharaList = null;
        // 処理を行うアイテム
        this.useItem = null;
        // カーソルウインドウに表示する文
        this.cursorText = null;

        /** @type {TextWindow} キャラ１のステータスウインドウ */
        this.windowChara1Stt = null;
        /** @type {TextWindow} キャラ２のステータスウインドウ */
        this.windowChara2Stt = null;
        /** @type {TextWindow} 画面左下のメニューウインドウ */
        this.windowMenu = null;
        /** @type {TextWindow} 画面右下のテキストウインドウ */
        this.windowTextMain = null;
        /** @type {TextWindow} マウスに追従するカーソルウインドウ */
        this.windowCursor = null;

        /** @type {DispContent} メニューウインドウ表示コンテンツ */
        this.dispCttMenu = null;
        /** @type {DispContent} メインウインドウ表示コンテンツ */
        this.dispCttTextMain = null;

        // 各Daoの取得
        /** @type {CharaSttDao} キャラステータステーブルDao */
        this.charaSttDao = new CharaSttDao(this);
        /** @type {MenuDefDao} メニュー定義テーブルDao */
        this.menuDefDao = new MenuDefDao(this);
        /** @type {ItemDao} アイテムDao */
        this.itemDao = new ItemDao(this);
        /** @type {ItemDefDao} アイテム定義Dao */
        this.itemDefDao = new ItemDefDao(this);

        // DaoManagerのセット
        this.daoManager = new DaoManager();
        this.daoManager.setDao(C_CLASS.NAME_CHARA_STT_DAO, this.charaSttDao);
        this.daoManager.setDao(C_CLASS.NAME_MENU_DEF_DAO, this.menuDefDao);
        this.daoManager.setDao(C_CLASS.NAME_ITEM_DAO, this.itemDao);
        this.daoManager.setDao(C_CLASS.NAME_ITEM_DEF_DAO, this.itemDefDao);

        /** @type {CharaSttModel} キャラ１のステータス */
        this.chara1SttModel = this.charaSttDao.getById(C_DB.CHARAID_SPRT1)[0];
        /** @type {CharaSttModel} キャラ２のステータス */
        this.chara2SttModel = this.charaSttDao.getById(C_DB.CHARAID_SPRT2)[0];

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
            this.windowChara1Stt = new TextWindow({
                startX: C_IS.WINDOW_CHARA1_STATUS_X,
                startY: C_IS.WINDOW_CHARA1_STATUS_Y,
                hSize: C_IS.WINDOW_CHARA1_STATUS_W,
                vSize: C_IS.WINDOW_CHARA1_STATUS_H,
                menuColNum: 1,
            }, this);
            this.windowChara1Stt.drawWindow();
            this.updateCharaStt(C_DB.CHARAID_SPRT1);
        }

        if (this.isDispChara2) {
            // キャラ２が存在する場合
            // キャラ２のステータスウインドウを描画
            this.windowChara2Stt = new TextWindow({
                startX: C_IS.WINDOW_CHARA2_STATUS_X,
                startY: C_IS.WINDOW_CHARA2_STATUS_Y,
                hSize: C_IS.WINDOW_CHARA2_STATUS_W,
                vSize: C_IS.WINDOW_CHARA2_STATUS_H,
                menuColNum: 1,
            }, this);
            this.windowChara2Stt.drawWindow();
            this.updateCharaStt(C_DB.CHARAID_SPRT2);
        }

        // 画面左下のメニューウインドウを描画
        this.windowMenu = new TextWindow({
            startX: C_IS.WINDOW_MENU_X,
            startY: C_IS.WINDOW_MENU_Y,
            hSize: C_IS.WINDOW_MENU_W,
            vSize: C_IS.WINDOW_MENU_H,
            menuColNum: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: false, isList: true, isMenu: true
        }, this);
        this.windowMenu.drawWindow();
        // 表示コンテンツを設定
        this.dispCttMenu = new DispContent(true, false, true, C_COMMON.WINDOW_CONTENT_TYPE_MENU, this);
        this.dispCttMenu.addContentList(this.menuIkuseiList);
        this.windowMenu.setDispContent(this.dispCttMenu);

        // 画面右下のテキストウインドウを描画
        this.windowTextMain = new TextWindow({
            startX: C_IS.WINDOW_TEXT_MAIN_X,
            startY: C_IS.WINDOW_TEXT_MAIN_Y,
            hSize: C_IS.WINDOW_TEXT_MAIN_W,
            vSize: C_IS.WINDOW_TEXT_MAIN_H,
            menuCol: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: true, isList: false, isMenu: false
        }, this);
        this.windowTextMain.drawWindow();
        // 表示コンテンツを設定
        this.dispCttTextMain = new DispContent(false, true, false, C_COMMON.WINDOW_CONTENT_TYPE_LINE, this);
        this.dispCttTextMain.addContent("テスト文字列です。");
        this.windowTextMain.setDispContent(this.dispCttTextMain);
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号(0, 1)
     */
    updateCharaStt(charaIdx) {
        let window = null;
        let charaSttList = null;

        if (charaIdx === C_DB.CHARAID_SPRT1) {
            // キャラ１の場合
            window = this.windowChara1Stt;
            charaSttList = this.chara1SttModel.getDispValList();
        } else if (charaIdx === C_DB.CHARAID_SPRT2) {
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
                if (this.charaSttColList[i].getMenuColId() == C_DB.COL_ID_EQP1 || this.charaSttColList[i].getMenuColId() == C_DB.COL_ID_EQP2) {

                    // 装備品をアイテム定義から取得する
                    let eqpItem = this.itemDao.getById(charaSttList[i]);
                    sttVal = eqpItem.length != 0 ? eqpItem[0].getItemName() : 'なし';
                } else {
                    sttVal = charaSttList[i];
                }

                // 項目名と値をウインドウの両端に配置する
                sttTextList.push(GraphicUtil.adjust2StrBothEnd(
                    this, this.charaSttColList[i].getMenuColName(), sttVal,
                    this.windowChara1Stt.hSize - C_COMMON.WINDOW_PADDING_LINE_SMALL * 2,
                    {
                        fontSize: C_COMMON.FONT_SIZE_SMALL_2,
                        fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                        fontFamily: C_COMMON.FONT_FAMILY_BIT12
                    }
                ));
            }

            // ウインドウに表示コンテンツをセット
            const dispCtt = new DispContent(true, false, false, C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST, this.scene);
            dispCtt.addContentList(sttTextList);
            window.setDispContent(dispCtt);
        }
    }

}