$(function() {
	var article = {},
		articles = [];
	

	$('.search-button').on('click', function(e) {
		e.preventDefault();
		var searchQuery = $('.search-field').val(),
			nyt_url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?&fq=news_desk:("'+ searchQuery + '")&facet_field=source&begin_date=20150101&end_date=20150801&api-key=a7fbb5f14f81111bea7c9ff99092b561:11:72676480';
		
		$('.new').remove();	
		articles = [];
		$('.search-field').val("");
		return $.get(nyt_url, function(data, textStatus){
		// this will give us an array of objects
		var news = JSON.parse(data),
			url = 'http://www.nytimes.com/';
		for(var i=0; i < news.response.docs.length; i++) {
			if (news.response.docs[i].multimedia.length) {
				img = url + news.response.docs[i].multimedia[0].legacy.wide;
			} else {
				img = '/img/some-img.png'
			}
			article = {};
			article.data = i;
			article.link = '<a href="#" class="new-link" data-id=' + article.data +'>' + news.response.docs[i].headline.main + '</a>';
			article.header = news.response.docs[i].headline.main;
			article.text = news.response.docs[i].snippet;
			article.img = '<img src="'+ img + '" alt="" class="new-img">';
			$('.news').append('<div class="new">' + article.img + article.link + '</div>');
			articles.push(article);
		}
	}, 'text');
	});

$('.news').on('click', '.new-link', function(e) {
		var h2, 
			img, 
			text,
			count = $(this).data('id'),
			popup = '<div class="popup"><div class="popup-header"><a href="#" class="close"></a></div></div>',
			popupMar = 0;
		e.preventDefault();
		h2 = articles[count].header;
		img = articles[count].img;
		text = articles[count].text;
		$('body').append(popup);
		if($(window).width()<=320) {
			$('.popup').css("top", $(document).scrollTop() + 40);
		}
		if($(window).width()<=768) {
			$('.popup').css("top", $(document).scrollTop() + 57);
		} 
		$('.popup').append('<h2>' + h2 + '</h2>'+ img + '<div class="popup-inner">' + text + '</div>');
		$('.hide').addClass('visible');
	});

	$('body').on('click', '.close', function(e) {
		e.preventDefault();
		$('.popup').remove();
		$('.hide').removeClass('visible');
	});

	$('.nav-but').on('click', function(e) {
		e.preventDefault();
		$('nav').animate({right:0}, 300);
		$('.hide').addClass('visible');
		$(this).hide();
		$('.close-menu').css("display", "inline-block");
	});

	$('.close-menu').on('click', function(e) {
		e.preventDefault();
		$('nav').animate({right:'-160px'}, 300);
		$('.hide').removeClass('visible');
		$(this).css("display", "none");
		$('.nav-but').css("display", "inline-block");
	});

	$('.search-slide-button').on('click', function(e) {
		e.preventDefault();
		if($('.search').height() == 0) {
			$('.search').animate({height: 68}, 300);
			$('.wrapper').animate({'margin-top': 108}, 300);
		} else {
			$('.search').animate({height: 0}, 300);
			$('.wrapper').animate({'margin-top': 40}, 300);
		}
	});

	$(window).scroll(function(){
		if ( $(document).scrollTop() > 47 ) {
			$('.hide, nav').css("top", '0px');
		} else {
			$('.hide, nav').css("top", $('header').height() + 10);
		}
	});
	
});

