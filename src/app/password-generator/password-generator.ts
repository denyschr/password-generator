import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormsModule} from '@angular/forms'

const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|\\:;"\'<>,.?/';
const DEFAULT_PASSWORD_LENGTH = 12;


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordGenerator {
  protected readonly password = signal('');
  protected readonly passwordLength = signal(DEFAULT_PASSWORD_LENGTH);
  protected readonly includesLowercase = signal(true);
  protected readonly includesUppercase = signal(false);
  protected readonly includesDigits = signal(false);
  protected readonly includesSymbols = signal(false);
}
