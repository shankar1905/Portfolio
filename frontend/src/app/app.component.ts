import { Component, OnInit } from '@angular/core';
import { VisitorService } from './services/visitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private visitorService: VisitorService) { }

  ngOnInit() {
    this.visitorService.trackVisitor(); // 👀 track visitors
  }
}
