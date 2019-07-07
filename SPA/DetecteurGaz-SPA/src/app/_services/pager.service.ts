import { Injectable } from '@angular/core';
import { VArray } from '../_helper/ArrayHelper';
import { PagerModel } from '../models/pagerModel';

@Injectable({
  providedIn: 'root'
})

export class PagerService<T> {
    // Paging
    // array of all items to be paged
    allItems: T[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number;
        let endPage: number;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = VArray.range(startPage, endPage + 1, 1);
        const model = new PagerModel();
        model.TotalItems = totalItems;
        model.CurrentPage = currentPage;
        model.PageSize = pageSize;
        model.TotalPages = totalPages;
        model.StartPage = startPage;
        model.EndPage = endPage;
        model.StartIndex = startIndex;
        model.EndIndex = endIndex;
        model.Pages = pages;

        return model;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.StartIndex, this.pager.EndIndex + 1);
    }
}
