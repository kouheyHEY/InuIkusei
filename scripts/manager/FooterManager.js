/**
 * フッターを管理するクラス（メニューウインドウ、メインウインドウ）
 */
class FooterManager {
    constructor(scene) {
        this.scene = scene;

        /** @type {TextWindow} 画面左下のメニューウインドウ */
        this.windowMenu = new TextWindow({
            startX: C_COMMON.WINDOW_MENU_X,
            startY: C_COMMON.WINDOW_MENU_Y,
            hSize: C_COMMON.WINDOW_MENU_W,
            vSize: C_COMMON.WINDOW_MENU_H,
            menuColNum: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: false, isList: true, isMenu: true
        }, this.scene);
        this.windowMenu.drawWindow();

        /** @type {DispContent} メニューウインドウの表示コンテンツ */
        this.dispCttMenu = new DispContent(true, false, true, C_COMMON.WINDOW_CONTENT_TYPE_MENU, this.scene);

        // コンテンツを設定
        this.dispCttMenu.addContentList(this.scene.mstMenuDao.getByMenuId(C_DB.M_MENU.MENUID_IKUSEISCENE));
        this.windowMenu.setDispContent(this.dispCttMenu);

        /** @type {TextWindow} 画面下のメインウインドウ */
        this.windowTextMain = new TextWindow({
            startX: C_COMMON.WINDOW_TEXT_MAIN_X,
            startY: C_COMMON.WINDOW_TEXT_MAIN_Y,
            hSize: C_COMMON.WINDOW_TEXT_MAIN_W,
            vSize: C_COMMON.WINDOW_TEXT_MAIN_H,
            menuCol: 1,
            fontSize: C_COMMON.FONT_SIZE_SMALL,
            isLine: true, isList: false, isMenu: false
        }, this.scene);
        this.windowTextMain.drawWindow();

        /** @type {DispContent} メインウインドウの表示コンテンツ */
        this.dispCttMain = new DispContent(true, false, true, C_COMMON.WINDOW_CONTENT_TYPE_MENU, this.scene);

        // コンテンツを設定
        this.dispCttTextMain = new DispContent(false, true, false, C_COMMON.WINDOW_CONTENT_TYPE_LINE, this.scene);
        this.dispCttTextMain.addContent("テスト文字列です。");
        this.windowTextMain.setDispContent(this.dispCttTextMain);


        // 初期にアクティブにするウインドウの設定
        this.windowMenu.isActive = true;

        // カーソルウインドウを作成
        /** @type {CursorWindow} */
        this.windowCursor = new CursorWindow(this.scene);

        // カーソルウインドウの表示文
        this.cursorText = null;

        /** @type {BaseModel} 効果使用オブジェクト */
        this.effect = null;
        /** @type {BaseModel} 効果使用対象オブジェクト */
        this.target = null;
        /** @type {Object} 次のシーンへの遷移パラメータ */
        this.nextSceneParam = null;
        /** @type {boolean} シーン遷移の準備ができているか */
        this.isReadyNextScene = false;

        /** @type {Object} 育成シーンからバトルシーンへ遷移する場合のパラメータ */
        this.paramToBattle = {
            fieldId: null,
        };
    }

    /** フッターの更新処理を行う */
    updateFooter() {

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
                    // メニューを初期化
                    this.dispCttTextMain.initContent();
                    // 表示コンテンツを設定
                    this.dispCttTextMain.dispContentObj = childObj;
                    // メインウインドウの列数を設定
                    this.windowTextMain.menuColNum = C_COMMON.WINDOW_TEXT_MAIN_COL_NUM;
                    // メインウインドウの表示コンテンツをセット
                    this.windowTextMain.setDispContent(this.dispCttTextMain);
                } else if (
                    pressedMenu.childMenuId == C_DB.M_MENU.CHILDMENUID_TOBATTLE
                ) {
                    // 「出発」押下時
                    // 遷移パラメータを設定
                    this.nextSceneParam = {
                        scene: C_COMMON.SCENE_BATTLESCENE,
                        param: this.paramToBattle,
                    };
                    // シーン遷移の準備ができたことを通知
                    this.isReadyNextScene = true;
                    console.log("Ready Next Scene");

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
                /** @type {DispContentObj} */
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

                    if (this.windowTextMain.pressedObj instanceof MstFieldModel) {
                        // フィールドの場合
                        this.paramToBattle.fieldId = this.windowTextMain.pressedObj.id;

                        // フォーカスをメニューウインドウに戻す
                        this.windowTextMain.setActive(false, true);
                        this.windowMenu.setActive(true, false);
                    } else {
                        // TODO: キャラに効果を適用
                        const effectModel = this.dispCttTextMain.getEffectObj();
                        const targetModel = this.windowTextMain.pressedObj;

                        console.log(effectModel);

                        if (effectModel instanceof TblItemModel) {
                            // アイテムの場合
                            EffectUtils.applyItemEffect(effectModel, targetModel);
                            console.log("Apply Item Effect");

                            // ひとつ前の選択肢に戻す
                            this.dispCttTextMain.restoreContent();
                            this.windowTextMain.setDispContent(this.dispCttTextMain);
                        } else if (effectModel instanceof MstActionModel) {
                            // アクションの場合
                            EffectUtils.applyActionEffect(effectModel, targetModel);
                            console.log("Apply Action Effect");

                            // ひとつ前の選択肢に戻す
                            this.dispCttTextMain.restoreContent();
                            this.windowTextMain.setDispContent(this.dispCttTextMain);
                        }
                    }

                } else {
                    // それ以外の場合
                    // 子メニューを取得し、そのまま表示コンテンツとして設定
                    this.dispCttTextMain.setChildContent(this.windowTextMain.choosedMenuIdx);
                    // メニューの状態を更新する
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
}