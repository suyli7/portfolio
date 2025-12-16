import { Component, h, Prop } from '@stencil/core';
import {
    TextColor,
    TextSize,
    TextVariant
} from '../../common/namespaces';
import type { LastPlayedGame } from '../../../common/api-data';

@Component({
    tag: 'game-card',
    styleUrl: 'game-card.css',
    // shadow: true,
})
export class GameCard {
    @Prop() game: LastPlayedGame = {
        title: '',
        totalPlaytime: '',
        lastPlayed: '',
        imgUrl: '',
        url: '',
        platform: ''
    };

    render() {
        return (
            // <Host>
            <div class="game__container">
                <div class="game__tag">
                    {this.game.platform}
                </div>
                <a href={this.game.url} target="_blank" class="game__image">
                    <app-image src={this.game.imgUrl} alt={`cover image for game: ${this.game.title}`} imgStyle={{
                        border: '1px solid #969696',
                        borderStyle: 'inset',
                        maxWidth: '140px'
                    }} />
                </a>
                <div class="game__info">
                    <app-text color={TextColor.Cyan} variant={TextVariant.Body} size={TextSize.XSmall}>
                        {this.game.title}
                    </app-text>
                    <app-text color={TextColor.Main} variant={TextVariant.Body} size={TextSize.XXSmall}>
                        {this.game.lastPlayed}
                    </app-text>
                    <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                        total: {this.game.totalPlaytime}
                    </app-text>
                </div>
            </div>
            // </Host>
        );
    }
}
