class TextWindow {

    /**
     * ウインドウを作成する
     * @param {object} config ウインドウの設定
     * @param {number} config.startX ウインドウの左上のX座標
     * @param {number} config.startY ウインドウの左上のY座標
     * @param {number} config.hSize 横のサイズ
     * @param {number} config.vSize 縦のサイズ
     * @param {number} config.menuColNum メニューの列数
     * @param {string} config.frameColor ウインドウの枠の色
     * @param {string} config.bgColor ウインドウの背景の色
     * @param {number} config.fontSize フォントサイズ
     * @param {string} config.fontColor 文字の色
     * @param {boolean} config.isLine 文章かどうか
     * @param {boolean} config.isList リストかどうか
     * @param {boolean} config.isMenu メニューかどうか（選択可能か）
     * @param {Phaser.Scene} scene ウインドウを作成するシーン
     */
    constructor(config, scene) {
        this.scene = scene;
        this.startX = config.startX;
        this.startY = config.startY;
        this.hSize = config.hSize;
        this.vSize = config.vSize;

        this.isLine = config.isLine;
        this.isList = config.isList;
        this.isMenu = config.isMenu;
        this.menuColNum = config.menuColNum || 1;

        this.frameColor = ('frameColor' in config)
            ? config.frameColor
            : C_COMMON.COMMON_COLOR_WINDOW_FRAME;

        this.bgColor = ('bgColor' in config)
            ? config.bgColor
            : C_COMMON.COMMON_COLOR_WINDOW_BG;

        this.fontSize = ('fontSize' in config)
            ? config.fontSize
            : C_COMMON.FONT_SIZE_SMALL_2;

        this.fontColor = ('fontColor' in config)
            ? config.fontColor
            : C_COMMON.COMMON_COLOR_WINDOW_FONT;

        // テキスト間の幅やパディング
        this.paddingLine = ('paddingLine' in config)
            ? config.paddingLine
            : C_COMMON.WINDOW_PADDING_LINE_SMALL;

        // フォントのスタイル
        this.fontStyle = {
            fontSize: this.fontSize,
            fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
            fontFamily: C_COMMON.FONT_FAMILY_BIT12,
            lineSpacing: this.paddingLine
        };

        // 実際に表示する文字列オブジェクト
        this.dispTextGroup = this.scene.add.group();
        // 選択されているメニューの番号
        this.choosedMenuIdx = 0;
        this.choosedMark = null;
        this.pressedMenu = false;

        // 表示内容
        /** @type {DispContent} */
        this.dispContent = null;
        this.dispType = null;
        /** @type {BaseModel} */
        this.pressedObj = null;
        this.isFocused = false;

        // ウインドウがアクティブかどうか
        this.isActive = false;

        // ウインドウのオブジェクト
        this.windowObj = null;

        // ウインドウ関連のオブジェクトのコンテナ
        this.windowContainer = this.scene.add.container(0, 0);

        /** @type {DispContent} 表示対象のオブジェクト */
        this.dispObj = null;
    }

    /**
     * 表示コンテンツを初期化する
     */
    resetContent() {
        this.dispContent = null;
        this.dispType = null;
        this.pressedMenu = false;
        this.pressedObj = null;
        this.isFocused = false;
        this.dispTextGroup.clear(true, true);

        if (this.choosedMark) {
            // 既に表示されている場合は、削除する
            this.choosedMark.destroy();
        }
    }

    /**
     * 表示内容を維持したまま、選択状態などを初期化する
     */
    resetPressedState() {
        this.pressedMenu = false;
        this.pressedObj = null;
        this.isFocused = false;
    }

