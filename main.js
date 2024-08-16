const { app, BrowserWindow, ipcMain, Menu, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

const gameWidth = 1280;
const gameHeight = 720;

function createWindow() {
    const win = new BrowserWindow({
        width: gameWidth,  // Phaser 3と同じ幅
        height: gameHeight, // Phaser 3と同じ高さ
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload script for security
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('index.html');

    // メニューバーを非表示にする
    Menu.setApplicationMenu(null);

    // ウインドウのフレームを含めたサイズの調整をする
    win.once('ready-to-show', () => {
        const windowSize = win.getSize(); // ウィンドウ全体のサイズ [width, height]
        const contentBounds = win.getContentBounds(); // コンテンツ部分のサイズ {x, y, width, height}

        // コンテンツのサイズに基づいてウィンドウのサイズを調整
        const adjW = gameWidth + (windowSize[0] - contentBounds.width);
        const adjH = gameHeight + (windowSize[1] - contentBounds.height);

        // ウィンドウのサイズを調整
        win.setSize(adjW, adjH);
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
