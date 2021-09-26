import { Component, OnInit } from '@angular/core';
import { TokenResponse } from 'src/app/shared/models/token-response';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user)
      this.userService
        .loginUser(JSON.parse(user))
        .subscribe((token: TokenResponse) => {
          this.userService.setAuthorizationToken(token.token);
          this.userService.isAuthorized = true;
        });
  }

}
