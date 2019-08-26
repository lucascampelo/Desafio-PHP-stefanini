import {ApiClient} from "./api-client";
import {ErrorHandler} from "@angular/core";

describe('ApiClient', () => {
  let apiClient = new ApiClient(new ErrorHandler());

  it('should create', () => {
      expect(apiClient).toBeTruthy();
  })
});
