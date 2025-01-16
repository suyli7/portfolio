import { Component, h } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import state from '../../store';

@Component({
  tag: 'unwind-zone',
  styleUrl: 'unwind-zone.css',
})
export class UnwindZone {
  render() {
    return (
      <app-layout>
        <div class="unwind-zone--wrapper">
          <content-box gutter titleText="me">
            <app-image
              src={state.personal?.picture.url}
              alt={state.personal?.picture.alt}
              imgStyle={{ 'max-width': '200px', 'max-height': '200px' }}
            />
          </content-box>
          <content-box gutter titleText="last played song">
            <last-played-song />
          </content-box>
          <content-box gutter titleText='welcome note'>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>
              <rich-text-renderer field={state.personal?.description} />
            </app-text>
          </content-box>
          <content-box gutter titleText="me on maplestory">
            <ms-char-card />
          </content-box>
          <content-box gutter titleText="recently played">
            <div class="game-data--wrapper">
              {
                state.lastPlayedGames?.map((game) => (
                  <a href={game.url} class="game-data--container" target="_blank">
                    <app-image src={game.imgUrl} alt={`${game.name} steam library image`} imgStyle={{ border: '1px solid var(--color-border)', maxWidth: 460 }} />
                    <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
                      {game.name}
                    </app-text>
                    <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                      {game.playtimeTwoWeeks}&nbsp;(past two weeks)
                    </app-text>
                  </a>
                ))
              }
            </div>
          </content-box>
        </div>
      </app-layout>
    )
  }
}
