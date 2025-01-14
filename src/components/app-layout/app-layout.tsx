import { Host, Component, State, h } from '@stencil/core';
// import { href } from 'stencil-router-v2';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import state from '../../store';

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
  tag: 'app-layout',
  styleUrl: 'app-layout.css',
})
export class AppLayout {
  @State() time: string = getTime();
  @State() timer: NodeJS.Timeout | null = null;

  connectedCallback() {
    this.timer = setInterval(() => {
      const updatedTime = getTime();
      this.time = updatedTime;
    }, 30000);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Host>
        <div class="app-layout--static-content">
          <app-button onClick={() => alert('I\'m not done with coding this part yet xD')} buttonStyle={{ width: "100%" }}>
            Su with no E<br /> ✨(ㆆ◡ㆆ)✌️
          </app-button>
          {/* <content-box titleText="site nav">
            <app-text variant={TextVariant.Title} size={TextSize.Medium}>
              <a {...href('/')}>home</a>
            </app-text>
            <br />
            <app-text variant={TextVariant.Title} size={TextSize.Medium}>
              <a {...href('/case-study')}>case studies</a>
            </app-text>
          </content-box> */}
          <content-box titleText="links">
            <div class="home-links-wrapper">
              {
                state.about?.links.map((l) => (
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
          <content-box titleText="my clock">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
              {this.time}
            </app-text>
          </content-box>
          <content-box titleText="site info">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
              This site was built with Stencil.js and Netlify functions.
            </app-text>
            <app-text style={{ 'margin-top': 'var(--space-xs)' }} color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
              Su Li &copy; 2025
            </app-text>
          </content-box>
        </div>
        <div class="app-layout--page-content">
          <slot />
        </div>
      </Host>
    );
  }
}
