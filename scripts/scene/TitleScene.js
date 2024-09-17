class TitleScene extends BaseScene {
    constructor() {
        super(C_COMMON.SCENE_TITLESCENE);
    }

    initInstVal() {
        // 各Daoの取得
        this.mstMenuDao = new MstMenuDao(this);

        /** タイトルテキスト */
        this.titleText = null;

        /** @type {MstMenuModel[]} タイトルメニュー メニューモデルリスト */
        this.menuList = this.menuMstDao.getByMenuId(C_DB.M_MENU.MENUID_TITLE);

        /** タイトルメニュー はじめから */
        this.menuStart = null;
        /** タイトルメニュー つづきから */
        this.menuContinue = null;
        /** タイトルメニュー クレジット */
        this.menuCredit = null;
        /** タイトルメニュー おわる */
        this.titleMenu = null;

    }

    initArea() {

        // 背景色の設定
        this.cameras.main.setBackgroundColor(C_COMMON.COMMON_COLOR_WHITE);

        // タイトルを表示
        this.titleText = this.add.text(C_TS.TITLE_X, C_TS.TITLE_Y, C_COMMON.GAME_TITLE,
            {
                fontSize: C_COMMON.FONT_SIZE_LARGE,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            }).setOrigin(0.5);

        /* はじめから */

        /* つづきから */

        /* クレジット */

        /* おわる */


        // スタートボタン
        const startButton = this.add.text(C_COMMON.D_WIDTH / 2, 400, 'Start',
            {
                fontSize: C_COMMON.FONT_SIZE_LARGE,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            })
            .setOrigin(0.5);
        startButton.setInteractive();

        // ボタン押下時、育成画面に遷移
        startButton.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });
    }

    update() {
    }
}