    /**
     * コンテンツを表示する
     * @param {DispContent} content 表示対象のオブジェクト
     */
    setDispContent(content) {
        // 表示コンテンツをリセットする
        this.resetContent();

        // 表示コンテンツを保存する
        this.dispObj = content;

        if (this.dispObj.isLine) {
            // 表示コンテンツが文章の場合

            // 選択中メニューの番号の調整
            this.choosedMenuIdx = 0;

            // 表示する文字列の折り返し処理を行う
            this.dispObj.obj[0] = GraphicUtil.wrapText(
                this.scene, this.dispObj.dispStr[0], this.fontStyle, this.hSize - this.paddingLine * 2);

            const textObj = this.scene.add.text(
                this.startX + this.paddingLine,
                this.startY + this.paddingLine,
                this.dispObj.obj[0], this.fontStyle
            ).setOrigin(0);

            // テキストオブジェクトを表示
            this.dispTextGroup.add(textObj);

        } else {
            // 表示コンテンツがリスト形式の場合

            // 選択中メニューの番号の調整
            this.choosedMenuIdx = Math.min(this.choosedMenuIdx, this.dispObj.getContentLength() - 1);

            for (let i = 0; i < this.dispObj.getContentLength(); i++) {

                const dispString = this.dispObj.dispStr[i];

                // テキストオブジェクト座標の計算
                const textObjX =
                    this.startX + this.paddingLine + (i % this.menuColNum) * this.hSize / this.menuColNum;
                const textObjY =
                    this.startY + this.paddingLine + Math.floor(i / this.menuColNum) * (this.paddingLine + this.fontSize);

                const textObj = this.scene.add.text(
                    textObjX, textObjY, dispString, this.fontStyle
                ).setOrigin(0);

                if (this.dispObj.isMenu) {
                    // 選択可能なリストの場合

                    // メニュー項目にプロパティを設定する
                    textObj.menuProperty = {
                        menuObj: this.dispObj.obj[i],
                        menuIdx: i
                    };

                    textObj.setInteractive();

                    // ホバーイベントのリスナーを追加
                    textObj.on('pointerover', () => {
                        // アクティブでない場合は処理をしない
                        if (!this.isActive) {
                            return;
                        }
                        // マウスがホバーしたらそのメニュー項目を選択状態にする
                        this.chooseMenu(textObj.menuProperty.menuIdx);
                        this.isFocused = true;
                    });

                    // 非ホバーイベントのリスナーを追加
                    textObj.on('pointerout', () => {
                        // アクティブでない場合は処理をしない
                        if (!this.isActive) {
                            return;
                        }
                        // 非ホバー状態になったらフラグをfalseにする
                        this.isFocused = false;
                    });

                    // クリックイベントのリスナーを追加
                    textObj.on('pointerdown', () => {
                        // アクティブでない場合は処理をしない
                        if (!this.isActive) {
                            return;
                        }
                        // クリックされたらクリックフラグをtrueにする
                        this.pressedMenu = true;

                        // 決定したメニューのモデルを設定する
                        this.pressedObj = textObj.menuProperty.menuObj;
                    });
                }

                // テキストオブジェクトを表示
                this.dispTextGroup.add(textObj);
            }
        }

        // ウインドウコンテナに追加
        for (const textObj of this.dispTextGroup.getChildren()) {
            this.windowContainer.add(textObj);
        }
    }

    /**
     * ウインドウを描画する
     */
    drawWindow() {
        const grph = this.scene.add.graphics();
        // ウインドウの内部描画
        grph.fillStyle(
            Phaser.Display.Color.HexStringToColor(this.bgColor).color, 1.0);
        grph.fillRoundedRect(
            this.startX, this.startY, this.hSize, this.vSize,
            C_COMMON.WINDOW_ROUND);

        // ウインドウの枠線描画
        grph.lineStyle(
            C_COMMON.WINDOW_FRAME_WEIGHT,
            Phaser.Display.Color.HexStringToColor(this.frameColor).color, 1.0);
        grph.strokeRoundedRect(
            this.startX, this.startY, this.hSize, this.vSize,
            C_COMMON.WINDOW_ROUND);

        // ウインドウコンテナに追加
        this.windowObj = grph;
        this.windowContainer.add(grph);
    }

    /**
     * 指定したメニューを選択状態にする
     * @param {number} menuIdx 選択状態にするメニューの番号
     */
    chooseMenu(menuIdx) {
        // 選択メニュー番号を更新する
        this.choosedMenuIdx = menuIdx;
    }

    /**
     * アクティブ状態を設定する。表示内容はそのままに押下状態関連を初期化する
     * @param {boolean} active フォーカスの状態
     * @param {boolean} reset 状態のリセット
     */
    setActive(active, reset) {
        this.isActive = active;
        this.resetPressedState();

        if (reset) {
            this.resetContent();
        }
    }

    /** 自身を完全削除する */
    destroy() {
        // ウインドウコンテナの削除
        this.windowContainer.destroy();
        // テキストグループの削除
        this.dispTextGroup.clear(true, true);
    }
}