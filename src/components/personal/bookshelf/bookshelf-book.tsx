import { Component, h, Prop, Host } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../../common/namespaces';
import type { Book } from '../../../../common/api-data';

@Component({
    tag: 'bookshelf-book',
    styleUrl: 'bookshelf-book.css',
    shadow: true
})
export class BookshelfBook {
    @Prop() bookWidth: number;
    @Prop() book: Book = {
        title: '',
        author: '',
        imgUrl: '',
        bookUrl: ''
    };
    render() {
        return (
            <Host>
                <a href={this.book.bookUrl} target="_blank" class="bookshelf-book" style={{ width: `${this.bookWidth}px` }}>
                    <app-image src={this.book.imgUrl} alt={`${this.book.title} book cover`} />
                    <div class="bookshelf-book__info">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.XXSmall}>
                            {this.book.title}
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
