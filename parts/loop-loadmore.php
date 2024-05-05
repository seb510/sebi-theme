<?php
    $category = (isset($args['category_name'])) ? $args['category_name'] : '';
?>
<section class="section-content">
    <div class="container">
        <?php
        $args = [
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'posts_per_page' => 3,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'paged'          => 1,
        ];

        if($category != '' && $category != 'all') {
            $args['category_name'] = $category;
        }
        $publications = new WP_Query($args);
        ?>

        <div class="laschf-sort">
            <select name="sort" id="sorting-post" aria-label="Sorting">
                <option value="date-desc" selected >Date (Newest - Oldest)</option>
                <option value="date-asc">Date (Oldest - Newest)</option>
                <option value="title-asc">Title (A - Z)</option>
                <option value="title-desc">Title (Z - A)</option>
            </select>
        </div>

        <div class="options__search">
            <label for="search-game" class="search_label">
                <input type="search" id="search-name" aria-label="Search input" name="search_game_name" placeholder="Search Post" class="options__search_input">
                <svg class="options__search_btn" width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.20833 2.16588C7.34077 2.16588 5.54969 2.90777 4.22912 4.22834C2.90855 5.54891 2.16667 7.33998 2.16667 9.20755C2.16667 11.0751 2.90855 12.8662 4.22912 14.1868C5.54969 15.5073 7.34077 16.2492 9.20833 16.2492C11.0759 16.2492 12.867 15.5073 14.1875 14.1868C15.5081 12.8662 16.25 11.0751 16.25 9.20755C16.25 7.33998 15.5081 5.54891 14.1875 4.22834C12.867 2.90777 11.0759 2.16588 9.20833 2.16588ZM2.07661e-08 9.20755C0.000125116 7.73919 0.351395 6.29215 1.0245 4.98716C1.69761 3.68217 2.67304 2.55707 3.8694 1.70572C5.06576 0.854378 6.44838 0.301477 7.90188 0.0931507C9.35539 -0.115176 10.8376 0.0271118 12.225 0.508143C13.6123 0.989175 14.8645 1.795 15.877 2.85839C16.8896 3.92178 17.6332 5.2119 18.0457 6.62111C18.4583 8.03032 18.5279 9.51775 18.2487 10.9593C17.9694 12.4009 17.3495 13.7548 16.4407 14.9081L20.397 18.8644C20.5943 19.0687 20.7035 19.3424 20.7011 19.6264C20.6986 19.9104 20.5847 20.1822 20.3838 20.383C20.1829 20.5839 19.9112 20.6978 19.6272 20.7003C19.3431 20.7027 19.0695 20.5936 18.8652 20.3962L14.9088 16.4399C13.551 17.5102 11.9193 18.1766 10.2004 18.3629C8.48147 18.5492 6.74486 18.2477 5.18927 17.4931C3.63368 16.7385 2.32197 15.5612 1.40425 14.0959C0.486532 12.6306 -0.000116072 10.9365 2.07661e-08 9.20755Z" fill="#ffffff"></path>
                </svg>
            </label>
            <button type="button" class="game_top_clear custom-btn clear-btn-js show">Clear</button>
        </div>

        <?php if($publications->have_posts()): ?>
        <div class="loop__row loop__row-js" data-type="<?php echo 'post' ?>" data-category="<?php echo $category ?>" data-ppage="3">
            <?php
            while ($publications->have_posts()): $publications->the_post();
                get_template_part('templates/blog-post');
            endwhile;
            ?>
            <?php else: ?>
                <div class="nothing-content"><?php _e( 'Sorry, nothing to display.', THEME_NAME ); ?></div>
            <?php endif; ?>
        </div>
        <?php wp_reset_postdata(); ?>

        <?php if( 1 < $publications->max_num_pages ) { ?>
            <div class="btn__wrapper">
                <button id="load-more-js" type="button" class="load-more-js btn-primary">Load more</button>
            </div>
        <?php } ?>
    </div>
</section>
