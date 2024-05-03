<?php get_header(); ?>
<main>
    <section class="section-search">
        <div class="container">
            <div class="content-head search">
                <h1 class="line-head">
                    <?php echo sprintf( __( '%s Search Results for ', THEME_NAME ), $wp_query->found_posts ); echo get_search_query(); ?>
                </h1>
            </div>
        </div>
    </section>
    <?php get_template_part('parts/loop-pagination'); ?>
</main>

<?php get_footer(); ?>
