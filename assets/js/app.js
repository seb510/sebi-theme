jQuery( document ).ready(function($) {
    class LoadMore {
        constructor() {
            this.loadMoreBtn = $('#load-more-js');
            this.contentBlock = $('.loop__row-js');
            this.currentPage = 1;
            this.pPp = this.loadMoreBtn.attr('data-ppage');
            this.category = this.loadMoreBtn.attr('data-cat');
            this.sortby = 'date';
            this.sort = 'DESC';
            this.addListener();
        }

        addListener () {
            let self = this;
            this.loadMoreBtn.on('click',function(e) {
                e.preventDefault();
                self.currentPage++;

                $.ajax({
                    type: 'POST',
                    url: my_ajax_object.ajax_url,
                    dataType: 'json',
                    data: {
                        action: 'post_load_more',
                        paged: self.currentPage,
                        ppp: self.pPp,
                        category: self.category,
                    },
                    beforeSend:function (){
                        self.contentBlock.addClass('loading');
                    },
                    success: function (res) {
                        self.contentBlock.removeClass('loading')
                        if(self.currentPage >= res.max) {
                            self.loadMoreBtn.hide();
                        }
                        self.contentBlock.append(res.html);
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
            });
        }
    }

    class GetAjaxPost {
        constructor() {
            this.loadMoreBtn = $('#load-more-js');
            this.contentBlock = $('.loop__row-js');
            this.currentPage = 1;
            this.sortby = 'date';
            this.sort = 'DESC';
            this.pPp = this.loadMoreBtn.attr('data-ppage');
            this.category = this.loadMoreBtn.attr('data-cat');
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
                console.log(current_sort)
                self.filterPost(current_sort);
            });
        }

        loadMore () {
            this.currentPage++;
            this.submitRequest('loadmore')
        }
        filterPost (sortInput) {
            this.currentPage = 1

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
                },
                beforeSend:function (){
                    self.contentBlock.addClass('loading');
                },
                success: function (res) {
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

   new GetAjaxPost();
});