import { Host, Component, h, State } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import { fetchApiData } from '../../common/api';
import type { MsData } from '../../../common/api-data';

@Component({
  tag: 'ms-char-card',
  styleUrl: 'ms-char-card.css',
  shadow: true,
})
export class AppText {
  @State() msData?: MsData;

  async connectedCallback() {
    fetchApiData('maplestory', (data) => { this.msData = data });
  }

  render() {
    return (
      <Host>
        <div class="ms-data--top">
          <app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
            SSS
          </app-text>
          <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
            Level&nbsp;{this.msData?.level}
          </app-text>
        </div>
        <app-image
          src={this.msData?.charImg}
          width={100}
          height={100}
          alt="maplestory character image"
        />
        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
          Job&nbsp;&lt;<app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
            <app-image
              src={this.msData?.jobIcon}
              width={20}
              height={20}
              alt={`${this.msData?.jobName} job icon`}
              imgStyle={{ transform: "translateY(0.2rem)" }}
            />
            &nbsp;{this.msData?.jobName}
          </app-text>&gt;
        </app-text>
        {
          this.msData?.attributes.map((item) => (
            <div class="ms-data--attr">
              <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XSmall}>
                {item.name}&nbsp;&lt;<app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.XSmall}>
                  {item.value}
                </app-text>&gt;
              </app-text>
            </div>
          ))
        }
      </Host>
    );
  }
}
