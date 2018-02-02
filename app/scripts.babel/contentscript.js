'use strict';

$(function () {
  let r = 0;
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    //console.log(msg);
      if (msg.value) {
        r = msg.value;
        console.log('Receive value = ' + r);
        chrome.storage.local.set({'r':r}, function(){console.log('Set', r);});
        sendResponse(r);
      } else {
        sendResponse('Value message is none.');
      }
  });

  chrome.storage.local.get(
    function(value) {
      if(value)
      {
        r = value.r
        console.log('Get', r);
      }
    }
  );

  $('a').click(function(){
    const ran = Math.floor( Math.random() * 101 );
    console.log(ran, r, ran >= parseInt(r));
    if(r != undefined){
      if(ran >= parseInt(r)){
        //count+=1;
        return false;
      }
    }
  });
});

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
    console.log(count, r);
    if(r != undefined){
      if(ran > r/100.0){
        count+=1;
        return false;
      }
    }
  });
});*/
