import { Component, h } from '@stencil/core';
import { state } from '../../../store';

@Component({
    tag: 'book-shelf',
    styleUrl: 'bookshelf.css',
    shadow: true
})
export class BookShelf {
    render() {
        return (
            <content-box gutter titleText="bookshelf">
                <div class="bookshelf__content">
                    <div class="bookshelf__first-row">
                        <bookshelf-section halfSize sectionTitle="in progress" books={state.books?.current} />
                        <bookshelf-section halfSize sectionTitle="recently finished" books={state.books?.recent} />
                    </div>
                    <bookshelf-section sectionTitle="favorites" books={state.books?.favorites} />
                </div>
            </content-box>
        )
    }
}
