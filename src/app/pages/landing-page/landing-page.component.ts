import { Component } from '@angular/core';
import { MainAppBarComponent } from '../../shared/main-app-bar/main-app-bar.component';
import { SearcherComponent } from '../../shared/searcher/searcher.component';
import { TenantsService } from '../../services/tenants.service';
import { LeaderboardService } from '../../services/leaderboard.service';
import { PrivateKeyInput } from 'crypto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MainAppBarComponent,
    SearcherComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass'
})
export class LandingPageComponent {
  public tenantList: any[] = [];
  public actualTenant: any = null;
  public leaderboard: any[] = [];

  public filterFunction = (x: any) => `${x.name} ${x.email}`.toLowerCase();
  public resultFunction = (x: any) => `${x.name} - ${x.email}`;

  private isMobile: boolean = false;

  constructor(
    private tenantService: TenantsService,
    private leaderboardsService: LeaderboardService,
  ) { }

  async ngOnInit() {
    this.checkSize();
    window.addEventListener('resize', () => this.checkSize());
    try {
      this.tenantList = await this.tenantService.getTenants();
    } catch (e) {
      console.error('Error getting tenants', e);
    }
  }

  async selectedTenant(tenant: any): Promise<void> {
    try {
      this.leaderboard = await this.leaderboardsService.getLeaderboard(tenant.id);
      this.actualTenant = tenant;
      console.log(this.leaderboard);
    } catch (e) {
      console.error('Error getting leaderboard', e);
    }
  }

  private checkSize() {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public clearTenant() {
    this.actualTenant = null;
    this.leaderboard = [];
  }
}
