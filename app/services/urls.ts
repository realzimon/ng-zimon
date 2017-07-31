import {ENV} from '../config/environment';


export class URLS {
  static readonly hostname = location.hostname;
  static readonly backendUrl = ENV.backendUrl.replace('RHOST', URLS.hostname);
  static readonly socketUrl = ENV.socketUrl.replace('RHOST', URLS.hostname);

  public static backendPath(relPath: string): string {
    return this.backendUrl + relPath;
  }
}
