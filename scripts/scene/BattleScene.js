class BattleScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_BATTLESCENE);
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
        /** @type {DispContent} キャラ１ステータス表示コンテンツ */
        this.dispCttChara1 = null;
        /** @type {DispContent} キャラ２ステータス表示コンテンツ */
        this.dispCttChara2 = null;

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
                startX: C_BS.WINDOW_CHARA1_STATUS_X,
                startY: C_BS.WINDOW_CHARA1_STATUS_Y,
                hSize: C_BS.WINDOW_CHARA1_STATUS_W,
                vSize: C_BS.WINDOW_CHARA1_STATUS_H,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                menuColNum: 1,
            }, this);
            this.windowChara1Stt.drawWindow();
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT1);
        }

        if (this.isDispChara2) {
            // キャラ２が存在する場合
            // キャラ２のステータスウインドウを描画
            this.windowChara2Stt = new TextWindow({
                startX: C_BS.WINDOW_CHARA2_STATUS_X,
                startY: C_BS.WINDOW_CHARA2_STATUS_Y,
                hSize: C_BS.WINDOW_CHARA2_STATUS_W,
                vSize: C_BS.WINDOW_CHARA2_STATUS_H,
                fontSize: C_COMMON.FONT_SIZE_SMALL,
                menuColNum: 1,
            }, this);
            this.windowChara2Stt.drawWindow();
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT2);
        }

        // 画面左下のメニューウインドウを描画
        this.windowMenu = new TextWindow({
            startX: C_BS.WINDOW_MENU_X,
            startY: C_BS.WINDOW_MENU_Y,
            hSize: C_BS.WINDOW_MENU_W,
            vSize: C_BS.WINDOW_MENU_H,
            menuColNum: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: false, isList: true, isMenu: true
        }, this);
        this.windowMenu.drawWindow();
        // 表示コンテンツを設定
        this.dispCttMenu = new DispContent(true, false, true, C_COMMON.WINDOW_CONTENT_TYPE_MENU, this);
        this.dispCttMenu.addContentList(this.mstMenuDao.getByMenuId(C_DB.M_MENU.MENUID_BATTLESCENE));
        this.windowMenu.setDispContent(this.dispCttMenu);

        // 画面右下のテキストウインドウを描画
        this.windowTextMain = new TextWindow({
            startX: C_BS.WINDOW_TEXT_MAIN_X,
            startY: C_BS.WINDOW_TEXT_MAIN_Y,
            hSize: C_BS.WINDOW_TEXT_MAIN_W,
            vSize: C_BS.WINDOW_TEXT_MAIN_H,
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
            dispCtt.addContentList(TblSptCharaService.getBattleDispProps(charaModel, window.hSize, this));
            window.setDispContent(dispCtt);
        }
    }

}