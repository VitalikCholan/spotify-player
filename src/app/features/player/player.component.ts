import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  @Input() url: string | null = null;
  isPlaying = false;

  audio?: HTMLAudioElement;

  play() {
    if (!this.audio && this.url) {
      this.audio = new Audio(this.url);
      this.audio.onended = () => (this.isPlaying = false);
    }
    this.audio?.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio?.pause();
    this.isPlaying = false;
  }

  ngOnChanges() {
    if (this.audio) {
      this.audio.pause();
      this.audio = undefined;
      this.isPlaying = false;
    }
  }
}
