jQuery( document ).ready(function($) {
    class LoadMore {
        constructor() {
            this.loadMoreBtn = $('#load-more-js');
            this.contentBlock = $('.loop__row-js');
            this.currentPage = 1;
            this.pPp = this.loadMoreBtn.attr('data-ppage');
            this.category = this.loadMoreBtn.attr('data-cat');
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

    new LoadMore();
});