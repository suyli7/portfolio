import { Component, State, h } from '@stencil/core';
import { fetchApiData } from '../../common/api';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import type { AboutDataModel, CaseStudyDataModel, LastPlayedSong, LastPlayedGame } from '../../../common/api-data';

const getTime = () => new Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
  timeZoneName: "short"
}).format();

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
// very inflated page because I need to overcome my laziness
export class AppHome {

  @State() aboutData?: AboutDataModel = undefined;
  @State() workData?: Array<CaseStudyDataModel> = [];
  @State() time: string = getTime();
  @State() lastPlayedSong?: LastPlayedSong;
  @State() lastPlayedGames?: Array<LastPlayedGame> = [];

  async setApiData() {
    fetchApiData('prismic/about', (data) => { this.aboutData = data });
    fetchApiData('music', (data) => { this.lastPlayedSong = data });
    fetchApiData('steam', (data) => { this.lastPlayedGames = data });
  }

  async connectedCallback() {
    this.setApiData();

    setInterval(() => {
      const updatedTime = getTime();
      this.time = updatedTime;
    }, 30000);
  }

  render() {
    if (!this.aboutData) {
      return (
        <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
          Getting ready...
        </app-text>
      )
    }

    return (
      <div class="home-wrapper">
        <div class="home-wrapper--section home-wrapper--section--left">
          <app-button onClick={() => alert('I\'m not done with coding this part yet xD')} buttonStyle={{ width: "100%" }}>
            Su with no E ✨(ㆆ◡ㆆ)✌️
          </app-button>
          <content-box titleText="cotton candy bear and me">
            <app-image src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
          </content-box>
          <content-box titleText="links">
            <div class="home-links-wrapper">
              {
                this.aboutData.links.map((l) => (
                  <div class="home-link-item">
                    <app-text variant={TextVariant.Title} size={TextSize.Medium}>
                      <a href={l.link} target='_blank'>
                        {l.link_name}
                      </a>
                    </app-text>
                  </div>
                ))
              }
            </div>
          </content-box>
          <content-box titleText="site info">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              This site was built with Stencil.js
            </app-text>
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              Su Li &copy; 2025
            </app-text>
          </content-box>
        </div>
        <div class="home-wrapper--section">
          <content-box titleText="intro">
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
              <rich-text-renderer field={this.aboutData.intro_text} />
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Medium}>
              <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
            </app-text>
          </content-box>
          <content-box titleText="work experience">
            <div class="exp-items--wrapper">
              {
                this.aboutData.experience.map((exp) => (
                  <div class="exp-item">
                    <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Medium}>
                      {exp.org}
                    </app-text>
                    <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.Medium}>
                      {exp.role}
                    </app-text>
                    <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                      ({exp.duration})
                    </app-text>
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
                    {this.aboutData.languages.split(",").map((item) => (
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
                    {this.aboutData.frameworks.split(",").map((item) => (
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
                    {this.aboutData.tools.split(",").map((item) => (
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
              <rich-text-renderer field={this.aboutData.bulletin} />
            </app-text>
          </content-box>
          <content-box titleText="my clock">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              {this.time}
            </app-text>
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
                <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
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
          <content-box titleText="recently played on steam">
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
    )
  }
}
