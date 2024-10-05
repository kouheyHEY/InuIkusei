const C_COMMON = {
    /** ゲームタイトル */
    // GAME_TITLE: '犬と僕',
    GAME_TITLE: 'タイトル（仮）',
    /** 画面幅 */
    D_WIDTH: 1280,
    /** 画面高さ */
    D_HEIGHT: 720,
    /** FPS */
    FPS: 60,

    /** シーン名 PreLoadScene */
    SCENE_PRELOADSCENE: 'PreLoadScene',
    /** シーン名 TitleScene */
    SCENE_TITLESCENE: 'TitleScene',
    /** シーン名 IkuseiScene */
    SCENE_IKUSEISCENE: 'IkuseiScene',
    /** シーン名 BattleScene */
    SCENE_BATTLESCENE: 'BattleScene',
    /** シーン名 GameClearScene */
    SCENE_GAMECLEARSCENE: 'GameClearScene',

    /** フォント ビット太字 */
    FONT_FAMILY_BIT12_BOLD: 'Bit12Bold',
    /** フォント ビット通常 */
    FONT_FAMILY_BIT12: 'Bit12',

    /** 文字の大きさ 大 */
    FONT_SIZE_LARGE: 64,
    /** 文字の大きさ 中 */
    FONT_SIZE_MEDIAM: 48,
    /** 文字の大きさ 小 */
    FONT_SIZE_SMALL: 24,
    /** 文字の大きさ 極小 */
    FONT_SIZE_SMALL_2: 18,

    /** ウインドウ 枠の太さ */
    WINDOW_FRAME_WEIGHT: 4,

    /** 共通色 白系 */
    COMMON_COLOR_WHITE: '#faebd7',

    /** 共通色 黒系１ */
    COMMON_COLOR_BLACK_1: '#1e0033',
    /** 共通色 黒系２ */
    COMMON_COLOR_BLACK_2: '#3c0066',
    /** 共通色 黒系３ */
    COMMON_COLOR_BLACK_3: '#590099',
    /** 共通色 黒系４ */
    COMMON_COLOR_BLACK_4: '#7700cc',

    /** 共通色 ウインドウ文字色 */
    COMMON_COLOR_WINDOW_FONT: '#1e0033',
    /** 共通色 ウインドウ背景色 */
    COMMON_COLOR_WINDOW_BG: '#faebd7',
    /** 共通色 ウインドウ枠色 */
    COMMON_COLOR_WINDOW_FRAME: '#1e0033',

    /** ウインドウ 行間 小 */
    WINDOW_PADDING_LINE_SMALL: 18,
    /** ウインドウ 行間 極小 */
    WINDOW_PADDING_LINE_SMALL_2: 12,
    /** ウインドウ 丸み */
    WINDOW_ROUND: 2,
    /** ウインドウ メニュー表示時の左側の余白 小 */
    WINDOW_PADDING_LEFT_SMALL: 16,
    /** ウインドウ メニュー表示時の左側の余白 極小 */
    WINDOW_PADDING_LEFT_SMALL_2: 12,

    /** キー定数 上 */
    KEY_UP: "UP",
    /** キー定数 下 */
    KEY_DOWN: "DOWN",
    /** キー定数 左 */
    KEY_LEFT: "LEFT",
    /** キー定数 右 */
    KEY_RIGHT: "RIGHT",
    /** キー定数 ENTER */
    KEY_ENTER: "ENTER",
    /** キー定数 スペースキー */
    KEY_SPACE: "SPACE",

    /** 記号 パイプ */
    SIGN_PIPE: "|",

    /** ウインドウ 表示コンテンツ種類 文章 */
    WINDOW_CONTENT_TYPE_LINE: 1,
    /** ウインドウ 表示コンテンツ種類 メニューリスト */
    WINDOW_CONTENT_TYPE_MENU: 2,
    /** ウインドウ 表示コンテンツ種類 アイテムリスト */
    WINDOW_CONTENT_TYPE_ITEM: 3,
    /** ウインドウ 表示コンテンツ種類 キャラリスト */
    WINDOW_CONTENT_TYPE_CHARA: 4,
    /** ウインドウ 表示コンテンツ種類 テキストリスト */
    WINDOW_CONTENT_TYPE_TEXTLIST: 5,
    /** ウインドウ 表示コンテンツ種類 フィールドリスト */
    WINDOW_CONTENT_TYPE_FIELD: 6,
    /** ウインドウ 表示コンテンツ種類 鍛練メニューリスト */
    WINDOW_CONTENT_TYPE_TRAINING: 7,
    /** ウインドウ 表示コンテンツ種類 生活メニューリスト */
    WINDOW_CONTENT_TYPE_LIFE: 8,
    /** ウインドウ 表示コンテンツ種類 バトル行動リスト */
    WINDOW_CONTENT_TYPE_BATTLEACTION: 9,

    /** 効果種類 アイテム */
    EFFECT_TYPE_ITEM: 1,
    /** 効果種類 アクション */
    EFFECT_TYPE_ACTION: 2,

    /** メニュー選択肢 戻る */
    WINDOW_MENU_BACK: "戻る",
    /** 子メニュー無（戻る押下時） */
    CHILDMENU_NULL_BACK: -1,
    /** 子メニュー無（戻る押下時以外） */
    CHILDMENU_NULL_NEXT: 1,

    /** カーソルウインドウ 幅 */
    WINDOW_CURSOR_W: 320,
    /** カーソルウインドウ 高さ */
    WINDOW_CURSOR_H: 72,
    /** カーソルウインドウ 角とマウスの距離 */
    WINDOW_CURSOR_CORNER_POS: 24,

    /** メニュー用ウインドウ X座標 */
    WINDOW_MENU_X: 64,
    /** メニュー用ウインドウ Y座標 */
    WINDOW_MENU_Y: 480,
    /** メニュー用ウインドウ 幅 */
    WINDOW_MENU_W: 256,
    /** メニュー用ウインドウ 高さ */
    WINDOW_MENU_H: 192,

    /** メイン用テキストウインドウ X座標 */
    WINDOW_TEXT_MAIN_X: 384,
    /** メイン用テキストウインドウ Y座標 */
    WINDOW_TEXT_MAIN_Y: 480,
    /** メイン用テキストウインドウ 幅 */
    WINDOW_TEXT_MAIN_W: 832,
    /** メイン用テキストウインドウ 高さ */
    WINDOW_TEXT_MAIN_H: 192,

    /** メイン用ウインドウ メニュー列数 */
    WINDOW_TEXT_MAIN_COL_NUM: 3,

    /** エラーメッセージ 実装されていない */
    MSG_ERR_NOIMPL: "実装されていません。",

};