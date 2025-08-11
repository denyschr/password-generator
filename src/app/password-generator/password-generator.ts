import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormsModule} from '@angular/forms'

import {
  PasswordStrengthMeter
} from '../password-strength-meter/password-strength-meter'
import {
  CopyToClipboardDirective
} from '../copy-to-clipboard/copy-to-clipboard-directive'

type CharSet = {
  id: string;
  title: string;
  chars: string;
  active: boolean;
}

const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|\\:;"\'<>,.?/';
const DEFAULT_PASSWORD_LENGTH = 12;

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.html',
  imports: [FormsModule, PasswordStrengthMeter, CopyToClipboardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordGenerator {
  protected readonly password = signal('');
  protected readonly passwordLength = signal(DEFAULT_PASSWORD_LENGTH);
  protected readonly charSets = signal<CharSet[]>([
    { id: 'includesLowercase', title: 'Lowercase (a-z)', chars: LOWERCASE_LETTERS, active: true },
    { id: 'includesUppercase', title: 'Uppercase (A-Z)', chars: UPPERCASE_LETTERS, active: false },
    { id: 'includesDigits', title: 'Digits (0-9)', chars: DIGITS, active: false },
    { id: 'includesSymbols', title: 'Symbols (!-$^+)', chars: SYMBOLS, active: false },
  ]);
  protected readonly error = signal(false);

  protected generate(): void {
    this.error.set(false);

    const activeCharSets = this.charSets().filter((charSet) => charSet.active).map((charSet) => charSet.chars);
    if (activeCharSets.length === 0) {
      return this.error.set(true);
    }
    const allChars = activeCharSets.join('');
    const remainingLength = this.passwordLength() - activeCharSets.length;

    const getRandomChar = () => allChars[this.getRandomInt(allChars.length)];
    const randomChars = activeCharSets
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
