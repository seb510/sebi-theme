<?php
$category = get_the_category();
$category_name = $category[0]->name;
get_header(); ?>
    <main>
        <section class="page-head">
            <div class="container">
                <div class="block">
                    <h1><?php echo $category_name; ?></h1>
                    <ul>
                        <li><a href="<?php echo home_url(); ?>">Home</a></li>
                        <li><?php echo $category_name; ?></li>
                    </ul>
                </div>
            </div>
        </section>
        <?php get_template_part('parts/loop-pagination'); ?>
        <?php /*get_template_part( 'parts/loop-loadmore', null, [
            'category_name' => $category_name,
        ] ); */?>

    </main>
<?php get_footer(); ?>