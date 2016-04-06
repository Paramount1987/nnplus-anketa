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
          return
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
          return
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
          return
        }else{
          that.changePagination( $('.pagination').find('.current-li').index() , $(this).index());
          that.slideTo(current, goIndex);
        }
      });
    }

  };


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

  ////document is ready
  $(document).ready(function(){
    slider.init();

    ///////////////////////////nnplus-select
    $(".nnplus-select").chosen({
      disable_search: true,
      placeholder_text_single: 'Выберите из списка',
      width: "170px"
    });
  });
  //toCurrentPregnant
  $('body').on('click', '.toCurrentPregnant', function(){
    $('.nnplus__previous-pregnant').fadeOut(200, function(){
      $('.nnplus__current-pregnant').fadeIn(200)
    });
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
      $('#relatedMarriage').slideDown();
    }else{
      $('#relatedMarriage').slideUp();
    }
    //////
    if ( $('#screeningYes').is(':checked') ){
      $('#hidden-fields--screening').slideDown();
    }else{
      $('#hidden-fields--screening').slideUp();
    }
    //////
    if ( $('#childHealthNo').is(':checked') ){
      $('#hidden-fields--childHealth').slideDown();
    }else{
      $('#hidden-fields--childHealth').slideUp();
    }
    //////
    if ( $('#abortSelfYes').is(':checked') ){
      $('#hidden-fields--abortSelf').slideDown();
    }else{
      $('#hidden-fields--abortSelf').slideUp();
    }
    //////
    if ( $('#abortMedicYes').is(':checked') ){
      $('#hidden-fields--abortMedic').slideDown();
    }else{
      $('#hidden-fields--abortMedic').slideUp();
    }
    //////
    if ( $('#pregnantDevelopYes').is(':checked') ){
      $('#hidden-fields--pregnantDevelop').slideDown();
    }else{
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
        $('.nnplus__previous-pregnant').fadeIn(200)
      });
    }
    //////
  });
  ////end nnplus__checkbox-input


});


