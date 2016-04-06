(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;jQuery(function($){

  var slider = {
    slides: $('.nav-tab--nnplus'),
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



},{}]},{},[1])