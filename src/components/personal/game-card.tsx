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
        name: '',
        totalPlaytime: '',
        lastPlayed: '',
        imgUrl: '',
        env: ''
    };

    render() {
        return (
            // <Host>
            <div class="game__container">
                <div class="game__tag">
                    {this.game.env}
                </div>
                <div class="game__image">
                    <app-image src={this.game.imgUrl} alt={`cover image for game: ${this.game.name}`} imgStyle={{
                        border: '1px solid #969696',
                        borderStyle: 'groove'
                    }} />
                </div>
                <div class="game__info">
                    <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.XXSmall}>
                        {this.game.lastPlayed}
                    </app-text>
                </div>
            </div>
            // </Host>
        );
    }
}
