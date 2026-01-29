import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLightMode = false;

  constructor() { }

  ngOnInit(): void {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      document.body.classList.add('light-mode');
    }
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    
    if (this.isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }


  toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
  }

}
