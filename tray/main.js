const { app, Tray, Menu, nativeImage } = require('electron')

let tray

app.whenReady().then(() => {
    const icon = nativeImage.createFromPath('image/tray.png')
    tray = new Tray(icon)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    tray.setContextMenu(contextMenu)
    
    tray.setToolTip('This is my application')
    tray.setTitle('This is my title')
})



