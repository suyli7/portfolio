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
  tech_skills_intro: string;
  languages: string;
  tools: string;
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
            <button class="special-button">
              <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Medium}>
                hello HELLO? ✨(ㆆ◡ㆆ)✌️
              </app-text>
            </button>
            <content-box color={BorderColor.Blue}>
              <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.Medium}>
                <rich-text-renderer class='intro-description' field={this.aboutData.intro_primary} />
              </app-text>
            </content-box>
            <content-box color={BorderColor.Cyan}>
              <img src={this.aboutData.profile_pic.url} alt={this.aboutData.profile_pic.alt} />
            </content-box>
          </div>
        </div>
        <div>
          <content-box color={BorderColor.Blue}>
              <app-text color={TextColor.Green} variant={TextVariant.Accent} size={TextSize.Medium}>
                <rich-text-renderer field={this.aboutData.intro_text} />
              </app-text>
          </content-box>
        </div>
      </div>
    );
  }
}
