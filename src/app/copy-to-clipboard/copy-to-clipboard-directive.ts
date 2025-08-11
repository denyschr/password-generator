import {Directive, inject, input, OnDestroy, signal} from '@angular/core'
import {Clipboard} from './clipboard'

@Directive({
  selector: '[appCopyToClipboard]',
  host: {
    '(click)': 'copy()'
  },
  exportAs: 'appClipboard'
})
export class CopyToClipboardDirective implements OnDestroy {
  private readonly clipboard = inject(Clipboard);

  private timeoutId?: number;
  private readonly _copied = signal(false);
  public readonly copied = this._copied.asReadonly();

  public readonly text = input.required<string>({ alias: 'appCopyToClipboard' });

  protected copy(): void {
    this.clipboard.copy(this.text()).then(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this._copied.set(true);
      this.timeoutId = setTimeout(() => this._copied.set(false), 1500);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
}
