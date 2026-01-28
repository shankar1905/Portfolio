import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  name = '';
  email = '';
  subject = '';
  message = '';

  constructor(private contactService: ContactService, private http: HttpClient) { }

  sendMessage() {
    if (!this.name || !this.email || !this.message) {
      alert("Please fill in all required fields!");
      return;
    }

    this.http.post('http://localhost:5001/api/contact', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    }).subscribe({
      next: () => {
        alert("✅ Message sent successfully!");
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      error: (err) => {
        alert("❌ Failed to send message. Please try again.");
        console.error(err);
      }
    });
  }

}
