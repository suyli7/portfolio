import { Component, h, State, Listen } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { AssetImg } from '../../../common/api-data';
import { state, set } from '../../store';

@Component({
  tag: 'app-personal',
  styleUrl: 'personal.css',
})
export class Personal {

  @State() colNum: number = 1;

  private setColNum() {
    const viewportWidth = window.innerWidth;
    const colNum = viewportWidth < 1200 ? 1
      : 2
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
      <content-box gutter titleText="me.jpg">
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


    const boxBooks = (
      <book-shelf />
    );

    const boxLastPlayedSong = (
      <content-box gutter titleText="listening to">
        <last-played-song />
      </content-box>
    );

    const boxLastPlayedGames = (
      <content-box gutter titleText="recent games">
        <div class="game-data--wrapper">
          {
            state.lastPlayedGames?.map((game) => (
              <game-card game={game} />
            ))
          }
        </div>
      </content-box>
    );

    const boxMapleStory = (
      <content-box gutter titleText="maplestory">
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

    const getOrderedColumns = (colNum: number) => {
      switch (colNum) {
        case 2:
          return [
            [
              boxMe,
              boxLastPlayedSong,
              boxMapleStory,
              boxRandomImage,
            ],
            [
              boxNote,
              boxLastPlayedGames,
              boxBooks,
            ],
          ];
        default:
          return [
            [
              boxMe,
              boxNote,
              boxLastPlayedSong,
              boxLastPlayedGames,
              boxBooks,
              boxMapleStory,
              boxRandomImage
            ]
          ];
      }
    }

    const renderColumns = () => {
      const columns = getOrderedColumns(this.colNum);

      return (
        columns.map((column, columnIndex) => (
          <div key={columnIndex} class="personal--column">
            {column.map((component) => component)}
          </div>
        ))
      );
    }

    return (
      <app-layout>
        <div class="personal--wrapper">
          {renderColumns()}
        </div>
      </app-layout>
    )
  }
}
