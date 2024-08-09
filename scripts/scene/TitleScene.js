class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_TITLESCENE });
    }

    create() {

        // 背景色の設定
        this.cameras.main.setBackgroundColor(C_COMMON.BG_COLOR_TITLESCENE);

        this.add.text(C_COMMON.D_WIDTH / 2, 300, C_COMMON.GAME_TITLE,
            { fontSize: C_COMMON.FONT_SIZE_LARGE, fontFamily: C_COMMON.FONT_FAMILY_BIT12_BOLD, fill: '#fff' })
            .setOrigin(0.5);

        const startButton = this.add.text(C_COMMON.D_WIDTH / 2, 400, 'Start',
            { fontSize: C_COMMON.FONT_SIZE_SMALL, fontFamily: C_COMMON.FONT_FAMILY_BIT12, fill: '#fff' })
            .setOrigin(0.5);
        startButton.setInteractive();

        // ボタン押下時、育成画面に遷移
        startButton.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_GAMESCENE);
        });
    }
}