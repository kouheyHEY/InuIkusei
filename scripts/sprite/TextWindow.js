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


        // 実際に表示する文字列オブジェクト
        this.dispTextGroup = this.scene.add.group();
        // 選択されているメニューの番号
        this.choosedMenuIdx = 0;
        this.choosedMark = null;
        this.pressedMenu = false;

        // 表示内容
        this.dispContent = null;
        this.dispType = null;
        this.pressedObj = null;

        // ウインドウがアクティブかどうか
        this.isActive = false;
    }

    /**
     * 表示コンテンツを初期化する
     */
    resetContent() {
        this.pressedMenu = false;

        this.dispContent = null;
        this.dispType = null;
        this.pressedObj = null;

        this.dispTextGroup.clear(true, true);

        if (this.choosedMark) {
            // 既に表示されている場合は、削除する
            this.choosedMark.destroy();
        }
    }

    /**
     * コンテンツを表示する
     * @param {Object[]} content 表示内容
     * @param {number} type 表示内容の形式（文章、テキストリスト、アイテムリスト、キャラリスト、メニュー）
     * @param {boolean} clear 表示内容をクリアするかどうか
     */
    setContent(content, type, clear = true) {
        if (clear) {
            // 表示コンテンツをリセットする
            this.resetContent();
        }

        // 表示コンテンツを保存する
        this.dispContent = content;
        this.dispType = type;

        if (type == C_COMMON.WINDOW_CONTENT_TYPE_LINE) {
            // 表示コンテンツが文章の場合
            const textObj = this.scene.add.text(
                this.startX + C_COMMON.WINDOW_PADDING_LINE,
                this.startY + C_COMMON.WINDOW_PADDING_LINE,
                content,
                {
                    fontSize: this.fontSize,
                    fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                    fontFamily: C_COMMON.FONT_FAMILY_BIT12
                }
            ).setOrigin(0);

            // テキストオブジェクトを表示
            this.dispTextGroup.add(textObj);

        } else {
            // 表示コンテンツがリスト形式の場合

            // 選択中メニューの番号の調整
            this.choosedMenuIdx = Math.min(this.choosedMenuIdx, content.length - 1);

            let leftPadding = 0;
            let idx = 0;

            for (const dispElm of content) {
                /** @type {string} 表示コンテンツ */
                let dispText = null;

                if (dispElm == C_COMMON.WINDOW_MENU_BACK) {
                    // 戻る選択肢の場合
                    dispText = dispElm;
                } else {
                    if (type == C_COMMON.WINDOW_CONTENT_TYPE_TEXTLIST) {
                        // テキストリスト形式の場合
                        dispText = dispElm;
                    } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_MENU) {
                        // メニューリストの場合
                        dispText = dispElm.getMenuColName();
                    } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_ITEM) {
                        // アイテムリストの場合
                        dispText = dispElm.getItemName();
                    } else if (type == C_COMMON.WINDOW_CONTENT_TYPE_CHARA) {
                        // キャラリストの場合
                        dispText = dispElm.getCharaName();
                    }
                }

                if (this.isMenu) {
                    // 選択可能なリストの場合

                    // 表示項目の左側に、カーソルを表示するための余白を設定する
                    leftPadding = C_COMMON.WINDOW_PADDING_LEFT;
                }

                // テキストオブジェクト座標の計算
                const textObjX = this.startX + C_COMMON.WINDOW_PADDING_LINE +
                    leftPadding +
                    (idx % this.menuColNum) * this.hSize / this.menuColNum;
                const textObjY = this.startY + C_COMMON.WINDOW_PADDING_LINE +
                    Math.floor(idx / this.menuColNum) *
                    (C_COMMON.WINDOW_PADDING_LINE + this.fontSize);

                const textObj = this.scene.add.text(
                    textObjX, textObjY, dispText,
                    {
                        fontSize: this.fontSize,
                        fill: C_COMMON.COMMON_COLOR_WINDOW_FONT,
                        fontFamily: C_COMMON.FONT_FAMILY_BIT12
                    }
                ).setOrigin(0);

                if (this.isMenu) {
                    // 選択可能なリストの場合

                    // メニュー項目にプロパティを設定する
                    textObj.menuProperty = {
                        menuObj: dispElm,
                        menuIdx: idx
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

                idx++;
            }


            if (this.isMenu) {
                // メニュー形式の場合

                // デフォルトで一番目のメニューが選択されている状態とする
                this.dispChoiceMark(
                    this.startX + C_COMMON.WINDOW_PADDING_LINE,
                    this.startY + C_COMMON.WINDOW_PADDING_LINE +
                    this.choosedMenuIdx * (
                        C_COMMON.WINDOW_PADDING_LINE + this.fontSize
                    ) + this.fontSize / 2,
                    C_COMMON.WINDOW_PADDING_LEFT * 2 / 3,
                    this.fontSize * 2 / 3
                );
            }
        }
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
     * 指定した位置に右向きの三角形を表示する
     * @param {number} x 三角形を表示するx座標
     * @param {number} y 三角形を表示するy座標（文字列の中心線）
     * @param {number} w 表示する三角形の幅
     * @param {number} h 表示する三角形の高さ
     */
    dispChoiceMark(x, y, w, h) {
        if (this.choosedMark) {
            // 既に表示されている場合は、削除する
            this.choosedMark.destroy();
        }

        // 新たに三角形を表示する
        let triangle = this.scene.add.graphics(
            {
                fillStyle:
                    { color: C_COMMON.COMMON_COLOR_WINDOW_FONT }
            }
        );

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

        this.choosedMark = triangle;
    }

    /**
     * 指定したメニューを選択状態にする
     * @param {number} menuIdx 選択状態にするメニューの番号
     */
    chooseMenu(menuIdx) {
        // 選択メニュー番号を更新する
        this.choosedMenuIdx = menuIdx;

        // 選択マークの位置の計算
        const markX = this.startX + C_COMMON.WINDOW_PADDING_LINE + (this.choosedMenuIdx % this.menuColNum) * this.hSize / this.menuColNum;

        const markY = this.startY + C_COMMON.WINDOW_PADDING_LINE + Math.floor(this.choosedMenuIdx / this.menuColNum) * (C_COMMON.WINDOW_PADDING_LINE + this.fontSize) + this.fontSize / 2;

        // 選択マークを更新する
        this.dispChoiceMark(
            markX, markY,
            C_COMMON.WINDOW_PADDING_LEFT * 2 / 3, this.fontSize * 2 / 3
        );
    }

    /**
     * ウインドウをテキスト形式に変更する
     */
    changeToText() {
        this.isLine = true;
        this.isMenu = false;
        this.isList = true;

        // 既に表示されている文字列を消去する
        if (this.dispTextGroup.getLength() !== 0) {
            this.dispTextGroup.clear(true, true);
        }

        if (this.choosedMark) {
            // 既に表示されている場合は、削除する
            this.choosedMark.destroy();
        }
    }

    /**
     * ウインドウをリスト形式に変更する
     * @param {boolean} isMenu メニューかどうか
     * @param {number} menuColNum メニューの列数
     */
    changeToList(isMenu, menuColNum) {
        this.isLine = false;
        this.isMenu = isMenu;
        this.isList = true;

        this.menuColNum = menuColNum;

        // 既に表示されている文字列を消去する
        if (this.dispTextGroup.getLength() !== 0) {
            this.dispTextGroup.clear(true, true);
        }

        if (this.choosedMark) {
            // 既に表示されている場合は、削除する
            this.choosedMark.destroy();
        }
    }

}