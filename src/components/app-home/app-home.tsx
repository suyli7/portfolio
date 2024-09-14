import { Component, State, h } from '@stencil/core';
import type { RichTextField, ImageField } from '@prismicio/client';
import { BorderColor, TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { getAboutData } from '../../common/prismic';

interface AboutDataModel {
  intro_primary: RichTextField;
  intro_secondary: RichTextField;
  intro_text: RichTextField;
  profile_pic: ImageField;
  connect_header: string;
  experience: Array<{
    org: string;
    role: string;
    duration: string;
    description: RichTextField
  }>;
  links: Array<{
    link_name: string;
    link: string;
  }>;
  languages: string;
  tools: string;
  frameworks: string;
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {

  @State() aboutData?: AboutDataModel = undefined;

  async connectedCallback() {
    getAboutData((data: AboutDataModel) => {
      this.aboutData = data;
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
                      bunch of random tags and stuff here
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
              <content-box color={BorderColor.Cyan}>
                  <app-text color={TextColor.Magenta} variant={TextVariant.Accent} size={TextSize.Small}>
                    Just some random stuff
                  </app-text>
              </content-box>
            </div>
          </div>
        </div>
        <div class="home-content-right">
        </div>
      </div>
    );
  }
}
