import { Component, State, h } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../common/namespaces';
import { state } from '../../store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
// very inflated page because I need to overcome my laziness
export class AppHome {

  @State() showMoreInfo?: boolean = false;
  moreInfoEl!: HTMLElement;

  private handleShowMoreOnClick = () => {
    if (this.showMoreInfo) {
      this.moreInfoEl.style.height = '0';
      this.moreInfoEl.style.opacity = '0';
      this.moreInfoEl.classList.remove('intro-secondary--expanded')
    } else {
      const fullHeight = this.moreInfoEl.scrollHeight;
      this.moreInfoEl.style.height = `${fullHeight}px`;
      this.moreInfoEl.style.opacity = '1';
      this.moreInfoEl.classList.add('intro-secondary--expanded');
    }
    this.showMoreInfo = !this.showMoreInfo;
  }

  render() {
    return (
      <app-layout>
        <div class="home-wrapper">
          <content-box titleText="intro">
            <app-text color={TextColor.Main} variant={TextVariant.Accent} size={TextSize.XLarge}>
              <rich-text-renderer field={state.about?.intro_text} />
            </app-text>
            <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.Large}>
              <rich-text-renderer class='intro-description' field={state.about?.intro_primary} />
            </app-text>
            <app-button secondary onClick={this.handleShowMoreOnClick}>
              {
                this.showMoreInfo ? "Show less" : "What? You want to know more?"
              }
            </app-button>
            <div
              class="intro-secondary"
              ref={(el) => (this.moreInfoEl = el as HTMLElement)}
            >
              <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                <rich-text-renderer field={state.about?.intro_secondary} />
              </app-text>
            </div>
          </content-box>
          <content-box titleText="experience">
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
      </app-layout>
    )
  }
}
