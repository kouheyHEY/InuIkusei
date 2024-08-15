class InputManager {
    /**
     * @param {Phaser.Scene} scene - 操作を管理するシーン
     * @param {string[]} initKeyList 初期化するキーのリスト
     */
    constructor(scene, initKeyList) {
        this.scene = scene;
        /** @type {Object} キーの状態を表すオブジェクト */
        this.keys = {};

        // キーの初期化を行う
        this.initializeKeys(initKeyList);
    }

    /**
     * 初期化したいキーを登録する
     * @param {string[]} keyList - 初期化するキーの配列
     */
    initializeKeys(keyList) {
        for (const key of keyList) {
            this.keys[key] = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes[key]
            );
        }
    }

    /**
     * 特定のキーが押されているかチェック
     * @param {string} key - チェックするキー
     * @returns {boolean} - キーが押されている場合はtrue
     */
    isKeyDown(key) {
        if (this.keys[key]) {
            return this.keys[key].isDown;
        }
        return false;
    }

    /**
     * 特定のキーが押された瞬間をチェック
     * @param {string} key - チェックするキー
     * @returns {boolean} - キーが押された瞬間はtrue
     */
    isKeyPressed(key) {
        if (this.keys[key]) {
            return Phaser.Input.Keyboard.JustDown(this.keys[key]);
        }
        return false;
    }

    /**
     * 特定のキーが離された瞬間をチェック
     * @param {string} key - チェックするキー
     * @returns {boolean} - キーが離された瞬間はtrue
     */
    isKeyReleased(key) {
        if (this.keys[key]) {
            return Phaser.Input.Keyboard.JustUp(this.keys[key]);
        }
        return false;
    }

    /**
     * 初期化されているキーを全てクリア
     */
    clearKeys() {
        this.keys = {};
    }
}

