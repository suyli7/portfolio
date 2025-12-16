import { Component, h, State, Element } from '@stencil/core';
import { TextColor, TextSize, TextVariant } from '../../../common/namespaces';
import { SHELF_TAGS_MAP, TAG_ALL } from '../../../../common/book-tags';
import type { Book } from '../../../../common/api-data';
import { state } from '../../../store';

const CONTENT_BOX_PADDING_VAL = 40;
const GAP_VAL = 8;
const BOOK_BORDER_SIZE = 2;
const RANGES = {
    375: 3,
    420: 4,
    520: 5,
    620: 6,
    720: 7,
    820: 8,
    980: 7,
    1060: 5,
    1200: 6,
};

const getPerRowCount = (browserWidth: number) => {
    for (const [maxWidth, count] of Object.entries(RANGES)) {
        if (browserWidth <= Number(maxWidth)) {
            return count;
        }
    }
    return 7;
}

@Component({
    tag: 'book-shelf',
    styleUrl: 'bookshelf.css',
    shadow: true
})
export class BookShelf {
    @Element() el: HTMLElement;
    @State() currentTag?: string = TAG_ALL;
    @State() favBooks: Book[] = state.books?.favorites || [];
    @State() bookWidth: number = 0;

    private resizeObserver: ResizeObserver;

    private handleResize = () => {
        const containerWidth = this.el.getBoundingClientRect().width;
        const countPerRow = getPerRowCount(window.innerWidth);
        const adjustedContainerWidth = containerWidth - CONTENT_BOX_PADDING_VAL - ((countPerRow - 1) * GAP_VAL) - (BOOK_BORDER_SIZE * countPerRow);
        const newBookWidth = Math.floor(adjustedContainerWidth / countPerRow);

        if (this.bookWidth !== newBookWidth) {
            this.bookWidth = newBookWidth;
        }
    };

    componentDidLoad() {
        this.resizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });

        this.resizeObserver.observe(this.el);

        this.handleResize();
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    private updateTag = (tag: string) => {
        this.currentTag = tag;
        if (tag === TAG_ALL) {
            this.favBooks = state.books?.favorites || [];
            return;
        }
        this.favBooks = state.books?.favorites.filter((book) => book.tags?.includes(SHELF_TAGS_MAP[tag]));
    };

    render() {
        return (
            <content-box gutter titleText="bookshelf">
                <div class="bookshelf__content">
                    <div class="bookshelf_about">
                        <app-text color={TextColor.Cyan} variant={TextVariant.Title} size={TextSize.Small}>
                            &#129299; Reading style summary
                        </app-text>
                        <app-text color={TextColor.Sub} variant={TextVariant.Body} size={TextSize.Small}>
                            {state.books?.about}
                        </app-text>
                    </div>
                    <bookshelf-section sectionTitle="&#128214; Currently reading" bookWidth={this.bookWidth} books={state.books?.current} />
                    <bookshelf-section sectionTitle="&#128218; Recently read" bookWidth={this.bookWidth} books={state.books?.recent} />
                    <bookshelf-section sectionTitle="&#8987; Next 5 in TBR" bookWidth={this.bookWidth} books={state.books?.toRead} />
                    <bookshelf-section sectionTitle="&#127775; Favorites" bookWidth={this.bookWidth} books={this.favBooks}>
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
