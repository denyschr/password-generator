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

  protected generate(): void {
    const charSets: string [] = [];
    if (this.includesLowercase()) {
      charSets.push(LOWERCASE_LETTERS);
    }
    if (this.includesUppercase()) {
      charSets.push(UPPERCASE_LETTERS);
    }
    if (this.includesDigits()) {
      charSets.push(DIGITS);
    }
    if (this.includesSymbols()) {
      charSets.push(SYMBOLS);
    }

    const allChars = charSets.join('');
    const remainingLength = this.passwordLength() - charSets.length;

    const getRandomChar = () => allChars[this.getRandomInt(allChars.length)];

    const randomChars = charSets
      .map((charSet) => charSet[this.getRandomInt(charSet.length)])
      .concat(Array.from({ length: remainingLength }, getRandomChar))
      .sort(() => 0.5 - Math.random())
      .join('');

    this.password.set(randomChars);
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
