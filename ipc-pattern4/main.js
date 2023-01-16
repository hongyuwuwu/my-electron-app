const { BrowserWindow, app, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
    // create the windows.
    const mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            contextIsolation: false,
            preload: 'preloadMain.js'
        }
    })

    const secondaryWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            contextIsolation: false,
            preload: 'preloadSecondary.js'
        }
    })

    // set up the channel.
    const { port1, port2 } = new MessageChannelMain()

    // once the webContents are ready, send a port to each webContents with postMessage.
    mainWindow.once('ready-to-show', () => {
        mainWindow.webContents.postMessage('port', null, [port1])
    })

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.webContents.postMessage('port', null, [port2])
    })
})