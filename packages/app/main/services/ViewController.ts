import {BrowserWindow} from 'electron';
import { ViewManager, ViewSize } from './ViewManager';
import { ServiceManager } from './ServiceManager';
import { SetServicesEvent } from '../../common/messaging';
import { WindowManager } from '../WindowManager';
import electronIsDev from 'electron-is-dev';

export class ViewController {

  private size: ViewSize = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  private window: BrowserWindow;

  private activeView: ViewManager|null = null;
  private views: ViewManager[] = [];
  private services: ServiceManager[] = [];

  constructor(private windowManager: WindowManager) {
    this.window = windowManager.getWindow();
  }

  initialise(services: ServiceManager[]) {
    this.services = services;
    this.views = services.map(service => {
      return new ViewManager(this.window, service, () => this.checkAllReady());
    });
    if (this.views.length > 0) {
      this.activateIndex(0);
    } else {
      this.update();
    }
  }

  private checkAllReady() {
    if (this.views.every(view => view.isReady())) {
      console.log('All views are ready');
      this.update();
    }
  }

  update() {
    this.windowManager.send(new SetServicesEvent(this.services.map(service => ({
      id: service.getId(),
      active: service.getActive(),
      count: service.getCount(),
      muted: service.getMuted(),
      name: service.getName(),
      icon: service.getIcon()
    }))));
  }

  activateId(id: string) {
    const view = this.views.find(view => view.getServiceId() === id);
    if (view) {
      this.activate(view);
    }
    this.update();
  }

  activateIndex(index: number) {
    this.activate(this.views[index]);
  }

  activate(view: ViewManager) {
    this.views.forEach(view => {
      view.hide();
    });
    this.activeView = view;
    view.show(this.size);
    if (electronIsDev) {
      view.openDevTools();
    }
  }

  resize(size: ViewSize) {
    if (this.activeView) {
      this.size = size;
      this.activeView.resize(size);
    }
  }

  getActiveView(): ViewManager | null {
    return this.activeView;
  }

}
