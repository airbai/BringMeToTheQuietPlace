

$(function () {
    var beRedirectedSites = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [];
    var targetPlaces = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
    $.each(beRedirectedSites, function (k, v) {
        $('#txtBeRedirect').parent().before(['<li><span class="site" site>', v, '</span><span del><button class="del"></button></li>'].join(''));
    });

    $.each(targetPlaces, function (k, v) {
        var place = v.place;
        var isDefault = v.isDefault;
        var className = isDefault ? 'default' : '';

        $('#txtRedirect').parent().before(['<li class="', className, '"><span class="site" place>', place, '</span><span del><button class="default">Make default</button><button class="del"></button></li>'].join(''));
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

    $('button.del').live('click', function () {
        var place = $(this).parent().prev('span').text();
        var places = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [];
        places.splice($.inArray(place, places));
        localStorage["beRedirectedSites"] = JSON.stringify(places);

        $(this).parentsUntil('ul').remove();
    });

    $('button.default').live('click', function () {
        var places = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
        var place = $(this).parentsUntil('ul').children('span[place]').text();
        if (place) {
            $.each(places, function (k, v) {
                if (v && v.place == place) {
                    v.isDefault = true;
                    return false;
                }
                else {
                    v.isDefault = false;
                }
            });
            localStorage["thequiteplace"] = JSON.stringify(places);
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
            }
        }
    });
});