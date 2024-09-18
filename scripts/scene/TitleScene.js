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
        this.menuList = this.mstMenuDao.getByMenuId(C_DB.M_MENU.MENUID_TITLE);

        /** タイトルメニュー はじめから */
        this.menuStart = null;
        /** タイトルメニュー つづきから */
        this.menuContinue = null;
        /** タイトルメニュー クレジット */
        this.menuCredit = null;
        /** タイトルメニュー おわる */
        this.menuEnd = null;

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

        // 座標取得用アロー関数
        const getMenuX = (idx) => {
            return (C_COMMON.D_WIDTH + (C_TS.MENU_WIDTH + C_TS.MENU_SPAN_H) * (1 - C_TS.MENU_COL_NUM + 2 * (idx % C_TS.MENU_COL_NUM))) / 2;
        };
        const getMenuY = (idx) => {
            return C_TS.MENU_Y_1 + Math.floor(idx / C_TS.MENU_COL_NUM) * (C_TS.MENU_HEIGHT + C_TS.MENU_SPAN_V);
        };

        /* はじめから */
        this.menuStart = this.add.text(
            getMenuX(0), getMenuY(0), this.menuList[0].colName,
            {
                fontSize: C_COMMON.FONT_SIZE_MEDIAM,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            }).setOrigin(0.5).setInteractive();

        /* つづきから */
        this.menuContinue = this.add.text(
            getMenuX(1), getMenuY(1), this.menuList[1].colName,
            {
                fontSize: C_COMMON.FONT_SIZE_MEDIAM,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            }).setOrigin(0.5).setInteractive();

        /* クレジット */
        this.menuCredit = this.add.text(
            getMenuX(2), getMenuY(2), this.menuList[2].colName,
            {
                fontSize: C_COMMON.FONT_SIZE_MEDIAM,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            }).setOrigin(0.5).setInteractive();

        /* おわる */
        this.menuEnd = this.add.text(
            getMenuX(3), getMenuY(3), this.menuList[3].colName,
            {
                fontSize: C_COMMON.FONT_SIZE_MEDIAM,
                fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                fontFamily: C_COMMON.FONT_FAMILY_BIT12
            }).setOrigin(0.5).setInteractive();

        // はじめから押下時
        this.menuStart.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });

        // つづきから押下時
        this.menuContinue.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });

        // クレジット押下時
        this.menuCredit.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });

        // おわる押下時
        this.menuEnd.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });

    }

    update() {

    }
}