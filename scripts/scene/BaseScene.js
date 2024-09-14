/**
 * シーンの親クラス
 */
class BaseScene extends Phaser.Scene {
    /**
     * コンストラクタ
     * @param {string} sceneName シーン名
     */
    constructor(sceneName) {
        super({ key: sceneName });
    }

    /**
     * 以下の流れで実行。
     * ０．インスタンス変数の初期化
     * １．背景の作成
     * ２．各エリアの初期描画
     */
    create() {

    }

    /**
     * 子クラスで実装。
     * 処理更新用メソッド、毎フレーム実行される。
     */
    update() {
        throw new Error(`[BaseScene]実装されていません。`);
    }
}