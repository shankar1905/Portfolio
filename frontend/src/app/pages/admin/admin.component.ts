import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  messages: any[] = [];
  visitors: any[] = [];
  stats: any = {};

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadData();
    this.loadStats();
  }

  loadData() {
    this.adminService.getMessages().subscribe(res => this.messages = res);
    this.adminService.getVisitors().subscribe(res => this.visitors = res);
  }

  loadStats() {
    this.adminService.getStats().subscribe(res => {
      this.stats = res;
    });
  }
}
