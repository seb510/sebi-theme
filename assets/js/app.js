jQuery( document ).ready(function($) {

    class GetAjaxPost {
        constructor() {
            this.loadMoreBtn = $('#load-more-js');
            this.contentBlock = $('.loop__row-js');
            this.currentPage = 1;
            this.sortby = 'date';
            this.sort = 'DESC';
            this.search_name = '';
            this.pPp = this.contentBlock.attr('data-ppage');
            this.category = this.contentBlock.attr('data-category');
            this.addListener();
        }

        addListener () {
            let self = this;
            this.loadMoreBtn.on('click',function(e) {
                e.preventDefault();
                self.loadMore();
            });
            $('#sorting-post').on('change', function() {
                let current_sort =  this.value;
                self.filterPost(current_sort);
            });

            const my_search = [];
            $(document).on('keyup', '#search-name', function (e) {
                let input_value = $(this).val();
                my_search.map(e => {
                    clearTimeout(e)
                })
                my_search.push(setTimeout(() => {
                    self.search_name = input_value.toLowerCase();
                    self.submitRequest('filter')
                }, 1000))
            })
        }

        loadMore () {
            this.currentPage++
            this.submitRequest('loadmore')
        }
        filterPost (sortInput) {
            this.currentPage = 1;

             if(sortInput === 'date-asc') {
                this.sortby = 'date';
                this.sort = 'ASC';
            } else if (sortInput === 'date-desc') {
                this.sortby = 'date';
                this.sort = 'DESC';
            } else if (sortInput === 'title-asc') {
                this.sortby = 'title';
                this.sort = 'ASC';
            } else if(sortInput === 'title-desc') {
                this.sortby = 'title';
                this.sort = 'DESC';
            } else {
                this.sortby = 'date';
                this.sort = 'DESC';
            }

            this.submitRequest('filter')
        }

        submitRequest (current_request) {
            let self = this;
            $.ajax({
                type: 'POST',
                url: my_ajax_object.ajax_url,
                dataType: 'json',
                data: {
                    action: 'get_ajax_posts',
                    paged: self.currentPage,
                    ppp: self.pPp,
                    category: self.category,
                    sortby: self.sortby,
                    sort: self.sort,
                    search : self.search_name,
                },
                beforeSend:function (){
                    self.contentBlock.addClass('loading');
                },
                success: function (res) {
                    console.log(res)
                    self.contentBlock.removeClass('loading')
                    if(self.currentPage >= res.max) {
                        self.loadMoreBtn.hide();
                    } else {
                        self.loadMoreBtn.show();
                    }
                    $(self.contentBlock)[current_request === 'filter' ? 'html' : 'append'](res.html);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        console.log('Not connect. Verify Network.');
                    } else if (jqXHR.status == 404) {
                        console.log('Requested page not found (404).');
                    } else if (jqXHR.status == 500) {
                        console.log('Internal Server Error (500).');
                    } else if (exception === 'parsererror') {
                        console.log('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                        console.log('Time out error.');
                    } else if (exception === 'abort') {
                        console.log('Ajax request aborted.');
                    } else {
                        console.log('Uncaught Error. ' + jqXHR.responseText);
                    }
                }
            });
        }
    }

    class GetAjaxOptimizePost {
        constructor() {
            this.loadMoreBtn = $('#load-more-js');
            this.contentBlock = $('.loop__row-js');
            this.init();
        }

        init() {
            this.currentPage = 1;
            this.sortby = 'date';
            this.sort = 'DESC';
            this.search_name = '';
            this.pPp = this.contentBlock.attr('data-ppage');
            this.category = this.contentBlock.attr('data-category');
            this.bindEvents();
        }

        bindEvents() {
            this.loadMoreBtn.on('click', this.loadMore.bind(this));
            $('#sorting-post').on('change', this.filterPost.bind(this));

            $(document).on('keyup', '#search-name', this.debounceSearch.bind(this));
        }

        loadMore() {
            this.currentPage++;
            this.submitRequest('loadmore');
        }

        filterPost(sortInput) {
            this.currentPage = 1;
            this.sortby = sortInput.split('-')[0];
            this.sort = sortInput.split('-')[1];
            this.submitRequest('filter');
        }

        debounceSearch(e) {
            const inputValue = $(e.target).val().toLowerCase();
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.search_name = inputValue;
                this.submitRequest('filter');
            }, 1000);
        }

        submitRequest(currentRequest) {
            $.ajax({
                type: 'POST',
                url: my_ajax_object.ajax_url,
                dataType: 'json',
                data: {
                    action: 'get_ajax_posts',
                    paged: this.currentPage,
                    ppp: this.pPp,
                    category: this.category,
                    sortby: this.sortby,
                    sort: this.sort,
                    search: this.search_name,
                },
                beforeSend: () => this.contentBlock.addClass('loading'),
                success: (res) => {
                    console.log(res);
                    this.contentBlock.removeClass('loading');
                    this.loadMoreBtn.toggle(this.currentPage < res.max);
                    $(this.contentBlock)[currentRequest === 'filter' ? 'html' : 'append'](res.html);
                },
                error: (jqXHR, exception) => {
                    this.handleError(jqXHR, exception);
                },
            });
        }

        handleError(jqXHR, exception) {
            const messages = {
                0: 'Not connect. Verify Network.',
                404: 'Requested page not found (404).',
                500: 'Internal Server Error (500).',
                parsererror: 'Requested JSON parse failed.',
                timeout: 'Time out error.',
                abort: 'Ajax request aborted.',
            };

            const message = messages[jqXHR.status] || 'Uncaught Error. ' + jqXHR.responseText;
            console.error(message);
        }
    }

   new GetAjaxPost();
});
