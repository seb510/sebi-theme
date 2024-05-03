<?php
get_header(); ?>
    <main>
        <section class="layout-content">
            <div class="container">
                <div class="layout-content__row">
                    <div class="col-md-12 col-lg-9" itemscope="https://schema.org/NewsArticle" itemtype="https://schema.org/NewsArticle">
                        <section class="single-news-content">
                            <h1 class="single-news-head" itemprop="headline name"><?php the_title(); ?></h1>
                            <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                                        <div class="post-content">
                                            <?php the_content(); ?>
                                        </div>
                                        <div class="edit-post">
                                            <?php edit_post_link();?>
                                        </div>
                                    </article>
                            <?php endwhile; ?>

                            <?php else: ?>
                                <div class="col-12 col-lg-9">
                                    <article>
                                        <?php _e( 'Sorry, nothing to display.', THEME_NAME ); ?>
                                    </article>
                                </div>
                            <?php endif; ?>
                        </section>
                    </div>
                    <div class="col-md-12 col-lg-3">
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
        </section>
    </main>
<?php get_footer(); ?>