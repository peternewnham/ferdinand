import { BrowserView, BrowserWindow, WebPreferences, shell } from 'electron';
import { ServiceManager } from './ServiceManager';
import * as path from 'path';
import { parse } from 'url';
import { MessageEventType } from '../../common/messaging';
import electronIsDev from 'electron-is-dev';

export interface ViewSize {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ViewManager {

  private view: BrowserView;
  private ready = false;

  constructor(private window: BrowserWindow, private service: ServiceManager, private onReady: () => void) {
    this.view = this.initialise();
  }

  public getServiceId(): string {
    return this.service.getId();
  }

  public hide() {
    this.window.removeBrowserView(this.view);
  }

  public show(size: ViewSize) {
    this.window.addBrowserView(this.view);
    this.resize(size);
  }

  public getView(): BrowserView {
    return this.view;
  }

  private initialise(): BrowserView {
    const webPreferences: WebPreferences = {
      preload: path.join(__dirname, 'services/servicePreload.js'),
      enableRemoteModule: false
    };
    if (this.service.getSession()) {
      webPreferences.partition = `persist:${this.service.getSession()}`;
    }
    const view = new BrowserView({
      webPreferences
    });

    view.webContents.loadURL(this.service.getUrl(), {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
    });
    this.addEvents(view);
    return view;
  }

  private setReady() {
    console.log(`${this.service.getType()}:${this.service.getSession()} is ready`);
    this.ready = true;
    this.onReady();
  }

  public isReady(): boolean {
    return this.ready;
  }

  private addEvents(view: BrowserView) {

    view.webContents.on('did-finish-load', () => {
      this.setReady();
      view.webContents.send(MessageEventType.LOAD_SERVICE, {
        id: this.service.getId(),
        type: this.service.getType(),
        muted: this.service.getMuted()
      });
    });

    view.webContents.on('will-navigate', (e) => {
      console.log('will-navigate');
      e.preventDefault();
    });

    view.webContents.on('new-window', function(e, url) {
      console.log('new-window', url);
      e.preventDefault();
      const protocol = parse(url).protocol;
      if (protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:') {
        shell.openExternal(url);
      }
    });

  }

  public resize(size: ViewSize) {
    this.view.setBounds(size);
  }

  public openDevTools() {
    if (electronIsDev) {
      this.view.webContents.openDevTools();
    }
  }

}
