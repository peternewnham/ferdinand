import { BrowserWindow } from 'electron';
import { WindowManager } from './WindowManager';
import { MessageEventType, ResizeEvent, SetActiveServiceEvent, SetUnreadCountEvent } from '../common/messaging';
import { ViewController } from './services/ViewController';
import { ServiceController } from './services/ServiceController';
import { TrayService } from './services/TrayService';
import { MenuService } from './services/MenuService';

declare var MAIN_WINDOW_WEBPACK_ENTRY: any;

export let mainWindow: BrowserWindow|null = null;

let windowManager: WindowManager;
let viewController: ViewController;
let trayService: TrayService;
let menuService: MenuService;

export const createWindow = (appPath: string) => {

  windowManager = new WindowManager(MAIN_WINDOW_WEBPACK_ENTRY, {
    // fullscreen: true,
    width: 1600,
    height: 900,
    title: 'Ferdinand',
    closable: true,
    minimizable: true,
    maximizable: true,
    icon: './resources/icons/color/64x64.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  windowManager.maximise();
  windowManager.openDevTools();

  const serviceController = new ServiceController(appPath);
  serviceController.loadServices();
  const services = serviceController.getServices();

  viewController = new ViewController(windowManager);
  viewController.initialise(services);

  windowManager.receive<SetActiveServiceEvent>(MessageEventType.SET_ACTIVE_SERVICE, (id) => {
    serviceController.setActive(id);
    viewController.activateId(id);
  });

  windowManager.receive<ResizeEvent>(MessageEventType.RESIZE, (size) => {
    viewController.resize(size);
  });

  windowManager.receive<SetUnreadCountEvent>(MessageEventType.SET_UNREAD_COUNT, ({ serviceId, count }) => {
    console.log('setUnreadCount', serviceId, count);
    serviceController.setCount(serviceId, count);
    viewController.update();
    trayService.updateActive(serviceController.hasCount());
  });

  trayService = new TrayService();
  trayService.build();

  menuService = new MenuService(viewController);
  menuService.build();

};
