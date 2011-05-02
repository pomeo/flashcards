$(document).ready(function() {
    if(!($(".b-card").length)) {
      var word = {word: "example", transcription: "[ɪg'zɑːmpl]", translate: "пример"};
      var encoded = $.toJSON(word);
      if ($.jStorage.get(1)) {
        listw();
      } else {
        $.jStorage.set(1,encoded);
        listw();
      }
    }
    $("#closebox").click(function(){
        $(".b-overlay").addClass("g-hidden");
        $(".b-box-add").addClass("g-hidden");
      });
    $("#add").click(function(){
        $(".b-overlay").removeClass("g-hidden");
        $(".b-box-add").removeClass("g-hidden");
      });
    $(".b-card").live("mouseenter mouseleave", function(event) {
        if (!($(this).hasClass("g-edit"))) {
          if (event.type == "mouseenter") {
            $(this).addClass("g-active");
            $(this).find(".b-card-edit").fadeIn(700, function(){
                $(this).removeClass("g-hidden");
              });
            $(this).find(".b-card-delete").fadeIn(700, function(){
                $(this).removeClass("g-hidden");
              });
          } else {
            $(this).removeClass("g-active");
            $(this).find(".b-card-edit").fadeOut(700, function(){
                $(this).addClass("g-hidden");
              });
            $(this).find(".b-card-delete").fadeOut(700, function(){
                $(this).addClass("g-hidden");
              });
          }
        }
      });
    
    $(".b-card-edit").live("click", function() {
        $(this).parent().addClass("g-edit");
        $(this).hide();
        $(this).parent().find(".b-card-delete").hide();
        $(this).parent().find(".b-card-accept").removeClass("g-hidden");
        $(".g-edit > .b-card-box > .b-card-word").editable(function(value, settings) {
            return(value);
          }, { 
          tooltip: "Нажмите чтобы отредактировать"
              });
        $(".g-edit > .b-card-box > .b-card-transcription").editable(function(value, settings) {
            if (value) {
              $(this).closest(".b-card").removeClass("g-without-trans");
            } else {
              $(this).closest(".b-card").addClass("g-without-trans");
            }
            return(value);
          }, { 
          tooltip: "Нажмите чтобы отредактировать"
              });
        $(".g-edit > .b-card-box > .b-card-translate").editable(function(value, settings) {
            return(value);
          }, { 
          tooltip: "Нажмите чтобы отредактировать"
              });
      });

    $(".b-card-accept").live("click", function() {
        $(this).parent().removeClass("g-edit");
        $(this).addClass("g-hidden");
        $(this).parent().find(".b-card-delete").show();
        $(this).parent().find(".b-card-edit").show();
      });
    
    $(".b-card-delete").live("click", function() {
        $(this).parent().fadeOut(700, function(){
            $(this).remove();
          });
        var id = $(this).parent().attr("id").slice(2);
        $.jStorage.deleteKey(id);
      });
    
    var options = {
        clearForm: true,
        beforeSubmit: showRequest
    }; 

    $("#addcard").ajaxForm(options);
  });

function showRequest(formData, jqForm, options) {
  var queryString = decodeURIComponent($.param(formData).slice(5));
  var queryString = queryString.replace(/\+/, " ");

  $.translate(queryString, "en", "ru", {
    complete:function(){
        var id = (parseInt(($.jStorage.index()).slice(-1)))+1;
        console.log(id);
        var word = {word: queryString, transcription: "", translate: this.translation};
        var encoded = $.toJSON(word);
        $.jStorage.set(id,encoded);
        gener(queryString,"",this.translation,id);
      }
    });
  
  return true;
}

function gener(a, b, c, id) {
  if (!b) {
    b = '';
  }
  if (!c) {
    c = '';
  }
  if (!id) {
    id = '';
  }
  if ($(".b-card:first").length) {
    $("<div id=\"id" + id + "\" class=\"b-card g-without-trans\"><ul class=\"b-card-box\"><li class=\"b-card-info\">Чтобы отредактировать кликните на слово, после изменений нажмите ввод. Когда закончите нажмите на зеленый значок справа вверху</li><li class=\"b-card-word-info\">слово</li><li class=\"b-card-word\">" + a + "</li><li class=\"b-card-transcription-info\">транскрипция</li><li class=\"b-card-transcription\">" + b + "</li><li class=\"b-card-translate-info\">перевод</li><li class=\"b-card-translate\">" + c + "</li></ul><a class=\"b-card-edit g-hidden\" href=\"#\" title=\"редактировать карту\"></a><a class=\"b-card-delete g-hidden\" href=\"#\" title=\"удалить карту\"></a><a class=\"b-card-accept g-hidden\" href=\"#\" title=\"сохранить\"></a></div>").fadeIn(700).insertBefore(".b-card:first");
  } else {
    $("<div id=\"id" + id + "\" class=\"b-card g-without-trans\"><ul class=\"b-card-box\"><li class=\"b-card-info\">Чтобы отредактировать кликните на слово, после изменений нажмите ввод. Когда закончите нажмите на зеленый значок справа вверху</li><li class=\"b-card-word-info\">слово</li><li class=\"b-card-word\">" + a + "</li><li class=\"b-card-transcription-info\">транскрипция</li><li class=\"b-card-transcription\">" + b + "</li><li class=\"b-card-translate-info\">перевод</li><li class=\"b-card-translate\">" + c + "</li></ul><a class=\"b-card-edit g-hidden\" href=\"#\" title=\"редактировать карту\"></a><a class=\"b-card-delete g-hidden\" href=\"#\" title=\"удалить карту\"></a><a class=\"b-card-accept g-hidden\" href=\"#\" title=\"сохранить\"></a></div>").fadeIn(700).insertAfter(".b-box");
  }
}

function limiter(fild, size) {
  if (fild.value.length > size) {
    fild.value = fild.value.substring(0, size);
  }
}

function listw() {
  var index = $.jStorage.index();
  index.forEach(function(i){
      var w = $.jStorage.get(i);
      var word = $.evalJSON(w).word;
      var transcription = $.evalJSON(w).transcription;
      var translate = $.evalJSON(w).translate;
      gener(word,transcription,translate,i);
      console.log(word);
    });
}
