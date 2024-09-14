import { Component, State, h } from '@stencil/core';
import { BorderColor, TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { getAboutData, getWorkData } from '../../common/prismic';
import type { AboutDataModel, CaseStudyDataModel } from '../../common/types';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @State() aboutData?: AboutDataModel = undefined;
  @State() workData?: Array<CaseStudyDataModel> = [];

  async connectedCallback() {
    getAboutData((data: AboutDataModel) => {
      this.aboutData = data;
    });
    getWorkData((data: Array<CaseStudyDataModel>) => {
      this.workData = data;
    });
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
        <div class="home-content-left">
          <content-box color={BorderColor.Blue}>
            <app-text color={TextColor.Green} variant={TextVariant.Accent} size={TextSize.Medium}>
              <rich-text-renderer field={this.aboutData.intro_text} />
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Medium}>
              <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
            </app-text>
          </content-box>
          <div class="home-content-left-details">
            <div class="home-content-left-details-content">
              <content-box color={BorderColor.Cyan}>
                  <div class="home-about-misc-wrapper">
                    <div class="home-about-misc-banner">
                      <app-text color={TextColor.Blue} variant={TextVariant.Accent} size={TextSize.Medium}>
                        THIS IS ME!
                      </app-text>
                    </div>
                    <img src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
                    <div>
                      Still working on this site! Come back to check the final form later ✨(ㆆ◡ㆆ)✌️
                    </div>
                  </div>
              </content-box>
              <content-box color={BorderColor.Blue}>
                  <app-text color={TextColor.Yellow} variant={TextVariant.Accent} size={TextSize.Small}>
                    PLACES I WORKED AT
                  </app-text>
                  <div class="home-list-wrapper">
                    {
                      this.aboutData.experience.map((exp) => (
                        <div class="home-list-item">
                          <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.XSmall}>{ exp.duration }</app-text>
                          <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>{ exp.org }</app-text>
                        </div>
                      ))
                    }
                  </div>
              </content-box>
            </div>
            <div class="home-content-left-details-content">
              <content-box color={BorderColor.Blue}>
                  <app-text color={TextColor.Yellow} variant={TextVariant.Accent} size={TextSize.Small}>
                    SOME SKILLS OF MINE
                  </app-text>
                  <div class="home-list-wrapper">
                      <div class="home-list-item">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Web basics</app-text>
                        <app-text color={TextColor.Sub} size={TextSize.XXSmall}>{ this.aboutData.languages }</app-text>
                      </div>
                      <div class="home-list-item">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Frameworks & Libraries</app-text>
                        <app-text color={TextColor.Sub} size={TextSize.XXSmall}>{ this.aboutData.frameworks }</app-text>
                      </div>
                      <div class="home-list-item">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>Tools</app-text>
                        <app-text color={TextColor.Sub} size={TextSize.XXSmall}>{ this.aboutData.tools }</app-text>
                      </div>
                  </div>
              </content-box>
              <content-box color={BorderColor.Blue}>
                  <app-text color={TextColor.Yellow} variant={TextVariant.Accent} size={TextSize.Small}>
                    MY OTHER PRESENCES
                  </app-text>
                  <div class="home-links-wrapper">
                    {
                      this.aboutData.links.map((l) => (
                        <div class="home-link-item">
                          <app-text color={TextColor.Green} variant={TextVariant.Accent} size={TextSize.Small}>
                            <a href={l.link} target='_blank'>
                              {l.link_name}
                            </a>
                          </app-text>
                        </div>
                      ))
                    }
                  </div>
              </content-box>
            </div>
          </div>
        </div>
        <div class="home-content-right">
          <app-text color={TextColor.Yellow} variant={TextVariant.Accent} size={TextSize.Medium}>
            SOME STUFF I’VE WORKED ON
            <div class="home-work-wrapper">
              {
                this.workData.map((w) => (
                  <div class="home-work-item--wrapper">
                    <content-box>
                        <div class="home-work-item--content">
                          <app-text color={TextColor.Cyan} variant={TextVariant.Accent} size={TextSize.Small}>
                            {w.name}
                          </app-text>
                          <div class="home-work-item--image-wrapper">
                            <img src={w.cover.url} alt={w.cover.alt} />
                          </div>
                        </div>
                        <app-text color={TextColor.Magenta} variant={TextVariant.Accent} size={TextSize.XSmall}>
                          {w.tags.split(",").map((t) => `#${t.replace(/ /g,"_")} `)}
                        </app-text>
                    </content-box>
                  </div>
                ))
              }
            </div>
          </app-text>
        </div>
      </div>
    );
  }
}
