/**
 * 描画に関するユーティルクラス
 */
class GraphicUtil {
    constructor() { }

    /**
     * 2つの文字列を、指定されたピクセル幅に基づいて両端に配置されるように文字数を調整する
     * @param {Phaser.Scene} scene シーンオブジェクト
     * @param {string} str1 文字列1
     * @param {string} str2 文字列2
     * @param {number} textWidth テキストの表示幅（ピクセル数）
     * @param {Phaser.GameObjects.TextStyle} style テキストのスタイル
     * @returns {string} 調整された文字列
     */
    static adjust2StrBothEnd(scene, str1, str2, textWidth, style) {
        // テキストオブジェクトを一時的に作成し、文字列のピクセル幅を取得する
        const tempText1 = scene.add.text(0, 0, str1, style);
        const tempText2 = scene.add.text(0, 0, str2, style);

        const str1Width = tempText1.width;
        const str2Width = tempText2.width;

        // 一時的に作成したテキストオブジェクトを削除
        tempText1.destroy();
        tempText2.destroy();

        // 使用できるスペースのピクセル数
        const availableSpace = textWidth - (str1Width + str2Width);

        if (availableSpace <= 0) {
            // テキスト幅が足りない場合、スペースなしで結合して返す
            return str1 + str2;
        }

        // スペースを挿入する回数（1スペースの幅を考慮）
        const spaceChar = ' ';
        const tempSpaceText = scene.add.text(0, 0, spaceChar, style);
        const spaceWidth = tempSpaceText.width;
        tempSpaceText.destroy();

        const spaceCount = Math.floor(availableSpace / spaceWidth);

        // スペースを両端に配置して文字列を結合
        const spaces = spaceChar.repeat(spaceCount);
        return str1 + spaces + str2;
    }

}