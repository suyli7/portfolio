import { Host, Component, h } from '@stencil/core';
import { href } from 'stencil-router-v2';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import state from '../../store';

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
            <app-text variant={TextVariant.Title} size={TextSize.Medium} blockEl>
              <a {...href('/')}>
                home
              </a>
            </app-text>
            <app-text variant={TextVariant.Title} size={TextSize.Medium} blockEl>
              <a {...href('/unwind-zone')}>
                unwind zone
              </a>
            </app-text>
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
