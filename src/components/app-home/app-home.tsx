import { Component, State, h } from '@stencil/core';
import { fetchApiData } from '../../common/api';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import type { AboutDataModel, CaseStudyDataModel, LastPlayedSong, MsData } from '../../../common/api-data';

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
  shadow: true,
})
export class AppHome {

  @State() aboutData?: AboutDataModel = undefined;
  @State() workData?: Array<CaseStudyDataModel> = [];
  @State() time: string = getTime();
  @State() msData?: MsData;
  @State() lastPlayedSong?: LastPlayedSong;

  async setApiData() {
    fetchApiData('maplestory', (data) => { this.msData = data });
    fetchApiData('prismic/about', (data) => { this.aboutData = data });
    fetchApiData('music', (data) => { this.lastPlayedSong = data });
  }

  async connectedCallback() {
    this.setApiData();

    setInterval(() => {
      const updatedTime = getTime();
      this.time = updatedTime;
    }, 60000);
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
        {/* left: essential info */}
        <div class="home-wrapper--section home-wrapper--section--left">
          <content-box title="me.jpg">
            <app-image src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
          </content-box>
          <content-box title="footprints.txt">
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
          <content-box title="site_info.txt">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              This site was built with Stencil.js
            </app-text>
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              Su Li &copy; 2025
            </app-text>
          </content-box>
        </div>
        {/* main: details */}
        <div class="home-wrapper--section">
          <content-box title="intro.txt">
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Large}>
              <rich-text-renderer field={this.aboutData.intro_text} />
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Medium}>
              <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
            </app-text>
          </content-box>
        </div>
        {/* right: hobby/misc. */}
        <div class="home-wrapper--section">
          <content-box title="annoucement.txt">
            <app-text color={TextColor.Green} variant={TextVariant.Title} size={TextSize.Medium}>
              This site is still under constructions. More detailed work info coming soon!
            </app-text>
          </content-box>
          <content-box title="my_timezone.exe">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
              {this.time}
            </app-text>
          </content-box>
          <content-box title="last_played_song.exe">
            <div class="song-data--wrapper">
              <div class="song-data--left">
                <app-image width={60} height={60} src={this.lastPlayedSong?.imgUrl} alt={`${this.lastPlayedSong?.song} image`} />
              </div>
              <div class="song-data--right">
                <app-horizontal-scroll>
                  <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                    {this.lastPlayedSong?.song}
                  </app-text>
                </app-horizontal-scroll>
                <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Small}>
                  {this.lastPlayedSong?.artist}
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                  ({this.lastPlayedSong?.time})
                </app-text>
              </div>
            </div>
          </content-box>
          <content-box title="maplestory_main.exe">
            <div class="ms-data--wrapper">
              <div class="ms-data--left">
                <app-image src={this.msData?.charImg} alt="maplestory character image" />
              </div>
              <div class="ms-data--right">
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  <app-image src={this.msData?.jobIcon} width={20} height={20} alt={`${this.msData?.jobName} icon`} title={this.msData?.jobName} />
                  &nbsp;in &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    Kronos
                  </app-text>&gt;
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  Rank &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    {this.msData?.rank}
                  </app-text>&gt;
                </app-text>
                <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                  Level &lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
                    {this.msData?.level}
                  </app-text>&gt;
                </app-text>
              </div>
            </div>
          </content-box>
        </div>

      </div>
    )
  }
}
