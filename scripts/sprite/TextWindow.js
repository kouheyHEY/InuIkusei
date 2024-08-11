class TextWindow {

    /**
     * 
     * @param {number} startX ウインドウの左上のX座標
     * @param {number} startY ウインドウの左上のY座標
     * @param {number} vSize 縦のサイズ
     * @param {number} hSize 横のサイズ
     * @param {string} frameColor ウインドウの枠の色
     * @param {string} bgColor ウインドウの背景の色
     * @param {string} fontColor 文字の色
     * @param {Phaser.Scene} scene ウインドウを作成するシーン
     */
    constructor(startX, startY, vSize, hSize, scene) {
        /** @type {number} ウインドウの左上のX座標 */
        this.startX = startX;
        /** @type {number} ウインドウの左上のY座標 */
        this.startY = startY;
        /** @type {number} 縦のサイズ（px） */
        this.vSize = vSize;
        /** @type {number} 横のサイズ（px） */
        this.hSize = hSize;
        /** @type {Phaser.Scene} ウインドウを作成するシーン */
        this.scene = scene;

        /** @type {string} ウインドウ枠の色 */
        this.frameColor = frameColor;
        /** @type {string} ウインドウ背景の色 */
        this.bgColor = bgColor;
        /** @type {string} 文字の色 */
        this.fontColor = fontColor;

        /** 表示するテキストのオブジェクトグループ */
        this.dispTextGroup = this.scene.add.group();

    }

    /**
     * ウインドウを描画する
     * @param {Phaser.GameObjects.Graphics} grph 描画用オブジェクト
     */
    drawWindow(grph) {
        // ウインドウの内部描画
        grph.fillStyle(
            C_COMMON.WINDOW_BGCOLOR, 1.0);
        grph.fillRect(
            this.startX, this.startY,
            this.hSize, this.vSize);

        // ウインドウの枠線描画
        grph.lineStyle(C_COMMON.WINDOW_FRAME_WEIGHT,
            this.bgColor, 1.0)
        grph.strokeRect(
            this.startX, this.startY,
            this.hSize, this.vSize);

    }

    /**
     * ウインドウの文字列を別の文字列に変更する
     * @param {string[]} textList 表示対象の文字列のリスト
     * @param {boolean} isList 表示形式がリスト形式かどうか
     */
    dispText(textList, isList) {
        // 既に表示されている文字列を消去する
        if (this.dispTextGroup.getLength() !== 0) {
            this.dispTextGroup.clear(true, true);
        }

        if (!isList) {
            // 表示対象がリスト形式でない場合

            // テキストを文章形式で表示する
            let textObj = this.add.text(
                startX, startY, textList[0],
                {
                    fontSize: C_COMMON.FONT_SIZE_SMALL,
                    fill: C_COMMON.FONTCOLOR_COMMON
                }
            ).setOrigin(1);

            this.dispTextGroup.add(textObj);
        } else {
            // 表示対象がリスト形式の場合

            // TODO: テキストをリスト形式で表示する

        }
    }

}