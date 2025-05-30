const { app, BrowserWindow, ipcMain } = require('electron')
const ftp = require('basic-ftp')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

// Handle FTP commands from renderer
ipcMain.handle('ftp-command', async (event, { host, user, password, command }) => {
  const client = new ftp.Client()
  client.ftp.verbose = false
  try {
    await client.access({
      host,
      user,
      password
    })

    let result = ''
    if (command === 'list') {
      const list = await client.list()
      result = list.map(item => item.name).join('\n')
    }
    // Add more commands here as needed

    client.close()
    return result
  } catch (err) {
    client.close()
    return 'Error: ' + err.message
  }
})

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: true,            // <--- this makes the window resizable
    titleBarStyle: 'hiddenInset', 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

