jQuery(document).ready(function ($) {

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

        addListener() {
            let self = this;
            this.loadMoreBtn.on('click', function (e) {
                e.preventDefault();
                self.loadMore();
            });
            $('#sorting-post').on('change', function () {
                let current_sort = this.value;
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

        loadMore() {
            this.currentPage++;
            this.submitRequest('loadmore');
        }

        filterPost(sortInput) {
            this.currentPage = 1;

            if (sortInput === 'date-asc') {
                this.sortby = 'date';
                this.sort = 'ASC';
            } else if (sortInput === 'date-desc') {
                this.sortby = 'date';
                this.sort = 'DESC';
            } else if (sortInput === 'title-asc') {
                this.sortby = 'title';
                this.sort = 'ASC';
            } else if (sortInput === 'title-desc') {
                this.sortby = 'title';
                this.sort = 'DESC';
            } else {
                this.sortby = 'date';
                this.sort = 'DESC';
            }

            this.submitRequest('filter');
        }

        submitRequest(current_request) {
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
                    search: self.search_name,
                },
                beforeSend: function () {
                    self.contentBlock.addClass('loading');
                },
                success: function (res) {
                    let data = res.data;
                    self.contentBlock.removeClass('loading');
                    if (self.currentPage >= data.max_pages) {
                        self.loadMoreBtn.hide();
                    } else {
                        self.loadMoreBtn.show();
                    }
                    if (current_request === 'filter') {
                        self.contentBlock.html(data.output);
                    } else {
                        self.contentBlock.append(data.output);
                    }
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
    class ContactForm {
        constructor($form) {
            this.$form = $form;
            this.$message = $form.find('.form-message');
            this.init();
        }

        init() {
            this.$form.on('submit', this.handleSubmit.bind(this));
        }

        handleSubmit(e) {
            e.preventDefault();

            const formData = this.$form.serialize() + '&action=send_contact_message';

            $.ajax({
                url: my_ajax_object.ajax_url,
                type: "POST",
                data: formData,
                success: this.handleResponse.bind(this, 'success'),
                error: this.handleResponse.bind(this, 'error')
            });
        }

        handleResponse(type, response) {
            this.$message.removeClass('success error');
            if (type === 'success') {
                this.$message.addClass("success").text("Message sent successfully!");
                this.$form.trigger("reset"); // Reset comment form fields
            } else {
                this.$message.addClass("error").text("There was an error sending your message.");
            }
        }
    }

    new ContactForm($('#contact-form'));

    new GetAjaxPost();
});
