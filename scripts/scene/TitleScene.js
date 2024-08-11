class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_TITLESCENE });
    }

    create() {

        // 背景色の設定
        this.cameras.main.setBackgroundColor(C_COMMON.BGCOLOR_COMMON);

        this.add.text(C_COMMON.D_WIDTH / 2, 300, C_COMMON.GAME_TITLE,
            { fontSize: C_COMMON.FONT_SIZE_LARGE, fill: C_COMMON.FONTCOLOR_COMMON })
            .setOrigin(0.5);

        const startButton = this.add.text(C_COMMON.D_WIDTH / 2, 400, 'Start',
            { fontSize: C_COMMON.FONT_SIZE_LARGE, fill: C_COMMON.FONTCOLOR_COMMON })
            .setOrigin(0.5);
        startButton.setInteractive();

        // ボタン押下時、育成画面に遷移
        startButton.on('pointerdown', () => {
            this.scene.start(C_COMMON.SCENE_IKUSEISCENE);
        });
    }
}