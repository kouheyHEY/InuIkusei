class IkuseiScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_IKUSEISCENE);
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
                /** @type {MstMenuModel} */
                const pressedMenu = this.windowMenu.pressedObj;

                if (pressedMenu == C_COMMON.WINDOW_MENU_BACK) {
                    // 戻る押下時
                    this.dispCttMenu.restoreContent();
                    // メニューの状態を更新する
                    this.windowMenu.setDispContent(this.dispCttMenu);
                } else if (pressedMenu.childMenuId < 0) {
                    // 次の表示内容がメニューではない場合
                    // フォーカスをメインウインドウに移動
                    this.windowMenu.setActive(false);
                    this.windowTextMain.setActive(true);
                    // 子メニューを取得
                    const childObj = this.dispCttMenu.getChildContent(this.windowMenu.choosedMenuIdx);
                    // メニューの状態を更新する
                    this.dispCttTextMain.initContent();
                    this.dispCttTextMain.dispContentObj = childObj;
                    this.windowTextMain.menuColNum = C_IS.WINDOW_TEXT_MAIN_COL_NUM;
                    this.windowTextMain.setDispContent(this.dispCttTextMain);
                } else {
                    // 子メニューの表示を行う場合
                    // 子メニューを取得し、そのまま表示コンテンツとして設定
                    this.dispCttMenu.setChildContent(this.windowMenu.choosedMenuIdx);
                    // メニューの状態を更新する
                    this.windowMenu.setDispContent(this.dispCttMenu);
                }

                console.log(this.dispCttMenu.obj);
                for (let i = 0; i < this.dispCttMenu.dispContentObjHist.length; i++) {
                    console.log(`HIST[${i}] : ${this.dispCttMenu.dispContentObjHist[i].dispStr}`);
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
                    // 
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
            const dispDetail = this.dispCttTextMain.expl[this.windowTextMain.choosedMenuIdx];
            // 説明文を表示する
            this.cursorText = dispDetail != "" ? dispDetail : null;
        } else if (this.windowMenu.isFocused) {
            const dispDetail = this.dispCttMenu.expl[this.windowMenu.choosedMenuIdx];
            // 説明文を表示する
            this.cursorText = dispDetail != "" ? dispDetail : null;
        } else {
            this.cursorText = null;
        }

        // カーソルウインドウに内容を表示
        this.windowCursor.setText(this.cursorText);
        // カーソルウインドウの位置調整
        this.windowCursor.updatePos();
    }

    /**
     * インスタンス変数の定義メソッド
     * this.XXXはここに記載
     */
    initInstVal() {
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

        /** @type {DispContent} メニューウインドウ表示コンテンツ */
        this.dispCttMenu = null;
        /** @type {DispContent} メインウインドウ表示コンテンツ */
        this.dispCttTextMain = null;

        // 各Daoの取得
        /** @type {MstMenuDao} メニューマスタDao */
        this.mstMenuDao = new MstMenuDao(this);
        /** @type {MstActionDao} アクションマスタDao */
        this.mstActionDao = new MstActionDao(this);
        /** @type {MstFieldDao} フィールドマスタDao */
        this.mstFieldDao = new MstFieldDao(this);
        /** @type {TblItemDao} アイテムテーブルDao */
        this.tblItemDao = new TblItemDao(this);
        /** @type {TblSptCharaDao} 味方キャラテーブルDao */
        this.tblSptCharaDao = new TblSptCharaDao(this);

        /** @type {TblSptCharaModel} キャラ１のステータス */
        this.chara1Model = this.tblSptCharaDao.getById(C_DB.T_SPT_CHARA.ID_SPRT1)[0];
        /** @type {TblSptCharaModel} キャラ２のステータス */
        this.chara2Model = this.tblSptCharaDao.getById(C_DB.T_SPT_CHARA.ID_SPRT2)[0];

        // キャラのステータスなどを表示するかどうかのフラグ
        this.isDispChara1 = this.chara1Model.name !== C_DB.T_SPT_CHARA.NAME_NULL;
        this.isDispChara2 = this.chara2Model.name !== C_DB.T_SPT_CHARA.NAME_NULL;

    }

    /** 画面上の各オブジェクトを表示する
     * （テキスト表示などは変動するため、適時別ロジックで表示）
     */
    initArea() {

        // 背景色の設定
        this.cameras.main.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

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
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT1);
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
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT2);
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
        this.dispCttMenu.addContentList(this.mstMenuDao.getByMenuId(C_DB.M_MENU.MENUID_IKUSEISCENE));
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

        // 初期にアクティブにするウインドウの設定
        this.windowMenu.isActive = true;

        // カーソルウインドウを作成
        /** @type {CursorWindow} */
        this.windowCursor = new CursorWindow(this);
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号(0, 1)
     */
    updateCharaStt(charaIdx) {
        /** @type {TextWindow} */
        let window = null;
        let charaModel;

        if (charaIdx === C_DB.T_SPT_CHARA.ID_SPRT1) {
            // キャラ１の場合
            window = this.windowChara1Stt;
            charaModel = this.chara1Model;
        } else if (charaIdx === C_DB.T_SPT_CHARA.ID_SPRT2) {
            // キャラ２の場合
            window = this.windowChara2Stt;
            charaModel = this.chara2Model;
        }

        if (window != null && charaModel != null) {
            // ウインドウに表示コンテンツをセット
            const dispCtt = new DispContent(true, false, false, C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST, this);
            dispCtt.addContentList(TblSptCharaService.getIkuseiDispProps(charaModel, window.hSize, this));
            window.setDispContent(dispCtt);
        }
    }
}