import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './models/global';
import { TokenService } from './token.service';

const httpOptions = {
  headers: new HttpHeaders(),
  withCredentials: false,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private auth: TokenService) {}

  /**
   * building up the full url path for each resource and / or params
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return full request path after adding the entity type and resource param
   */
  fullRequestURL(resource: string | number): string {
    return Global.restUrl + (resource ? resource : '');
    // return  resource + '';
  }
  jsonURL(resource: string | number): string {
    // console.log(Global.jsonUrl)
    return Global.jsonUrl + (resource ? resource : '');
    // return  resource + '';
  }
  /**
   * basic http get request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  getByFullURL(resource: string | number, params?: any): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.get(resource + '');
  }
  /**
   * basic http get request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  get(
    resource?: string | number,
    params?: any,
  ): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(this.fullRequestURL(resource), httpOptions);
  }


  getCustom(resource?: string | number, params?: any): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(this.jsonURL(resource), httpOptions);
  }

  /**
   * basic http post request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @param body the contenct of the request
   * @return http json response
   */
  post(
    body: any = {},
    resource?: string | number,
    params?: any
  ): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.post(this.fullRequestURL(resource), body, httpOptions);
  }

  /**
   * basic http put request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @param body the contenct of the request
   * @return http json response
   */
  put(body: any = {}, resource?: string | number): Observable<any> {
    return this.http.put(this.fullRequestURL(resource), body, httpOptions);
  }

  /**
   * basic http delete request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  delete(resource?: string | number, params: any = null): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.delete(this.fullRequestURL(resource), httpOptions);
  }

  /**
   * basic http patch request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  patch(
    body: any,
    resource?: string | number,
    params: any = null
  ): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.patch(this.fullRequestURL(resource), body, httpOptions);
  }

  downloadFile(resource, type, params = {}) {
    const headers = new HttpHeaders({ 'Content-Type': type, Accept: type });
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.get(this.fullRequestURL(resource), {
      responseType: 'blob',
      observe: 'response',
    });
  }
  downloadFileByPost(resource, type) {
    const headers = new HttpHeaders({ 'Content-Type': type, Accept: type });

    return this.http.post(
      this.fullRequestURL(resource),
      {},
      { responseType: 'blob', observe: 'response' }
    );
  }
  /**
   * Serializin arguments as a string
   * @param options object of Backend parametars to serialize
   * @return string of parameters
   */
  uploadFile(resource, data) {
    return this.http.post(this.fullRequestURL(resource), data);
  }

  getArgs(options: any): string {
    if (!options) {
      return '';
    }
    let args = '?';
    Object.keys(options).forEach((key, index) => {
      if (args != '?') {
        args += '&';
      }
      args += this.optionToString(key, options[key]);
    });

    return args;
  }

  /**
   * Check if variable is array of objects
   * @param value array to check
   */
  private isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
   * serializing eatch option
   * @param key option key
   * @param value option value
   * @return single option serilization
   */
  optionToString(key: string, value: any): string {
    if (!value && value != 0) {
      return '';
    }
    let str = '';
    if (value instanceof Array) {
      value.forEach((element, index) => {
        str += `${key}[${index}]=${element}&`;
      });
    } else if (value instanceof Object) {
      Object.keys(value).forEach((element, index) => {
        if (value[element] instanceof Object) {
          str += this.serializeObject(value[element], `${key}[${element}]`);
        } else {
          str += `${key}[${element}]=${value[element]}&`;
        }
      });
    } else {
      str += `${key}=${value}`;
    }
    return str;
  }

  /**
   * serializing the object keys
   * @param obj object to serialize
   */
  private serializeObject(obj: any, parentSerialized: string): string {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const value = obj[key];
      if (value instanceof Object) {
        str += `${this.serializeObject(value, `${parentSerialized}[${key}]`)}`;
      } else {
        str += `${parentSerialized}[${key}]=${value}&`;
      }
    });
    return str;
  }

}
