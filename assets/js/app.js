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
            this.my_search = [];
            this.addListener();
        }

        addListener() {
            this.loadMoreBtn.on('click', (e) => {
                e.preventDefault();
                this.loadMore();
            });

            $('#sorting-post').on('change', (e) => {
                this.filterPost(e.target.value);
            });

            $(document).on('keyup', '#search-name', (e) => {
                let input_value = $(e.target).val();
                this.handleSearch(input_value);
            });
        }

        loadMore() {
            this.currentPage++;
            this.submitRequest('loadmore');
        }

        filterPost(sortInput) {
            this.currentPage = 1;

            const sortOptions = {
                'date-asc': { sortby: 'date', sort: 'ASC' },
                'date-desc': { sortby: 'date', sort: 'DESC' },
                'title-asc': { sortby: 'title', sort: 'ASC' },
                'title-desc': { sortby: 'title', sort: 'DESC' }
            };

            const { sortby, sort } = sortOptions[sortInput] || { sortby: 'date', sort: 'DESC' };
            this.sortby = sortby;
            this.sort = sort;

            this.submitRequest('filter');
        }

        handleSearch(inputValue) {
            this.my_search.forEach(clearTimeout);
            this.my_search.push(setTimeout(() => {
                this.search_name = inputValue.toLowerCase();
                this.submitRequest('filter');
            }, 1000));
        }

        submitRequest(current_request) {
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
                beforeSend: () => {
                    this.contentBlock.addClass('loading');
                },
                success: (res) => {
                    this.handleSuccess(res, current_request);
                },
                error: (jqXHR, exception) => {
                    this.handleError(jqXHR, exception);
                }
            });
        }

        handleSuccess(res, current_request) {
            const data = res.data;
            this.contentBlock.removeClass('loading');

            if (this.currentPage >= data.max_pages) {
                this.loadMoreBtn.hide();
            } else {
                this.loadMoreBtn.show();
            }

            if (current_request === 'filter') {
                this.contentBlock.html(data.output);
            } else {
                this.contentBlock.append(data.output);
            }
        }

        handleError(jqXHR, exception) {
            let errorMsg;

            switch (jqXHR.status) {
                case 0:
                    errorMsg = 'Not connect. Verify Network.';
                    break;
                case 404:
                    errorMsg = 'Requested page not found (404).';
                    break;
                case 500:
                    errorMsg = 'Internal Server Error (500).';
                    break;
                default:
                    errorMsg = this.getErrorByException(exception, jqXHR.responseText);
                    break;
            }

            console.log(errorMsg);
        }

        getErrorByException(exception, responseText) {
            const errorMessages = {
                'parsererror': 'Requested JSON parse failed.',
                'timeout': 'Time out error.',
                'abort': 'Ajax request aborted.',
                'default': `Uncaught Error. ${responseText}`
            };

            return errorMessages[exception] || errorMessages['default'];
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
