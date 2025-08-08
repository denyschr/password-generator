import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormsModule} from '@angular/forms'

const DEFAULT_PASSWORD_LENGTH = 12;

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.html',
  imports: [
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordGenerator {
  protected readonly passwordLength = signal(DEFAULT_PASSWORD_LENGTH);
}
