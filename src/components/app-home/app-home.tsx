import { Component, State, h } from '@stencil/core';
import { fetchApiData } from '../../common/api';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import type { LastPlayedSong, LastPlayedGame } from '../../../common/api-data';
import state from '../../store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
// very inflated page because I need to overcome my laziness
export class AppHome {

  @State() lastPlayedSong?: LastPlayedSong;
  @State() lastPlayedGames?: Array<LastPlayedGame> = [];

  async setApiData() {
    fetchApiData('music', (data) => { this.lastPlayedSong = data });
    fetchApiData('steam', (data) => { this.lastPlayedGames = data });
  }

  async connectedCallback() {
    this.setApiData();
  }

  render() {
    return (
      <app-layout>
        <div class="home-wrapper">
          <div class="home-wrapper--section">
            <content-box titleText="intro">
              <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
                <rich-text-renderer field={state.about?.intro_text} />
              </app-text>
              <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Medium}>
                <rich-text-renderer class='intro-description' field={state.about?.intro_primary} />
              </app-text>
            </content-box>
            <content-box titleText="work experience">
              <div class="exp-items--wrapper">
                {
                  state.about?.experience.map((exp) => (
                    <div class="exp-item">
                      <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                        ({exp.duration})
                      </app-text>
                      <div>
                        <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Medium}>
                          {exp.org}
                        </app-text>
                        <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>
                          {exp.role}
                        </app-text>
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                          <rich-text-renderer field={exp.description} />
                        </app-text>
                      </div>
                    </div>
                  ))
                }
              </div>
            </content-box>
            <content-box titleText="some of my skills">
              <div class="skill-items--wrapper">
                <div class="skill-items--container">
                  <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                    web programming
                  </app-text>
                  {
                    <div>
                      {state.about?.languages.split(",").map((item) => (
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                          {item}
                        </app-text>
                      ))}
                    </div>
                  }
                </div>
                <div class="skill-items--container">
                  <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                    frameworks &amp; libraries
                  </app-text>
                  {
                    <div>
                      {state.about?.frameworks.split(",").map((item) => (
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                          {item}
                        </app-text>
                      ))}
                    </div>
                  }
                </div>
                <div class="skill-items--container">
                  <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                    tools
                  </app-text>
                  {
                    <div>
                      {state.about?.tools.split(",").map((item) => (
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                          {item}
                        </app-text>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </content-box>
          </div>
          <div class="home-wrapper--section">
            <content-box titleText="bulletin">
              <app-text color={TextColor.Magenta} variant={TextVariant.Title} size={TextSize.Small}>
                <rich-text-renderer field={state.about?.bulletin} />
              </app-text>
            </content-box>
            <content-box titleText="me">
              <app-image src={state.about?.profile_pic.url} alt={state.about?.profile_pic.alt} />
            </content-box>
            <content-box titleText="last played song">
              <a
                href={this.lastPlayedSong?.url}
                class="song-data--wrapper"
                target='_blank'
              >
                <div class="song-data--left">
                  <app-image
                    src={this.lastPlayedSong?.imgUrl}
                    alt={`${this.lastPlayedSong?.song} image`}
                    imgStyle={{ border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div class="song-data--right">
                  <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.XSmall}>
                    {this.lastPlayedSong?.song}
                  </app-text>
                  <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.XSmall}>
                    {this.lastPlayedSong?.artist}
                  </app-text>
                </div>
              </a>
              <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                ({this.lastPlayedSong?.time})
              </app-text>
            </content-box>
            <content-box titleText="recently played games on steam">
              <div class="game-data--wrapper">
                {
                  this.lastPlayedGames?.map((game) => (
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
            <content-box titleText="me on maplestory">
              <ms-char-card />
            </content-box>
          </div>
        </div>
      </app-layout>
    )
  }
}
