import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Clipboard {
  public async copy(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text.trim());
      return true;
    } catch (_) {
      return false;
    }
  }
}
