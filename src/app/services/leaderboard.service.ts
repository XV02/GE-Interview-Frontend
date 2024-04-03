import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getLeaderboard(tenantId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const request = this.httpClient.post(`${environment.apiUrl}/employee/get-by-tenant`, {
        tenantId
      });
      const response = await lastValueFrom(request);
      if (!response) reject('No response from server');
      resolve(response);
    });
  }
}
