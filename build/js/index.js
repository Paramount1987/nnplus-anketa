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
    changePagination: function(curIndex, nextIndex){
       this.pagination.eq(curIndex).addClass('active-li').removeClass('current-li');
       this.pagination.eq(nextIndex).addClass('current-li');
    },
    clickPrev: function(){
      var that = this;
      $('.prev').click(function(){
        var current = $(this).closest('.item');
        var next = $(this).closest('.item').prev('.item');
        var allowSlide = nnplusValid(current.find('.nnplus__isvalid'));
        if( !allowSlide ) {
          that.addErrorMessage(current);
          return;
        }else{
          that.changePagination( $('.pagination').find('.current-li').index() , next.index());
          that.slideNext(current,next);
        }
      });
    },
    clickNext: function(){
      var that = this;
      $('.next').click(function(){
        var current = $(this).closest('.item');
        var next = $(this).closest('.item').next('.item');
        var allowSlide = nnplusValid(current.find('.nnplus__isvalid'));
        if( !allowSlide ) {
          that.addErrorMessage(current);
          return;
        }else{
          that.changePagination( $('.pagination').find('.current-li').index() , next.index());
          that.slideNext(current,next);
        }

      });
    },
    clickPagination: function(){
      var that = this;
      this.pagination.click(function(){
        var goIndex = that.slides.find('.item').eq($(this).index());
        var current = that.slides.find('.active');
        var allowSlide = nnplusValid(current.find('.nnplus__isvalid'));

        if( !allowSlide || !$(this).hasClass('active-li')) {
          that.addErrorMessage(current);
          return;
        }else{
          that.changePagination( $('.pagination').find('.current-li').index() , $(this).index());
          that.slideTo(current, goIndex);
        }
      });
    },
    addErrorMessage: function(parent){
        if( parent.find('.error-message').length ){
            return;
          }
        errorMessage.insertBefore( parent.find('.nnplus-line'));
       }

  };


