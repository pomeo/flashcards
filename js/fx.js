$(document).ready(function() {
    if($(".b-card").length) {
      
    } else {
      
    }
    $("#closebox").click(function(){
        $(".b-overlay").addClass("g-hidden");
        $(".b-box-add").addClass("g-hidden");
      });
    $("#add").click(function(){
        $(".b-overlay").removeClass("g-hidden");
        $(".b-box-add").removeClass("g-hidden");
      });
    $('.b-card').live('mouseenter mouseleave', function(event) {
        if (event.type == 'mouseenter') {
          $(this).addClass("g-active");
          $(this).find(".b-card-edit").fadeIn(700, function(){
              $(this).removeClass("g-hidden");
            });
          $(this).find(".b-card-delete").fadeIn(700, function(){
              $(this).removeClass("g-hidden");
            });
          //              $('.b-card-translate').editable(function(value, settings) {
          //                  return(value);
          //                }, { 
          //                  //type    : 'text',
          //                submit  : 'OK'
          //                    });
        } else {
          $(this).removeClass("g-active");
          $(this).find(".b-card-edit").fadeOut(700, function(){
              $(this).addClass("g-hidden");
            });
          $(this).find(".b-card-delete").fadeOut(700, function(){
              $(this).addClass("g-hidden");
            });
        }
      });
    
    $(".b-card-edit").live('click', function() {

      });

    $(".b-card-delete").live('click', function() {
        $(this).parent().fadeOut(700, function(){
            $(this).remove();
          });
      });
    
    var options = {
        clearForm: true,
        beforeSubmit: showRequest
    }; 

    $('#addcard').ajaxForm(options);
  });

function showRequest(formData, jqForm, options) {
  var queryString = decodeURIComponent($.param(formData).slice(5));
  var queryString = queryString.replace(/\+/, " ");
  
  if($(".b-card:first").length) {
    $("<div class=\"b-card g-without-trans\"><dl><dt class=\"b-card-word\">" + queryString + "</dt><dd class=\"b-card-transcription\"></dd><dd class=\"b-card-translate\"></dd></dl><a class=\"b-card-edit g-hidden\" href=\"#\" title=\"редактировать карту\"></a><a class=\"b-card-delete g-hidden\" href=\"#\" title=\"удалить карту\"></a></div>").fadeIn(700).insertBefore(".b-card:first");
  } else {
    $("<div class=\"b-card g-without-trans\"><dl><dt class=\"b-card-word\">" + queryString + "</dt><dd class=\"b-card-transcription\"></dd><dd class=\"b-card-translate\"></dd></dl><a class=\"b-card-edit g-hidden\" href=\"#\" title=\"редактировать карту\"></a><a class=\"b-card-delete g-hidden\" href=\"#\" title=\"удалить карту\"></a></div>").fadeIn(700).insertAfter(".b-box");
  }

  $.translate(queryString, 'en', 'ru', {
    complete:function(){
        $(".b-card:first > dl > .b-card-translate").text(this.translation);
      }
    });
  
  return true;
}

function limiter(fild, size) {
  if (fild.value.length > size) {
    fild.value = fild.value.substring(0, size);
  }
}
