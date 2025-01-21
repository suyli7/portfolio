import { Component, h, Host } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { state } from '../../store';

@Component({
  tag: 'last-played-song',
  styleUrl: 'last-played-song.css',
  shadow: true
})
export class LastPlayedSong {
  render() {
    return (
      <Host>
        <a
          href={state.lastPlayedSong?.url}
          class="song-data--wrapper"
          target='_blank'
        >
          <div class="song-data--left">
            <app-image
              src={state.lastPlayedSong?.imgUrl}
              alt={`${state.lastPlayedSong?.song} image`}
              imgStyle={{ border: '1px solid var(--color-border)' }}
            />
          </div>
          <div class="song-data--right">
            <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
              {state.lastPlayedSong?.song}
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.XXSmall}>
              {state.lastPlayedSong?.artist}
            </app-text>
          </div>
        </a>
        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
          ({state.lastPlayedSong?.time})
        </app-text>
      </Host>
    )
  }
}
