/**
 * カーソルに追従するウインドウ。
 */
class CursorWindow {
    constructor(scene) {
        // シーン設定
        this.scene = scene;
        // 表示文字列
        this.dispTextObj = null;
        // フォントスタイル
        this.fontStyle = {
            fontSize: C_COMMON.FONT_SIZE_SMALL_2,
            lineSpacing: C_COMMON.WINDOW_PADDING_LINE_SMALL_2,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
        };
        // 表示制御フラグ
        this.isDisp = false;
        // ウインドウコンテナ
        this.windowContainer = this.scene.add.container(0, 0);
    }

    /**
     * 表示位置を更新する
     */
    updatePos() {
        if (this.windowContainer != null) {

            // 表示位置の計算
            const winX = this.scene.input.activePointer.x < C_COMMON.D_WIDTH / 2
                ? C_COMMON.WINDOW_CURSOR_CORNER_POS
                : -C_COMMON.WINDOW_CURSOR_W - C_COMMON.WINDOW_CURSOR_CORNER_POS;

            const winY = this.scene.input.activePointer.y < C_COMMON.D_HEIGHT / 2
                ? C_COMMON.WINDOW_CURSOR_CORNER_POS
                : -C_COMMON.WINDOW_CURSOR_H - C_COMMON.WINDOW_CURSOR_CORNER_POS;

            // ウインドウの位置を調整
            this.windowContainer.x = this.scene.input.activePointer.x + winX;
            this.windowContainer.y = this.scene.input.activePointer.y + winY;
        }
    }

    /**
     * 表示する文字列をセットし、ウインドウを描画する
     * @param {string} text 表示文字列
     */
    setText(text) {

        if (this.dispTextObj != null) {
            // 既に作成されている場合は、文字列だけ更新
            const dispText = (text == null)
                ? null
                : GraphicUtil.wrapText(
                    this.scene, text, this.fontStyle, C_COMMON.WINDOW_CURSOR_W - C_COMMON.WINDOW_PADDING_LINE_SMALL_2 * 2);

            this.dispTextObj.setText(dispText);

            // nullの場合はウインドウを非表示
            this.windowContainer.setVisible(text != null);

        } else {
            if (text == null) {
                // 作成されておらずnullの場合は何もしない
                return;
            }

            // 作成されていない場合は、作成
            const grph = this.scene.add.graphics();

            // ウインドウの内部描画
            grph.fillStyle(
                Phaser.Display.Color.HexStringToColor(C_COMMON.COMMON_COLOR_WINDOW_BG).color, 1.0);
            grph.fillRoundedRect(
                0, 0, C_COMMON.WINDOW_CURSOR_W, C_COMMON.WINDOW_CURSOR_H, C_COMMON.WINDOW_ROUND);

            // ウインドウの枠線描画
            grph.lineStyle(
                C_COMMON.WINDOW_FRAME_WEIGHT,
                Phaser.Display.Color.HexStringToColor(C_COMMON.COMMON_COLOR_WINDOW_FRAME).color, 1.0);
            grph.strokeRoundedRect(
                0, 0, C_COMMON.WINDOW_CURSOR_W, C_COMMON.WINDOW_CURSOR_H, C_COMMON.WINDOW_ROUND);

            // ウインドウコンテナに追加
            this.windowContainer.add(grph);

            // 文字列を描画
            // 表示する文字列の折り返し処理を行う
            const dispText = GraphicUtil.wrapText(
                this.scene, text, this.fontStyle, C_COMMON.WINDOW_CURSOR_W - C_COMMON.WINDOW_PADDING_LINE_SMALL_2 * 2);

            this.dispTextObj = this.scene.add.text(
                C_COMMON.WINDOW_PADDING_LINE_SMALL_2, C_COMMON.WINDOW_PADDING_LINE_SMALL_2, dispText, this.fontStyle).setOrigin(0);

            // ウインドウコンテナに追加
            this.windowContainer.add(this.dispTextObj);
        }
    }
}