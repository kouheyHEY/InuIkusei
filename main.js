const { app, BrowserWindow, ipcMain, Menu, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const gameScale = 0.8;
const gameWidth = 1280 * gameScale;
const gameHeight = 720 * gameScale;
// const gameWidth = 1280;
// const gameHeight = 720;

function createWindow() {
    const win = new BrowserWindow({
        width: gameWidth,  // ウインドウ幅
        height: gameHeight, // ウインドウ高
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload script for security
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('index.html');

    // メニューバーを非表示にする TODO: リリース時は再表示
    // Menu.setApplicationMenu(null);
}

// Electronの準備が完了したらウィンドウを作成
app.on('ready', () => {
    createWindow();
});


// ファイル読み込みリクエストのハンドリング
ipcMain.handle('read-csv', async (event, filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
});
