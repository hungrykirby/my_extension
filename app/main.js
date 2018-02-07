'use strict';

$(function(){
  let value = 50;

  chrome.storage.local.get(
    function(v) {
      if(v)
      {
        //console.log('Get on tab ', v.r);
        value = v.r;
        $('.percentage').text(value + '%');
        $('.bar').val(parseInt(value));
        chrome.browserAction.setBadgeText({ text: String(value) });
      }
    }
  );

  $('.bar').on('change',
    function(){
      let r = $(this).val();
      value = r;
      //$('<div><p>今は' + r + '%</p></div>').prependTo('body');
      $('.percentage').text(value + '%');
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          value: r
        },function(msg) {
          //console.log("result message:", msg);
          if(msg == undefined) alert('エラー！!このページでは実行できません');
        });
      });
      chrome.browserAction.setBadgeText({ text: String(value) });
    }
  );
})

/*
$(function () {
  let count = 0;
  let r = 0;

  chrome.storage.local.get(
    function(value) {
      r = value.r
      console.log('Get', r);
    }
  );

  $('<div class="bar-wrap"><input class="bar" type="range" name="sample1" min="0" max="100" style="width:90%"></div>').prependTo('body');
  $('.bar').on('change',
    function(){
      r = $(this).val();
      $('<div><p>今は' + r + '%</p></div>').prependTo('body');
      chrome.storage.local.set({
        'r':r
      }, function(){
        console.log('Set', r);
      });
    });
  //$('.bar').css('width':'100%', 'height':'100px');
  $('a').click(function(){
    const ran = Math.floor( Math.random() * 11 );
    console.log(count, r, ran);
    if(r != undefined){
      if(ran > r/10.0){
        count+=1;
        return false;
      }
    }
  });
});
*/
