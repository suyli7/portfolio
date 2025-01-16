import { Host, Component, h } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import state from '../../store';

@Component({
  tag: 'ms-char-card',
  styleUrl: 'ms-char-card.css',
  shadow: true,
})
export class MsCharCard {
  render() {
    return (
      <Host>
        <div class="ms-data--top">
          <app-text color={TextColor.Yellow} variant={TextVariant.Title} size={TextSize.Medium}>
            SSS
          </app-text>
          <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
            Level&nbsp;{state.msData?.level}
          </app-text>
        </div>
        <app-image
          src={state.msData?.charImg}
          width={100}
          height={100}
          alt="maplestory character image"
        />
        <div class="ms-data--job">
          <app-image
            src={state.msData?.jobIcon}
            width={16}
            height={16}
            alt={`${state.msData?.jobName} job icon`}
          />
          <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.XSmall}>
            {state.msData?.jobName}
          </app-text>
        </div>
        {
          state.msData?.attributes.map((item) => (
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
