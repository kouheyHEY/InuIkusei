const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    readCSV: (filePath) => ipcRenderer.invoke('read-csv', filePath)
});
