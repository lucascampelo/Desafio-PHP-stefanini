import axios, {} from "axios";
import {AxiosInstance, Method} from "axios";
import {ErrorHandler} from "@angular/core";
import {Injectable} from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
axios.defaults.baseURL = 'http://api.desafio-stefanini.local/';

export interface Params {
  [ key: string ]: any;
}

export interface GetOptions {
  url: string;
  params?: Params;
  data?: any;
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: "root"
})

export class ApiClient {

  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  // I initialize the ApiClient.
  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    // Configurações do Axios
    this.axiosClient = axios.create({
      timeout: 3000
    });
  }

  // ---
  // PUBLIC METHODS.
  // ---

  /**
   * Realiza uma requisição GET
   *
   * @param options
   * @returns {Promise<never>}
   */
  public async get<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.axiosClient.request<T>({
        method: "get",
        url: options.url,
        params: options.params
      });

      return ( axiosResponse.data );
    } catch (error) {
      return ( Promise.reject(this.normalizeError(error)) );
    }
  }

  /**
   * Realiza uma requisição PUT
   *
   * @param options
   * @returns {Promise<never>}
   */
  public async put<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.abstractMethod('put', options);

      return ( axiosResponse.data );
    } catch (error) {
      return ( Promise.reject(this.normalizeError(error)) );
    }
  }

  /**
   * Realiza uma requisição POST
   *
   * @param options
   * @returns {Promise<never>}
   */
  public async post<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.abstractMethod('post', options);

      return ( axiosResponse.data );
    } catch (error) {
      return ( Promise.reject(this.normalizeError(error)) );
    }
  }

  /**
   * Realiza uma requisição DELETE
   *
   * @param options
   * @returns {Promise<never>}
   */
  public async delete<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.abstractMethod('delete', options);

      return ( axiosResponse.data );
    } catch (error) {
      return ( Promise.reject(this.normalizeError(error)) );
    }
  }

  /**
   * Método utilizado para encapsular e reaproveitar o código.
   *
   * @param method
   * @param options
   * @returns {Promise<any>}
   */
  private async abstractMethod<T>(method: Method, options: GetOptions): Promise<any> {
    try {
      return await this.axiosClient.request<T>({
        method: method,
        url: options.url,
        params: options.params,
        data: options.data,
      });
    } catch (error) {
      return ( Promise.reject(this.normalizeError(error)) );
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private normalizeError(error: any): ErrorResponse {
    this.errorHandler.handleError(error);

    return ({
      id: "-1",
      code: "UnknownError",
      message: "An unexpected error occurred."
    });
  }

}
