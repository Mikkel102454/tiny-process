const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    // Hide instead of close
    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
}

app.whenReady().then(() => {
    createWindow();

    tray = new Tray(path.join(__dirname, 'icon.png'));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => mainWindow.show()
        },
        {
            label: 'Quit',
            click: () => {
                app.exit();
            }
        }
    ]);

    tray.setToolTip('My Electron App');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.isVisible()
            ? mainWindow.hide()
            : mainWindow.show();
    });
});