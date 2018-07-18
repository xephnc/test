/*
(function($) {
    function new_map( $el ) {
        // var
        var $markers = $el.find('.marker');
        // vars
        var args = {
            zoom        : 13,
            center      : new google.maps.LatLng(0, 0),
            mapTypeId   : google.maps.MapTypeId.ROADMAP
        };
        // create map
        var map = new google.maps.Map( $el[0], args);

        // add a markers reference
        map.markers = [];
        // add markers
        $markers.each(function(){
            add_marker( $(this), map );
        });
        // center map
        center_map( map );
        // return
        return map;
    }

    function add_marker( $marker, map ) {
        // var
        var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
        // create marker
        var marker = new google.maps.Marker({
            position    : latlng,
            map         : map
        });
        // add to array
        map.markers.push( marker );
        // if marker contains HTML, add it to an infoWindow
        if( $marker.html() )
        {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content     : $marker.html()
            });
            // show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open( map, marker );

            });
        }
    }

    function center_map( map ) {
        // vars
        var bounds = new google.maps.LatLngBounds();
        // loop through all markers and create bounds
        $.each( map.markers, function( i, marker ){
            var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
            bounds.extend( latlng );

        });

        // only 1 marker?
        if( map.markers.length == 1 )
        {
            // set center of map
            map.setCenter( bounds.getCenter() );
            map.setZoom( 13 );
        }
        else
        {
            // fit to bounds
            map.fitBounds( bounds );
        }
    }
    var map = null;

    $(document).ready(function(){
        $('.acf-map').each(function(){
            // create map
            map = new_map( $(this) );
        });
    });
})(jQuery);
*/

function animLi(eachLi, grp){
    if(eachLi.length != 0){
        var k = eachLi[0];
        eachLi.splice(0,1);
        var pad = k * 8;
        $('.event-details-ul'+grp+' li:eq('+k+')').animate({'margin-left': pad + 'px'}, 700);
        setTimeout(function(){animLi(eachLi, grp);}, 100)
        //$('.event-details-ul li:eq('+k+')').promise().done( setTimeout(function(){animLi(eachLi);}, 500) );
    }
}

$(document).ready(function(){
    $('.parallax').parallax();

    var scrollFireOptions = [
        {selector: '.event-details-ul.grp-1', offset: 0, callback: function() {
            var eachLiGrp1 = [];
            $('.event-details-ul.grp-1 li').each(function(i, objLi1){
                eachLiGrp1.push(i);
                if( i == ($('.event-details-ul.grp-1 li').length - 1) ){
                    animLi(eachLiGrp1, '.grp-1');
                }
            });
        } },
        {selector: '.event-details-ul.grp-2', offset: 0, callback: function() {
            var eachLiGrp2 = [];
            $('.event-details-ul.grp-2 li').each(function(x, objLi2){
                eachLiGrp2.push(x);
                if( x == ($('.event-details-ul.grp-2 li').length - 1) ){
                    animLi(eachLiGrp2, '.grp-2');
                }
            });
        } }
    ];
    Materialize.scrollFire(scrollFireOptions);

    var detailsHeight = $('.event-details').height();
    var eventContentHeight = $('.event-content-header').height();
    var winWidth = $(window).width();
    detailsHeight = detailsHeight - eventContentHeight;
    if( winWidth >= 320 && winWidth <= 600 ){ detailsHeight = detailsHeight - 20; }
    else if( winWidth >= 601 && winWidth <= 1024 ){ detailsHeight = detailsHeight + 50; }
    else{ detailsHeight = detailsHeight + 80; }

    if( winWidth > 1024 ){
        $('.event-description').css({'min-height': detailsHeight + 'px'});
    }

    var galleryOptions = {
        rowHeight: 160,
    };

    setTimeout(function(){
        $("#justified-gallery").justifiedGallery(galleryOptions);
        $("#justified-gallery a").fadeIn(1500);
    }, 1000);

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height() ) {
            $.post('ajax.html',function(html){
                $("#justified-gallery").append(html).justifiedGallery('norewind');
            }, 'html');

        }
    });

    $(document).on('click', '#ajaxgallery', function(){
        // $.post('ajax.html',function(html){
        //     $("#justified-gallery").append(html).justifiedGallery('norewind');
        // }, 'html');
    });


});
