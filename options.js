

$(function () {
    var backgroundPage = chrome.extension.getBackgroundPage();
    var i18n = backgroundPage.util.i18n;
    document.title = i18n('extName');
    var makeDefaultMessage = i18n('optionsMakeDefault');
    var optionsInputSiteDomainToAdd = i18n('optionsInputSiteDomainToAdd');
    $('#txtRedirect').attr('placeholder', optionsInputSiteDomainToAdd);
    $('#txtBeRedirect').attr('placeholder', optionsInputSiteDomainToAdd);
    $('#optionsSetupThePlaces').html(i18n('optionsSetupThePlaces'));
    $('#optionsPlacesWantToEscape').html(i18n('optionsPlacesWantToEscape'));
    $('#optionsTheQuietPalces').html(i18n('optionsTheQuietPalces'));

    var beRedirectedSites = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [];
    var targetPlaces = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
    $.each(beRedirectedSites, function (k, v) {
        $('#txtBeRedirect').parent().before(['<li><span class="site" site>', v, '</span><span del><button class="del"></button></li>'].join(''));
    });

    $.each(targetPlaces, function (k, v) {
        var place = v.place;
        var isDefault = v.isDefault;
        var className = isDefault ? 'default' : '';

        $('#txtRedirect').parent().before(['<li class="', className, '"><span class="place" place><a target="_blank" href="', place, '">', place, '</a></span><span del><button class="default">', makeDefaultMessage,'</button><button class="del"></button></li>'].join(''));
    });

    $('#txtRedirect').val('');

    $('#txtBeRedirect').bind('blur keypress', function () {
        if (event.type == 'blur' || (event.type = 'keypress' && event.which == '13')) {
            var sites = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [];
            var newSite = $(this).val();
            if (newSite) {
                $.merge(sites, [newSite]);

                localStorage["beRedirectedSites"] = JSON.stringify(sites);
                $('#txtBeRedirect').parent().before(['<li>', newSite, '</li>'].join(''));
                $(this).val('');

                window.location.href = window.location.href;
            }
        }
    });

    $('ul>li').live('mouseenter', function () {
        if (!$(this).attr('class') || ($(this).attr('class')&&$(this).attr('class').indexOf('default') == -1)) {
            $(this).find('span[del]>button.del, span[del]>button.default').show();
        }
    }).live('mouseleave', function () {
        $(this).find('span[del]>button.del, span[del]>button.default').hide();
    });

    $('#ulBeRedirect').find('button.del').live('click', function () {
        var place = $(this).parent().prev('span').text();
        var places = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [];
        places.splice($.inArray(place, places));
        localStorage["beRedirectedSites"] = JSON.stringify(places);

        $(this).parentsUntil('ul').remove();
    });

    $('#ulQuietPlaces').find('button.del').live('click', function () {
        var places = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
        var li = $(this).parentsUntil('ul');
        var place = li.children('span[place]').text();
        if (place) {
            $.each(places, function (k, v) {
                if (v && v.place == place) {
                    places.splice(k);
                    localStorage["thequiteplace"] = JSON.stringify(places);
                    li.remove();
                    return false;
                }
            });
        }
    });

    $('button.default').live('click', function () {
        var places = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
        var li = $(this).parentsUntil('ul');
        var place = li.children('span[place]').text();
        if (place) {
            $.each(places, function (k, v) {
                if (v && v.place == place) {
                    v.isDefault = true;
                }
                else {
                    li.removeAttr('class');
                    v.isDefault = false;
                }
            });
            localStorage["thequiteplace"] = JSON.stringify(places);

            window.location.href = window.location.href;
        }
    });

    $('#txtRedirect').bind('blur keypress', function () {
        if (event.type == 'blur' || (event.type = 'keypress' && event.which == '13')) {
            var sites = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
            var newSite = $(this).val();
            if (newSite) {
                $.merge(sites, [{ place: newSite, isDefault: false}]);

                localStorage["thequiteplace"] = JSON.stringify(sites);
                $('#txtRedirect').parent().before(['<li>', newSite, '</li>'].join(''));
                $(this).val('');
                window.location.href = window.location.href;
            }
        }
    });
});