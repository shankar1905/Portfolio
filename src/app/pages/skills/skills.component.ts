import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills = [
    'Angular', 'Node.js', 'MongoDB', 'Express.js',
    'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'SQL Server', 'Git'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
