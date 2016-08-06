ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

var vm = new ViewModel();
ko.applyBindings( vm );

$(function () {
    $( "#yelprng" ).slider({
        range: true,
        min: 0,
        max: 10,
        steps: 10,
        values: [ 0, 10 ],
        slide: function( event, ui ) {
            vm.filterReviews( ui.values[0], ui.values[1] );
        }
    });

    $('#yelpURL').focus();
});