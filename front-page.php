<?php get_header(); ?>
    <main class="main front-page">
        <section class="page-head">
            <div class="container">
                <div class="news-content">
                    <div class="content-head">
                        <h1 class="line-head"><?php _e( '', THEME_NAME ); single_cat_title(); ?></h1>
                    </div>
                </div>
            </div>
        </section>
        <div class="layout-content">
            <div class="container">
                <div class="content">
                    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <?php the_title( '<header class="entry-header"><h1 class="entry-title">', '</h1></header><!-- .entry-header -->' ); ?>
                            <div class="entry-content">
                                <?php the_content(); ?>
                            </div>
                        </article>
                    <?php endwhile; ?>
                    <?php else: ?>
                        <div class="nothing-content"><?php _e( 'Sorry, nothing to display.', THEME_NAME ); ?></div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </main>
<?php get_footer(); ?>