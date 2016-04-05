;jQuery(function($){

  var slider = {
    slides: $('.nav-tab'),
    prev: $('.prev'),
    next: $('.next'),
    pagination: $(".pagination li"),
    init: function(){
      this.clickPrev();
      this.clickNext();
      this.clickPagination();
    },

    slideNext: function(current, next){
      current.removeClass('active').fadeOut(200, function(){
        next.addClass('active').fadeIn(200)
      });
    },
    slideTo: function(current, slideTo){
      current.removeClass('active').fadeOut(200, function(){
        slideTo.addClass('active').fadeIn(200)
      });
    },

    clickPrev: function(){
      var that = this;
      $('.prev').click(function(){
        var current = $(this).closest('.item');
        var next = $(this).closest('.item').prev('.item');
        that.slideNext(current,next);
      });
    },
    clickNext: function(){
      var that = this;
      $('.next').click(function(){
        var current = $(this).closest('.item');
        var next = $(this).closest('.item').next('.item');
        that.slideNext(current,next);
      });
    },
    clickPagination: function(){
      var that = this;
      this.pagination.click(function(){
        var goIndex = that.slides.find('.item').eq($(this).index());
        var current = that.slides.find('.active');

        that.slideTo(current, goIndex);

      });
    }

  };


  $(document).ready(function(){
    slider.init();
  });


});


