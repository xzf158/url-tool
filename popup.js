var matches = ['http://*/*', 'https://*/*', 'ftp://*/*'],
    noMatches = [/^https?:\/\/chrome.google.com\/.*$/];

function testURLMatches(url) {
    var r, i;
    for (i = noMatches.length - 1; i >= 0; i--) {
        if (noMatches[i].test(url)) {
            return false;
        }
    }
    for (i = matches.length - 1; i >= 0; i--) {
        r = new RegExp('^' + matches[i].replace(/\*/g, '.*') + '$');
        if (r.test(url)) {
            return true;
        }
    }
    return false;
}

$(function() {
    chrome.tabs.getSelected(null, function(tab) {
        if (testURLMatches(tab.url)) {
            $.get("http://xzf.me/shorten.php?longurl=" + encodeURI(tab.url),function(data){
                $("#shortUrl").attr("href", data).html(data.replace("http://",""));
                $("#qr").css("opacity",0).attr("src","http://qr.liantu.com/api.php?el=1&w=150&m=0&text=" + data).animate({"opacity":1}, 500);
            });
            // $("#qr").attr("src","http://chart.apis.google.com/chart?chs=150x150&cht=qr&chld=L|0&chl="+encodeURI("http://"+data.url));
        }else{
            $("#container").html("<span style='color:red; margin:10px;display:block;'>Opps! 当前标签不是可用的Url。 </span>").height(40);
        }
    });
});