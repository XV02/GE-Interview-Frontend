import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  private allTenantsRequested: boolean = false;
  private tenantList: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  async getTenants(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.allTenantsRequested) resolve(this.tenantList);
      const request = this.httpClient.get(`${environment.apiUrl}/tenants`);
      const response: any = await lastValueFrom(request);
      this.tenantList = response;
      if (!response) reject('No response from server');
      resolve(response);
    });
  }
}
