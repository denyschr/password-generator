import {Component} from '@angular/core'

import {PasswordGenerator} from './password-generator/password-generator'

@Component({
  selector: 'app-root',
  imports: [PasswordGenerator],
  templateUrl: './app.html'
})
export class App {}
