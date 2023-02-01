import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';


export class Home extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
      <h1 class="main-title visually-hidden">Home</h1>
        <section class="products-wrapper">
            <aside class="sidebar">
                <div class="filter-utilities">
                    <button class="filter-button filter-reset">Reset Filters</button>
                    <button class="filter-button filter-copy">Copy Link</button>
                </div>
                <div class="filter-category">
                    <h3 class="filter-title">Category</h3>
                    <div class="filter-category-list">
                    </div>
                </div>
                <div class="filter-brand">
                    <h3 class="filter-title">Brand</h3>
                    <div class="filter-brand-list">
                    </div>
                </div>
                <div class="filter-price">
                    <h3 class="filter-title">Price</h3>
                    <div class="price-range">
                        <div class="price-input">
                          <div class="field">
                            <input type="number" class="input-min" value="10" readonly>
                          </div>
                          <div class="field">
                            <input type="number" class="input-max" value="1749" readonly>
                          </div>
                        </div>
                        <div class="slider">
                          <div class="progress"></div>
                        </div>
                        <div class="range-input">
                          <input type="range" class="range-min" min="10" max="1749" value="10" step="1">
                          <input type="range" class="range-max" min="10" max="1749" value="1749" step="1">
                        </div>
                  </div>                    
                </div>
                <div class="filter-stock">
                    <h3 class="filter-title">In Stock</h3>
                    <div class="stock-range">
                        <div class="price-input">
                          <div class="field">
                            <input type="number" class="input-min" value="2" readonly>
                          </div>
                          <div class="field">
                            <input type="number" class="input-max" value="150" readonly>
                          </div>
                        </div>
                        <div class="slider">
                          <div class="progress"></div>
                        </div>
                        <div class="range-input">
                          <input type="range" class="range-min" min="2" max="150" value="2" step="1">
                          <input type="range" class="range-max" min="2" max="150" value="150" step="1">
                        </div>
                  </div>                    
                </div>
            </aside>
            <div class="products">
                <div class="products-utilities">
                    <div class="products-count">100 Results</div>
                    <div class="utilities">
                        <div class="sort-bar">
                            <span>Sort:</span>
                            <select class="product-sort">
                                <option value="" selected="selected">Default</option>
                                <option value="price.asc">Price ASC</option>
                                <option value="price.desc">Price DESC</option>
                                <option value="rating.asc">Rating ASC</option>
                                <option value="rating.desc">Rating DESC</option>
                            </select>
                        </div>
                        <div class="search-bar">
                            <span>Search:</span>
                            <input type="search" class="product-search">
                        </div>
                        <div class="view-bar">
                            <span>View:</span>
                            <select class="product-view">
                                <option value="" selected="selected">Default</option>
                                <option value="mini">Mini</option>
                            </select>
                        </div>
                    </div>
                </div>
                <ul class="products-list">
                </ul>
            </div>
      </section>
    `;
    }

    async mounted() {
        console.log('mounted')
    }
}
