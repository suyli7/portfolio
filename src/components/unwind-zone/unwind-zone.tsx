import { Component, h, State, Listen } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { AssetImg } from '../../../common/api-data';
import { state, set } from '../../store';

@Component({
  tag: 'unwind-zone',
  styleUrl: 'unwind-zone.css',
})
export class UnwindZone {

  @State() colNum: number = 1;

  private setColNum() {
    const viewportWidth = window.innerWidth;
    const colNum = viewportWidth < 720 ? 1
      : viewportWidth < 1150 ? 2
        : viewportWidth < 1550 ? 3
          : 4;
    this.colNum = colNum;
  }

  @Listen('resize', { target: 'window' })
  handlerResize() {
    this.setColNum();
  }

  connectedCallback() {
    this.setColNum();
  }

  private getRandomImg = () => {
    const randomIndex = Math.floor(Math.random() * state.favImgs.length);
    if (randomIndex === state.favImgIndex) {
      this.getRandomImg();
    }
    set('favImgIndex', randomIndex)
  }

  render() {
    const randomImg: AssetImg = state.favImgs[state.favImgIndex];
    const boxMe = (
      <content-box gutter titleText="me">
        <app-image
          src={state.personal?.picture.url}
          alt={state.personal?.picture.alt}
          imgStyle={{ 'max-width': '200px', 'max-height': '200px' }}
        />
      </content-box>
    );

    const boxNote = (
      <content-box gutter titleText='note'>
        <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>
          <rich-text-renderer field={state.personal?.description} />
        </app-text>
      </content-box>
    );

    const boxLastPlayedSong = (
      <content-box gutter titleText="last played song">
        <last-played-song />
      </content-box>
    );

    const boxLastPlayedGames = (
      <content-box gutter titleText="recent steam activity">
        <div class="game-data--wrapper">
          {
            state.lastPlayedGames?.map((game) => (
              <a href={game.url} class="game-data--container" target="_blank">
                <app-image src={game.imgUrl} alt={`${game.name} steam library image`} imgStyle={{ border: '1px solid var(--color-border)', maxWidth: 460 }} />
                <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
                  {game.name}
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                  {game.lastPlayed}
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                  {game.totalPlaytime}
                </app-text>
              </a>
            ))
          }
        </div>
      </content-box>
    );

    const boxMapleStory = (
      <content-box gutter titleText="me on maplestory">
        <ms-char-card />
      </content-box>
    );

    const boxRandomImage = (
      <content-box
        gutter
        titleText="random image"
        helperText="from the collection of my favorite images I found on the internet or something swiped from my life"
      >
        <div class="random-image">
          <app-button secondary onClick={this.getRandomImg}>show me another</app-button>
          <app-image
            src={randomImg?.url}
            alt={randomImg?.description}
            imgStyle={{ 'object-fit': 'contain' }}
          />
          <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
            {randomImg?.description ? `<${randomImg.description}>` : ''}
          </app-text>
        </div>
      </content-box>
    );

    const renderColumns = () => {
      const components = [
        boxMe,
        boxNote,
        boxLastPlayedSong,
        boxLastPlayedGames,
        boxMapleStory,
        boxRandomImage
      ];
      const colNum = this.colNum;

      const columns = components.reduce((acc, component, index) => {
        const columnIndex = index % colNum;
        acc[columnIndex].push(component);
        return acc;
      }, Array.from({ length: colNum }, () => []));

      return (
        columns.map((column, columnIndex) => (
          <div key={columnIndex} class="unwind-zone--column">
            {column.map((component) => component)}
          </div>
        ))
      );
    }

    return (
      <app-layout>
        <div class="unwind-zone--wrapper">
          {renderColumns()}
        </div>
      </app-layout>
    )
  }
}
