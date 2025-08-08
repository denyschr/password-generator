import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordGenerator {}
