const { app, BrowserWindow, ipcMain, Menu, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

const gameScale = 0.8;
const gameWidth = 1280 * gameScale;
const gameHeight = 720 * gameScale;
// const gameWidth = 1280;
// const gameHeight = 720;

function createWindow() {
    const win = new BrowserWindow({
        width: gameWidth,  // ウインドウ幅
        height: gameHeight, // ウインドウ高
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload script for security
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('index.html');

    // メニューバーを非表示にする TODO: リリース時は再表示
    // Menu.setApplicationMenu(null);

    // ウインドウのフレームを含めたサイズの調整をする
    win.once('ready-to-show', () => {
        const windowSize = win.getSize(); // ウィンドウ全体のサイズ [width, height]
        const contentBounds = win.getContentBounds(); // コンテンツ部分のサイズ {x, y, width, height}

        // コンテンツのサイズに基づいてウィンドウのサイズを調整
        const adjW = gameWidth + (windowSize[0] - contentBounds.width);
        const adjH = gameHeight + (windowSize[1] - contentBounds.height);

        // ウィンドウのサイズを調整
        win.setSize(adjW, adjH);


        console.log("DEBUG : OldWindowSize : " + windowSize);
        console.log("DEBUG : OldBoundsSize : " + [contentBounds.width, contentBounds.height]);
        console.log("DEBUG : NewWindowSize : " + win.getSize());
    });
}

// Electronの準備が完了したらウィンドウを作成
app.whenReady().then(() => {
    createWindow();
});

// ファイル読み込みリクエストのハンドリング
ipcMain.handle('load-json-data', async (event, filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
});