//error message template
var errorMessage = $('<div class="error-message">Ответье, пожалуйста на все вопросы!</div>');
 function removeError(parent){

  if( !parent.find('.nnplus__invalid').length ){
    parent.find('.error-message').remove();
  }
  
 }
  ///check validation
  function nnplusValid(arr){
    var valid = true;

      arr.each(function(){

         var value = $(this).val();
            if (!value){
              valid = false;
              $(this).closest('.nnplus__form-group').addClass('nnplus__invalid');
            }
      });

    return valid;
  }

  //add remove isvalidprop
  function toggleIsvalid(wrap, add){
      if(add){
        wrap.find('.hidden-fields input').addClass('nnplus__isvalid');
        wrap.find('.hidden-fields select').addClass('nnplus__isvalid');
      }else{
        wrap.find('.hidden-fields input').removeClass('nnplus__isvalid');
        wrap.find('.hidden-fields select').removeClass('nnplus__isvalid');
      }
  }

  ////abort Template
  var abortTemplate1 = '<div class="nnplus__form-group--abortMedic"><div class="nnplus__form-group clearfix"><span class="nnplus__form-group-title">Год проведения аборта: </span> <input type="text" class="nnplus__form-input nnplus__form-input--md"></div><div class="nnplus__form-group clearfix"><span class="nnplus__form-group-title pull-left font17">Срок беременности, на котором проводился аборт:</span><div class="pull-right w230 text-center"><div class="clearfix"><div class="nnplus__form-group--inline pull-left"><span class="nnplus__form-group-title--sm">недель: </span><input type="text" class="nnplus__form-input nnplus__form-input--sm"></div><div class="nnplus__form-group--inline pull-right"><span class="nnplus__form-group-title--sm">дней: </span><input type="text" class="nnplus__form-input nnplus__form-input--sm"></div></div></div></div></div>';

 var abortTemplate2 = '<div class="nnplus__form-group--pregnantDevelop"><div class="nnplus__form-group clearfix"><span class="nnplus__form-group-title">Беременность в годы: </span> <input type="text" class="nnplus__form-input nnplus__form-input--md"></div><div class="nnplus__form-group clearfix"><span class="nnplus__form-group-title pull-left font17">Беременность на сроках:</span><div class="pull-right w230 text-center"><div class="clearfix"><div class="nnplus__form-group--inline pull-left"><span class="nnplus__form-group-title--sm">недель: </span><input type="text" class="nnplus__form-input nnplus__form-input--sm"></div><div class="nnplus__form-group--inline pull-right"><span class="nnplus__form-group-title--sm">дней: </span><input type="text" class="nnplus__form-input nnplus__form-input--sm"></div></div></div></div></div>';                                            

  ////document is ready
  $(document).ready(function(){
    slider.init();

    ///////////////////////////nnplus-select
    $(".nnplus-select").chosen({
      disable_search: true,
      placeholder_text_single: 'Выберите из списка',
      width: "230px"
    });
  });
  //toCurrentPregnant
  $('body').on('click', '.toCurrentPregnant', function(){

    if( nnplusValid( $('.nnplus__previous-pregnant .nnplus__isvalid') )  ){

         $('.nnplus__previous-pregnant').fadeOut(200, function(){
                  $('.nnplus__current-pregnant').fadeIn(200)
            });

    }else{
      slider.addErrorMessage($(this).closest('.item'));
    }


  });

  ///////////////////////////////nnplus__checkbox-input
  $('body').on('change', '.nnplus__checkbox-input', function(){

    //medications
    if ( $('#medicationsYes').is(':checked') ){
        
        $('#hidden-fields--medications').slideDown();
    }else{
      $('#hidden-fields--medications').slideUp();
    }
    ///end medications
    /////
    if ( $('#other').is(':checked') ){
      $('#hidden-fields--other').slideDown();
    }else{
      $('#hidden-fields--other').slideUp();
    }
    //////
    if ( $('#karyotypingYes').is(':checked') ){
      $('#hidden-fields--karyotyping').slideDown();
    }else{
      $('#hidden-fields--karyotyping').slideUp();
    }
    //////
    if ( $('#geneticDiseaseYes').is(':checked') ){
      $('#hidden-fields--geneticDisease').slideDown();
    }else{
      $('#hidden-fields--geneticDisease').slideUp();
    }
    //////
    if ( $('#chromosomalAbnormalitiesYes').is(':checked') ){
      $('#hidden-fields--chromosomalAbnormalities').slideDown();
    }else{
      $('#hidden-fields--chromosomalAbnormalities').slideUp();
    }
    //////
    if ( $('#relatedMarriageYes').is(':checked') ){
      
      $('#relatedMarriage').slideDown(200, function(){
        toggleIsvalid($(this).closest('.nnplus__form-group'), true);
      });
    }else{
      toggleIsvalid($(this).closest('.nnplus__form-group'), false);
      $('#relatedMarriage').slideUp();
    }
    //////
    if ( $('#screeningYes').is(':checked') ){
     
      $('#hidden-fields--screening').slideDown(200,function(){
         toggleIsvalid($(this).closest('.nnplus__form-group'), true);
      });
    }else{
      toggleIsvalid($(this).closest('.nnplus__form-group'), false);
      $('#hidden-fields--screening').slideUp();
      $('.item-final').find('.nnplus__invalid').removeClass('nnplus__invalid');
      removeError($('.item-final'));

    }
    //////
    if ( $('#childHealthNo').is(':checked') ){
      $('#hidden-fields--childHealth').slideDown();
    }else{
      $('#hidden-fields--childHealth').slideUp();
    }
    //////
    if ( $('#abortSelfYes').is(':checked') ){
      
      $('#hidden-fields--abortSelf').slideDown(200,function(){
        toggleIsvalid($(this).closest('.nnplus__form-group'), true);
      });
    }else{
      toggleIsvalid($(this).closest('.nnplus__form-group'), false);
      $('#hidden-fields--abortSelf').slideUp();
    }
    //////
    if ( $('#abortMedicYes').is(':checked') ){
      
      $('#hidden-fields--abortMedic').slideDown(200, function(){
        toggleIsvalid($(this).closest('.nnplus__form-group'), true);
      });
    }else{
      toggleIsvalid($(this).closest('.nnplus__form-group'), false);
      $('#hidden-fields--abortMedic').slideUp();
    }
    //////
    if ( $('#pregnantDevelopYes').is(':checked') ){
      
      $('#hidden-fields--pregnantDevelop').slideDown(200,function(){
        toggleIsvalid($(this).closest('.nnplus__form-group'), true);
      });
    }else{
      toggleIsvalid($(this).closest('.nnplus__form-group'), false);
      $('#hidden-fields--pregnantDevelop').slideUp();
    }
    //////
    if ( $('#abortKaryotypingYes').is(':checked') ){
      $('#hidden-fields--abortKaryotyping').slideDown();
    }else{
      $('#hidden-fields--abortKaryotyping').slideUp();
    }
    //////toPreviousPregnant
    if ( $('#firstPregnancyNo').is(':checked') ){
      $('.nnplus__current-pregnant').fadeOut(200, function(){
        $('.nnplus__previous-pregnant').fadeIn(200).find('.nnplus__form-input.w230').addClass('nnplus__isvalid')
      });
    }else{
        // $('.nnplus__previous-pregnant').find('.nnplus__isvalid').removeClass('nnplus__isvalid');
    }
    //////
  });
  ////end nnplus__checkbox-input
//cnahge input invalid
$('body').on('input', '.nnplus__invalid .nnplus__isvalid', function(){
  $(this).closest('.nnplus__invalid').removeClass('nnplus__invalid');
  removeError($(this).closest('.item'));
});

$('body').on('change', '.nnplus__invalid select.nnplus__isvalid', function(){
  $(this).closest('.nnplus__invalid').removeClass('nnplus__invalid');
  removeError($(this).closest('.item'));
});

$('body').on('click', '.addYear', function(){
  if( $(this).hasClass('addYear1') ){
    $(abortTemplate1).insertBefore($(this));
  }
  if( $(this).hasClass('addYear2') ){
    $(abortTemplate2).insertBefore($(this));
  }

});

$('.nnplus-anketa').submit(function(e){

  if ( !nnplusValid( $('.item-final').find('.nnplus__isvalid')) ){
    e.preventDefault();
    slider.addErrorMessage($('.item-final'));
    return;
  }
});

});



},{}]},{},[1])