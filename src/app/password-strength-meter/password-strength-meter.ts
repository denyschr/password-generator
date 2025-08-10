import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core'

type PasswordStrength = {
  percentage: number;
  label: string;
  background: string;
};

const PASSWORD_MIN_LENGTH = 12;

@Component({
  selector: 'app-password-strength-meter',
  templateUrl: './password-strength-meter.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordStrengthMeter {
  public readonly password = input.required<string>();

  protected readonly strength = computed<PasswordStrength>(() => {
    const password = this.password();
    const maxScore = 5;
    const unit = 100 / maxScore;
    let score = 0;

    const hasMinimumLength = password.length >= PASSWORD_MIN_LENGTH;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9\s]/.test(password);

    [hasMinimumLength, hasLowercase, hasUppercase, hasDigit, hasSymbol]
      .forEach((flag) => score += +flag);

    const percentage = score * unit;
    let label = '';
    let background = '';

    if (percentage <= 20) {
      label = 'Very Weak';
      background = 'bg-black';
    } else if (percentage <= 40) {
      label = 'Weak';
      background = 'bg-danger';
    } else if (percentage <= 60) {
      label = 'Medium';
      background = 'bg-warning';
    } else if (percentage <= 80) {
      label = 'Good';
      background = 'bg-info';
    } else {
      label = 'Strong';
      background = 'bg-success';
    }

    return { percentage, label, background };
  });
}
