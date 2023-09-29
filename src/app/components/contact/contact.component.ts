import { Component } from '@angular/core';
import { faTiktok, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  faFacebook = faFacebook;
  faTiktok = faTiktok;
  faInstagram = faInstagram;
}
