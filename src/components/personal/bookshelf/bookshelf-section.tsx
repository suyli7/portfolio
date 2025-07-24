import { Component, h, Prop, Host } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../../common/namespaces';
import type { Book } from '../../../../common/api-data';

@Component({
    tag: 'bookshelf-section',
    styleUrl: 'bookshelf-section.css',
    shadow: true
})
export class BookshelfSection {
    @Prop() books: Book[] = [];
    @Prop() sectionTitle: string = '';
    @Prop() halfSize: boolean = false;


    render() {
        if (!this.books?.length) {
            return null;
        }

        return (
            <Host>
                <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.Small}>
                    {this.sectionTitle}
                </app-text>
                <div class={{
                    "bookshelf-section__list": true,
                    "half-size": this.halfSize
                }}>
                    {
                        this.books.map((book) => (
                            <bookshelf-book book={book} />
                        ))
                    }
                </div>
            </Host>
        )
    }
}
