import {ApiClient} from "./api-client";
import {ErrorHandler} from "@angular/core";
import MockAdapter from 'axios-mock-adapter';

describe('ApiClient', () => {
  let apiClient = new ApiClient(new ErrorHandler());
  const mock = new MockAdapter(apiClient.getAxiosInstance());

  mock.onGet('/funcionarios/1').reply(200, {
    id: 1,
    nome_completo: "Amélia Ferminiano Romero Sobrinho",
    sexo: "f",
    cpf: "83574707509"
  });

  mock.onPost('/funcionarios').reply(function(config) {
    const data = JSON.parse(config.data);
    data.id = 2;
    return [201, data];
  });

  mock.onPut('/funcionarios/1').reply(function(config) {
    const data = JSON.parse(config.data);
    return [200, data];
  });

  mock.onDelete('/funcionarios/1').reply(200, {
    success: true,
    message: 'Funcionário apagado com sucesso.',
  });

  it('should create', () => {
      expect(apiClient).toBeTruthy();
  });

  it('should make GET request', async (): Promise<void> => {
    const response = await apiClient.get<any>({url: '/funcionarios/1'});

    expect(response).toEqual({
      id: 1,
      nome_completo: "Amélia Ferminiano Romero Sobrinho",
      sexo: "f",
      cpf: "83574707509"
    });
  });

  it('should make POST request', async (): Promise<void> => {
    const response = await apiClient.post<any>({
      url: '/funcionarios',
      data: {
        nome_completo: "Joãozinho da Silva",
        sexo: "m",
        cpf: "22222222222"
      }
    });

    expect(response).toEqual({
      id: 2,
      nome_completo: "Joãozinho da Silva",
      sexo: "m",
      cpf: "22222222222"
    });
  });

  it('should make PUT request', async (): Promise<void> => {
    const response = await apiClient.put<any>({
      url: '/funcionarios/1',
      data: {
        id: 1,
        nome_completo: "Mariazinha de Sá",
        sexo: "f",
        cpf: "33333333333"
      }
    });

    expect(response).toEqual({
      id: 1,
      nome_completo: "Mariazinha de Sá",
      sexo: "f",
      cpf: "33333333333"
    });
  });

  it('should make DELETE request', async (): Promise<void> => {
    const response = await apiClient.delete<any>({url: '/funcionarios/1'});

    expect(response).toEqual({
      success: true,
      message: 'Funcionário apagado com sucesso.',
    });
  });

});
