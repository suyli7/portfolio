import { Host, Component, Prop, h } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import type {
  TextColorType,
  TextSizeType,
  TextVariantType
} from '../../common/types';

const getClassname = (
  color: TextColorType,
  variant: TextVariantType,
  size: TextSizeType,
  display: 'block' | 'inline'
): string =>
  `app-text--${color} app-text--${variant} app-text--${size} app-text--${display}`;

@Component({
  tag: 'app-text',
  styleUrl: 'app-text.css',
  shadow: true,
})
export class AppText {
  @Prop() variant?: TextVariantType = TextVariant.Body;
  @Prop() color?: TextColorType = TextColor.Sub;
  @Prop() size?: TextSizeType = TextSize.XSmall;
  @Prop() blockEl?: boolean = false;

  render() {
    return (
      <Host class={getClassname(this.color, this.variant, this.size, this.blockEl ? 'block' : 'inline')}>
        {
          (this.variant === TextVariant.Accent || this.variant === TextVariant.Title) && <span><slot /></span>
        }
        {
          this.variant === TextVariant.Body && <slot />
        }
      </Host>
    );
  }
}
