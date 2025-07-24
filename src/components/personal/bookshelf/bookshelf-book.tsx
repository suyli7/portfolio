import { Component, h, Prop, Host } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../../common/namespaces';
import type { Book } from '../../../../common/api-data';

@Component({
    tag: 'bookshelf-book',
    styleUrl: 'bookshelf-book.css',
    shadow: true
})
export class BookshelfBook {
    @Prop() book: Book = {
        name: '',
        author: '',
        imgUrl: '',
        bookUrl: ''
    };
    render() {
        return (
            <Host>
                <a href={this.book.bookUrl} target="_blank" class="bookshelf-book">
                    <app-image width="auto" src={this.book.imgUrl} alt={`${this.book.name} book cover`} />
                    <div class="bookshelf-book__info">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.XXSmall}>
                            {this.book.name}
                        </app-text>
                        <app-text color={TextColor.Sub} variant={TextVariant.Title} size={TextSize.XXSmall}>
                            {this.book.author}
                        </app-text>
                    </div>
                </a>
            </Host>
        )
    }
}
