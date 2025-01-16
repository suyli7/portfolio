import { Host, Component, h } from '@stencil/core';
import { href } from 'stencil-router-v2';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import state from '../../store';

const NAV_CONFIG: Array<{ name: string; route: string; icon: string }> = [
  { name: 'home', route: '/', icon: 'icon_computer' },
  { name: 'unwind zone', route: '/unwind-zone', icon: 'icon_person' }
]

@Component({
  tag: 'app-layout',
  styleUrl: 'app-layout.css',
})
export class AppLayout {
  render() {
    return (
      <Host>
        <div class="app-layout--static-content">
          <app-button onClick={() => alert('I\'m not done with coding this part yet xD')} buttonStyle={{ width: "100%" }}>
            Su with no E<br /> ✨(ㆆ◡ㆆ)✌️
          </app-button>
          <content-box titleText="nav">
            <div class="nav-items--wrapper">
              {
                NAV_CONFIG.map((item) => (
                  <a {...href(item.route)} class="nav-items--item-container">
                    <app-image width={40} height={40} src={`/assets/icons/${item.icon}.png`} />
                    <app-text variant={TextVariant.Body} size={TextSize.XXSmall}>
                      {item.name}
                    </app-text>
                  </a>
                ))
              }
            </div>
          </content-box>
          <content-box titleText='bulletin'>
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
              <rich-text-renderer field={state.about?.bulletin} />
            </app-text>
          </content-box>
          <content-box titleText="links">
            {
              state.about?.links.map((l) => (
                <app-text variant={TextVariant.Title} size={TextSize.Medium} blockEl>
                  <a href={l.link} target="_blank">
                    {l.link_name}
                  </a>
                </app-text>
              ))
            }
          </content-box>
          <content-box titleText="site info">
            <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
              This site was built with Stencil.js, Netlify functions and Prismic.
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
