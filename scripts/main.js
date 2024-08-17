// Phaser3設定データ
const config = {
	type: Phaser.AUTO,
	width: C_COMMON.D_WIDTH,
	height: C_COMMON.D_HEIGHT,

	// 画面設定
	// scale: {
	// 	mode: Phaser.Scale.FIT,
	// 	parent: 'gameContainer',
	// 	autoCenter: Phaser.Scale.CENTER_BOTH,
	// },

	// アンチエイリアス
	antialias: true,

	scene: [
		PreLoadScene,
		TitleScene,
		IkuseiScene,
		BattleScene,
	],

	fps: {
		// フレームレート
		target: C_COMMON.FPS,
		forceSetTimeOut: true
	},

	physics: {
		default: "arcade",
		arcade: {
			// スプライトに緑の枠を表示
			debug: true,
		}
	},

	audio: {
		// Web Audio APIを有効にする
		disableWebAudio: false
	},
}

// Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);
