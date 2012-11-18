$(function(){
	var backgroundPage = chrome.extension.getBackgroundPage();
	var i18n = backgroundPage.util.i18n;
	$('#title').html(i18n('popupTheQuietPlaceProjectTitle'));
	$('#desc').html(i18n('popupTheQuietPlaceProjectDesc'));
	$('#choose').html(i18n('popupEnable'));
	$('#notchoose').html(i18n('popupDisable'));
	var radioEls = document.querySelectorAll("#chooseOptions input");

	chrome.extension.sendMessage({"action":"getChoose"}, function(res){
		if (res.choose == "true") {
		  radioEls[0].checked = true;
		} else {
		  radioEls[1].checked = true;
		}
	});
	radioEls[0].onclick = function() {
  		chrome.extension.sendMessage({"action": "setChoose", "choose":"true"});
	};
	radioEls[1].onclick = function() {
  		chrome.extension.sendMessage({"action": "setChoose", "choose":"false"});
	};
});



