<?php
get_header(); ?>
    <main>
        <section class="layout-content">
            <div class="container">
                <div class="layout-content__row">
                    <div itemscope="https://schema.org/NewsArticle" itemtype="https://schema.org/NewsArticle">
                        <section class="single-news-content">
                            <?php if ( has_post_thumbnail()) { ?>
                                <a href="<?php the_permalink(); ?>" class="main-thumbnail" title="<?php the_title_attribute(); ?>" >
                                    <?php the_post_thumbnail(); ?>
                                </a>
                            <?php } ?>
                            <h1 class="single-news-head" itemprop="headline name"><?php the_title(); ?></h1>
                            <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                                        <div class="meta-info">
                                            <time datetime="<?php the_time('Y-m-j'); ?>"><?php the_time('F j, Y'); ?></time>
                                            <div class="author-post">
                                                <?php $author_name = get_the_author_meta('display_name', get_post_field('post_author', get_the_ID())); ?>
                                                <?php echo $author_name; ?>
                                            </div>
                                            <div class="category-post">
                                                <?php
                                                $cat = get_the_category(get_the_ID());
                                                $cat_name = $cat[0]->name;
                                                $cat_link = $cat[0]->slug;
                                                ?>
                                                <a href="<?php echo esc_url( home_url() ) .'/category/' .  $cat_link ?>"><?php echo $cat_name?></a>
                                            </div>
                                        </div>
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
                    <div >
                        <?php get_sidebar(); ?>
                    </div>
                </div>
            </div>
        </section>
    </main>
<?php get_footer(); ?>