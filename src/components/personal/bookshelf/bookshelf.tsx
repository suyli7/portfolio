import { Component, h, State, Element } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../../common/namespaces';
import { SHELF_TAGS_MAP, TAG_ALL } from '../../../../common/book-tags';
import type { Book } from '../../../../common/api-data';
import { state } from '../../../store';

@Component({
    tag: 'book-shelf',
    styleUrl: 'bookshelf.css',
    shadow: true
})
export class BookShelf {
    @Element() el: HTMLElement;
    @State() currentTag?: string = TAG_ALL;
    @State() favBooks: Book[] = state.books?.favorites || [];

    private updateTag = (tag: string) => {
        this.currentTag = tag;
        if (tag === TAG_ALL) {
            this.favBooks = state.books?.favorites || [];
            return;
        }
        this.favBooks = state.books?.favorites.filter((book) => book.tags?.includes(SHELF_TAGS_MAP[tag]));
    };

    render() {
        console.log(this.favBooks);
        return (
            <content-box gutter titleText="reading_tracker.exe">
                <div class="bookshelf__content">
                    <div class="bookshelf_about">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                            🤓 reading style summary
                        </app-text>
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                            {state.books?.about}
                        </app-text>
                    </div>
                    <bookshelf-section sectionTitle="📖 currently reading" books={state.books?.current} />
                    <bookshelf-section sectionTitle="📚 recently read" books={state.books?.recent} />
                    <bookshelf-section sectionTitle={`⌛ to-read queue (top ${state.books?.toRead.length} of ${state.books?.toReadCount || 'unknown'})`} books={state.books?.toRead} />
                    <bookshelf-section sectionTitle="🌟 books I liked (sorted by publish year)" books={this.favBooks}>
                        <div class="bookshelf__buttons">
                            {
                                Object.keys(SHELF_TAGS_MAP).map((tag) => (
                                    <app-button secondary={this.currentTag !== tag} small onClick={() => this.updateTag(tag)}>
                                        {tag}
                                    </app-button>
                                ))
                            }
                        </div>
                    </bookshelf-section>
                </div>
            </content-box>
        )
    }
}
