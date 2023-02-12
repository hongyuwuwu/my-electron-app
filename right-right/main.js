/*
* Electron使用总结：
    1）安装Node.js：node -v && npm -v
    2）创建项目目录，并进入到该目录：mkdir my-electron-app && cd my-electron-app
    3）我们启动了一个Node.js程序：npm init
    4）并将Electron添加为依赖：npm install --save-dev electron
    5）创建一个main.js脚本来运行主要进程：内容为正文内容
    6）打包并分发我们的应用程序
        a. 最快捷的打包方式是使用Electron Forge
            i. 将Electron Forge添加到您应用的开发依赖中，并使用其"import"命令设置Forge的脚本
                npm install --save-dev @electron-forge/cli
                npx electron-forge import
                    遇到错误信息，修复方案：
                        npm config set ELECTRON_CUSTOM_DIR "{{ version }}"
                        https://blog.csdn.net/qq_32660241/article/details/124345913
                可以看到在初始化之后多出了两个指令，分别对应：
                    · 生成可执行文件夹 pacakge
                    · 打包 make
            ii. 使用 Forge 的 make 命令来创建可分发的应用程序：
                在 make 之前，需要先将项目 package
                    npm run package
                生成安装包：
                    npm run make
*/


// Electron两个主要的模块
// app：它控制应用程序的事件生命周期
// BrowserWindow：它创建和管理应用程序窗口
const { app, BrowserWindow } = require('electron')

// 引入Node.js的'path'模块
const path = require('path');

// 创建窗口的函数体
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// 只有在app模块的ready事件被激发后才能创建浏览器窗口。您可以通过使用app.whenReady()API来监听此事件
app.whenReady().then(() => {
    createWindow()

    // macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序
app.on('window-all-closed', () => {
    if (process.platfrom != 'darwin')
        app.quit()
})

