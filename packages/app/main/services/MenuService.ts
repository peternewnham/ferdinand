import { ViewController } from './ViewController';
import { Menu, MenuItem, MenuItemConstructorOptions } from 'electron';

export class MenuService {

  private menu: Menu;
  constructor(private viewController: ViewController) {
    this.menu = new Menu();
  }

  private template: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        {
          label: 'Toggle Service Devtools',
          click: () => {
            const activeView = this.viewController.getActiveView();
            if (activeView) {
              activeView.toggleDevTools();
            }
          }
        },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ]
    },
  ];

  build() {
    const menu = Menu.buildFromTemplate(this.template);
    Menu.setApplicationMenu(menu);
  }

}
