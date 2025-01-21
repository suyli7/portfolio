import { Component, Prop, h } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';

@Component({
  tag: 'content-box',
  styleUrl: 'content-box.css',
  shadow: true,
})
export class ContentBox {
  @Prop() titleText?: string = '';
  @Prop() gutter?: boolean = false;
  @Prop() helperText?: string = null;

  render() {
    return (
      <fieldset class={{
        "content-box": true,
        "content-box--gutter": this.gutter
      }}>
        {
          this.titleText && (
            <legend>
              {/* <app-image src="/assets/icon_music_cd.png" width={20} height={20} alt="music cd icon" /> */}
              <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.Small}>
                {this.titleText}
              </app-text>
              {
                this.helperText && (
                  <div class="content-box--tooltip" data-text={this.helperText}>
                    <app-image src="/assets/icons/icon_question.png" width={12} height={12} alt={this.helperText} />
                  </div>
                )
              }
            </legend>
          )
        }
        <slot />
      </fieldset>
    );
  }
}
