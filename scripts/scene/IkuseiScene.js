class IkuseiScene extends Phaser.Scene {
    constructor() {
        super({ key: C_COMMON.SCENE_IKUSEISCENE });
    }

    /**
     * 画面生成用メソッド
     */
    create() {
        // １．背景の作成
        this.cameras.main.setBackgroundColor(
            C_COMMON.BGCOLOR_COMMON);

        // ２．各エリアの作成

        // 
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

    }

}