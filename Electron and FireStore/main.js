const { app, dialog } = require('electron')
const { BrowserWindow, Menu } = require('electron/main')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')

    const menuTemplate = [
        {
            label: 'Settings',
            submenu: [
                {
                    label: 'Alert',
                    click: () => {
                        showDialog()
                    }
                }
            ]
        }        
    ]

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }

  function showDialog() {
    dialog.showMessageBox({message: 'hello!'});
}

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })