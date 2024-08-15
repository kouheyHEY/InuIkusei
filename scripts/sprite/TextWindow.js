class TextWindow {

    /**
     * ウインドウを作成する
     * @param {number} startX ウインドウの左上のX座標
     * @param {number} startY ウインドウの左上のY座標
     * @param {number} hSize 横のサイズ
     * @param {number} vSize 縦のサイズ
     * @param {string} frameColor ウインドウの枠の色
     * @param {string} bgColor ウインドウの背景の色
     * @param {string} fontColor 文字の色
     * @param {boolean} isLine 文章かどうか
     * @param {boolean} isList リストかどうか
     * @param {boolean} isMenu メニューかどうか 
     * @param {Phaser.Scene} scene ウインドウを作成するシーン
     */
    constructor(startX, startY, hSize, vSize, frameColor, bgColor, fontColor, isLine, isList, isMenu, scene) {
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

        /** 現在選択しているメニュー項目の番号(0~) */
        this.choicedMenuIdx = 0;
        /** 現在表示しているメニューの左側の三角形 */
        this.choicedMark = null;

        // テキスト形式かどうか
        this.isLine = isLine;
        // リスト形式かどうか
        this.isList = isList;
        // メニューとして機能させるかどうか
        this.isMenu = isMenu;
    }

    /**
     * ウインドウを描画する
     * @param {Phaser.GameObjects.Graphics} grph 描画用オブジェクト
     */
    drawWindow(grph) {
        // ウインドウの内部描画
        grph.fillStyle(
            Phaser.Display.Color.HexStringToColor(this.bgColor).color,
            1.0);
        grph.fillRoundedRect(
            this.startX, this.startY, this.hSize, this.vSize,
            C_COMMON.WINDOW_ROUND
        );

        // ウインドウの枠線描画
        grph.lineStyle(
            C_COMMON.WINDOW_FRAME_WEIGHT,
            Phaser.Display.Color.HexStringToColor(this.frameColor).color,
            1.0);
        grph.strokeRoundedRect(
            this.startX, this.startY, this.hSize, this.vSize,
            C_COMMON.WINDOW_ROUND
        );
    }

    /**
     * ウインドウの文字列を別の文字列に変更する
     * @param {string[]} textList 表示対象の文字列のリスト
     */
    dispText(textList) {
        // 既に表示されている文字列を消去する
        if (this.dispTextGroup.getLength() !== 0) {
            this.dispTextGroup.clear(true, true);
        }

        if (!this.isList) {
            // 表示対象がリスト形式でない場合

            // テキストを文章形式で表示する
            let textObj = this.scene.add.text(
                this.startX + C_COMMON.WINDOW_PADDING_LINE,
                this.startY + C_COMMON.WINDOW_PADDING_LINE,
                textList[0],
                {
                    fontSize: C_COMMON.FONT_SIZE_SMALL,
                    fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                    fontFamily: C_COMMON.FONT_FAMILY_BIT12
                }
            ).setOrigin(0);

            // テキストオブジェクトを表示
            this.dispTextGroup.add(textObj);
        } else if (this.isList) {
            // 表示対象がリスト形式の場合

            // リストの左側の余白
            let leftPadding = 0;
            if (this.isMenu) {
                // メニュー形式の場合

                // 左側に選択されているマークを表示するための余白を設定する
                leftPadding = C_COMMON.WINDOW_PADDING_LEFT;
            }

            // テキストをリスト形式で表示する
            let idx = 0;
            for (let dispText of textList) {
                let textObj = this.scene.add.text(
                    this.startX + C_COMMON.WINDOW_PADDING_LINE + leftPadding,
                    this.startY + C_COMMON.WINDOW_PADDING_LINE + idx++ * (
                        C_COMMON.WINDOW_PADDING_LINE + C_COMMON.FONT_SIZE_SMALL
                    ),
                    dispText,
                    {
                        fontSize: C_COMMON.FONT_SIZE_SMALL,
                        fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                        fontFamily: C_COMMON.FONT_FAMILY_BIT12
                    }
                ).setOrigin(0);

                // テキストオブジェクトを表示
                this.dispTextGroup.add(textObj);
            }

            if (this.isMenu) {
                //　メニュー形式の場合

                // デフォルトで一番目のメニューが選択されている状態とする
                this.dispChoiceMark(
                    this.startX + C_COMMON.WINDOW_PADDING_LINE,
                    this.startY + C_COMMON.WINDOW_PADDING_LINE +
                    this.choicedMenuIdx * (
                        C_COMMON.WINDOW_PADDING_LINE + C_COMMON.FONT_SIZE_SMALL
                    ) + C_COMMON.FONT_SIZE_SMALL / 2,
                    C_COMMON.WINDOW_PADDING_LEFT * 2 / 3,
                    C_COMMON.FONT_SIZE_SMALL * 2 / 3
                );
            }
        }
    }

    /**
     * 表示されている文字を更新する
     * @param {string[]} textList 更新後の文字列
     */
    updateText(textList) {
        if (this.dispTextGroup.getLength() === textList.length) {
            // 表示する文字列の数と現在表示している文字列が同じ長さの場合

            let idx = 0;
            for (let textObj of this.dispTextGroup.getChildren()) {
                // 文字列を更新する
                textObj.setText(textList[idx++]);
            }
        }
    }

    /**
     * 指定した位置に右向きの三角形を表示する
     * @param {number} x 三角形を表示するx座標
     * @param {number} y 三角形を表示するy座標（文字列の中心線）
     * @param {number} w 表示する三角形の幅
     * @param {number} h 表示する三角形の高さ
     */
    dispChoiceMark(x, y, w, h) {
        if (this.choicedMark) {
            // 既に表示されている場合は、削除する
            this.choicedMark.destroy();
        }

        // 新たに三角形を表示する
        let triangle = this.scene.add.graphics({ fillStyle: { color: C_COMMON.COMMON_COLOR_WINDOW_FONT } });

        // 三角形の形を描く
        triangle.beginPath();

        // 左上の頂点
        triangle.moveTo(x, y);
        // 右の頂点
        triangle.lineTo(x + w, y + h / 2);
        // 左下の頂点
        triangle.lineTo(x, y + h);

        triangle.closePath();
        triangle.fillPath();

        // 位置の調整
        triangle.y -= h / 2;

        this.choicedMark = triangle;
    }

    /** 直上のメニュー項目を選択状態にする */
    upMenu() {
        if (this.choicedMenuIdx > 0) {
            // 一番上のメニュー以外を選択している場合

            // 選択メニュー番号を更新する
            this.choicedMenuIdx--;

            // 選択マークを更新する
            this.dispChoiceMark(
                this.startX + C_COMMON.WINDOW_PADDING_LINE,
                this.startY + C_COMMON.WINDOW_PADDING_LINE +
                this.choicedMenuIdx * (
                    C_COMMON.WINDOW_PADDING_LINE + C_COMMON.FONT_SIZE_SMALL
                ) + C_COMMON.FONT_SIZE_SMALL / 2,
                C_COMMON.WINDOW_PADDING_LEFT * 2 / 3,
                C_COMMON.FONT_SIZE_SMALL * 2 / 3
            );
        }
    }

    /** 直下のメニュー項目を選択状態にする */
    downMenu() {
        if (this.choicedMenuIdx < this.dispTextGroup.getLength() - 1) {
            // 一番下のメニュー以外を選択している場合

            // 選択メニュー番号を更新する
            this.choicedMenuIdx++;

            // 選択マークを更新する
            this.dispChoiceMark(
                this.startX + C_COMMON.WINDOW_PADDING_LINE,
                this.startY + C_COMMON.WINDOW_PADDING_LINE +
                this.choicedMenuIdx * (
                    C_COMMON.WINDOW_PADDING_LINE + C_COMMON.FONT_SIZE_SMALL
                ) + C_COMMON.FONT_SIZE_SMALL / 2,
                C_COMMON.WINDOW_PADDING_LEFT * 2 / 3,
                C_COMMON.FONT_SIZE_SMALL * 2 / 3
            );
        }
    }

}