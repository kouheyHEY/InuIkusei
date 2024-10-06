class IkuseiScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_IKUSEISCENE);
    }

    /**
     * 画面更新用メソッド
     */
    update() {
        // フッターの更新
        this.footerManager.updateFooter();

        if (this.footerManager.isEffect) {
            // ターゲットに効果を適用する
            this.charaManager.applyEffect(this.footerManager.effectParam.targetId, this.footerManager.effectParam.effect, this.footerManager.effectParam.type);
            // 効果適用フラグを無効にする
            this.footerManager.isEffect = false;
            // キャラクターのステータス表示を更新
            this.updateCharaStt(this.footerManager.effectParam.targetId);
        }

        if (this.footerManager.isReadyNextScene) {
            // 遷移準備ができている場合
            // キャラクターのステータスを更新
            this.charaManager.updateAllCharacter();
            // 次のシーンへ遷移
            this.scene.start(
                this.footerManager.nextSceneParam.scene,
                this.footerManager.nextSceneParam.param
            );
        }
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

        // 各Daoの取得
        /** @type {MstMenuDao} メニューマスタDao */
        this.mstMenuDao = new MstMenuDao(this);
        /** @type {MstActionDao} アクションマスタDao */
        this.mstActionDao = new MstActionDao(this);
        /** @type {MstFieldDao} フィールドマスタDao */
        this.mstFieldDao = new MstFieldDao(this);
        /** @type {TblItemDao} アイテムテーブルDao */
        this.tblItemDao = new TblItemDao(this);

        /** @type {CharaManager} キャラマネージャ */
        this.charaManager = new CharaManager(this);

        // キャラのステータスなどを表示するかどうかのフラグ
        this.isDispChara1 = this.charaManager.isCharaExist(C_DB.T_SPT_CHARA.ID_SPRT1);
        this.isDispChara2 = this.charaManager.isCharaExist(C_DB.T_SPT_CHARA.ID_SPRT2);

        /** @type {FooterManager} フッターマネージャ */
        this.footerManager = null;
    }

    /**
     * 画面上の各オブジェクトを表示する
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
            // ウインドウを描画
            this.windowChara1Stt.drawWindow();
            // キャラ１のステータスを更新
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
            // ウインドウを描画
            this.windowChara2Stt.drawWindow();
            // キャラ２のステータスを更新
            this.updateCharaStt(C_DB.T_SPT_CHARA.ID_SPRT2);
        }

        // フッターの生成
        this.footerManager = new FooterManager(this);
    }

    /**
     * 指定したキャラのステータスを更新する
     * @param {number} charaIdx 更新対象のキャラの番号
     */
    updateCharaStt(charaIdx) {
        // 開始ログ
        console.log('START updateCharaStt');

        /** @type {TextWindow} */
        let window = null;
        let charaModel;

        if (charaIdx == C_DB.T_SPT_CHARA.ID_SPRT1) {
            window = this.windowChara1Stt;
            charaModel = this.charaManager.getCharacter(C_DB.T_SPT_CHARA.ID_SPRT1);
        } else if (charaIdx == C_DB.T_SPT_CHARA.ID_SPRT2) {
            window = this.windowChara2Stt;
            charaModel = this.charaManager.getCharacter(C_DB.T_SPT_CHARA.ID_SPRT2);
        }

        if (window != null && charaModel != null) {
            // ウインドウに表示コンテンツをセット
            const dispCtt = new DispContent(true, false, false, C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST, this);
            dispCtt.addContentList(TblSptCharaService.getIkuseiDispProps(charaModel, window.hSize, this));
            window.setDispContent(dispCtt);
        }

        // 終了ログ
        console.log('END updateCharaStt');
    }
}
