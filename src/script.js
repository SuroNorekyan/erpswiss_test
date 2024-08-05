$(document).ready(function() {
    $('#header').load('components/header/header.html');
    $('#search').load('components/search/search.html');
    $('#appointment').load('components/appointment.html', function() {

        function handleMouseOver() {
            if (window.innerWidth > 1400) {
                let subCategories = $(this).data('sub');
                let subCategoryBlock = $('.sub-category-block');
                let thirdCategoryBlock = $('.third-category-block');

                $('.main-image-block').hide();
                $('.appointment-menu').css('width', '100%');

                subCategoryBlock.empty();
                thirdCategoryBlock.empty();

                $.each(subCategories, function(index, sub) {
                    let subCategoryName = Object.keys(sub)[0];
                    let subCategoryItem = $('<li></li>').text(subCategoryName).attr('data-sub', JSON.stringify(sub[subCategoryName]));

                    subCategoryBlock.append($('<ul></ul>').append(subCategoryItem));
                });

                subCategoryBlock.show();

                $('.sub-category-block li').on('mouseover', function() {
                    let thirdCategories = $(this).data('sub');
                    thirdCategoryBlock.empty();

                    if (thirdCategories.length > 0) {
                        $.each(thirdCategories, function(index, third) {
                            let thirdCategoryName = Object.keys(third)[0];
                            let thirdCategoryItem = $('<li></li>').text(thirdCategoryName);

                            thirdCategoryBlock.append($('<ul></ul>').append(thirdCategoryItem));
                        });

                        thirdCategoryBlock.show();
                    } else {
                        thirdCategoryBlock.hide();
                    }
                });
            }
        }

        function handleMouseLeave() {
            if (window.innerWidth > 1400) {
                $('.main-image-block').show();
                $('.appointment-menu').css('width', '40%');
                $('.sub-category-block').hide();
                $('.third-category-block').hide();
            }
        }

        function handleClick() {
            if (window.innerWidth <= 1400) {
                let subCategoryBlock = $(this).next('.sub-category-block');
                if (subCategoryBlock.length === 0) {
                    let subCategories = $(this).data('sub');
                    subCategoryBlock = $('<div class="sub-category-block"></div>');
                    $(this).after(subCategoryBlock);

                    $.each(subCategories, function(index, sub) {
                        let subCategoryName = Object.keys(sub)[0];
                        let subCategoryItem = $('<li></li>').text(subCategoryName).attr('data-sub', JSON.stringify(sub[subCategoryName]));

                        subCategoryBlock.append($('<ul></ul>').append(subCategoryItem));
                    });
                }

                $('.sub-category-block').not(subCategoryBlock).slideUp();
                subCategoryBlock.slideToggle();

                $('.sub-category-block li').on('click', function() {
                    let thirdCategories = $(this).data('sub');
                    let thirdCategoryBlock = $(this).next('.third-category-block');

                    if (thirdCategoryBlock.length === 0) {
                        thirdCategoryBlock = $('<div class="third-category-block"></div>');
                        $(this).after(thirdCategoryBlock);

                        if (thirdCategories.length > 0) {
                            $.each(thirdCategories, function(index, third) {
                                let thirdCategoryName = Object.keys(third)[0];
                                let thirdCategoryItem = $('<li></li>').text(thirdCategoryName);

                                thirdCategoryBlock.append($('<ul></ul>').append(thirdCategoryItem));
                            });
                        }
                    }

                    $('.third-category-block').not(thirdCategoryBlock).slideUp();
                    thirdCategoryBlock.slideToggle();
                });
                let $this = $(this);

                let $liInner = $this.find('.li-inner');

                let $arrows = $liInner.find('i.arrow-btn');

                $arrows.first().toggleClass('inactive-arrow');
                $arrows.last().toggleClass('inactive-arrow');
            }
        }

        $('.category-btn').on('mouseover', handleMouseOver);
        $('.appointment-menu').on('mouseleave', handleMouseLeave);
        $('.category-btn').on('click', handleClick);

        if (window.innerWidth <= 1400) {
            $('.sub-category-block').on('click', 'li', function() {
                let thirdCategoryBlock = $(this).next('.third-category-block');
                $('.third-category-block').not(thirdCategoryBlock).slideUp();
                thirdCategoryBlock.slideToggle();
            });

            $('.appointment-main').on('mouseleave', function() {
                $('.main-image-block').show();
                $('.appointment-menu').css('width', '40%');
                $('.sub-category-block').slideUp();
                $('.third-category-block').slideUp();
            });
        }
    });

    $('.appointment-options li').on('click', function() {
        alert('You selected ' + $(this).text());
    });

    function toggleSearchVisibility() {
        if (window.innerWidth < 1400) {
            $('#search').hide();
        } else {
            $('#search').show();
        }
    }

    // Initial check
    toggleSearchVisibility();

    // Check on window resize
    $(window).on('resize', toggleSearchVisibility);
});
