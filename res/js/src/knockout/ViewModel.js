var ViewModel = function () {
	var self = this;

	self._dateFormat	= 'MMM D, YYYY';
	self._filterEnd		= ko.observable(null);
	self._filterStart	= ko.observable(null);
	self._isPaginating	= ko.observable(false); 
	self._reviews		= ko.observableArray([]);
	self._searching		= ko.observable(false);
	self._searchURL		= ko.observable('');
	self._start			= ko.observable(0);


	self.filteredReviews = ko.computed( function () {
		return self._reviews().slice( self._filterStart(), self._filterEnd() );
	});

	self._averageReviews = ko.computed( function () {
		var reviews = self.filteredReviews(),
		    aRatings = 0,
		    i = 0,
		    len = reviews.length;

		for ( i = 0; i < len; i++ ) {
			aRatings += parseInt( reviews[i].rating );
		}

		return (aRatings == 0) ? '' : (aRatings / len).toFixed(1);
	});

	self.data2json = ko.computed( function () {
		return JSON.stringify( self._reviews() );
	});

	self.export2csv = function () {

	},

	self.getReviews = function () {
		$.ajax({
			url: 'yelpscrape.php',
			method: 'GET',
			dataType: 'json',
			data: {
				yelpURL: self._searchURL(),
				start: self._start()
			},
			success: function ( data ) {
				var i = 0,
				    newStart = null,
				    starts = [],
				    bIsAtEnd = ( self._filterEnd() == null || self._filterEnd() == self._reviews().length - 1 );

				self._reviews( self._reviews().concat( data.reviews ) );

				self.resetSliderSteps( bIsAtEnd );

				starts = data.starts;

				for ( i = 0; i < starts.length; i++ ) {
					if( starts[i] > self._start() ) {
						newStart = starts[i];
						break;
					}
				}

				if ( newStart ) {
					self._start( newStart );
					self.getReviews();
				}
				else {
					self._searching( false );
				}
			},
			complete: function () {
			}
		});
	},

	self.momentDate = function ( sDate ) {
		var mDate = moment( sDate );
		return mDate.format( self._dateFormat );
	},

	self.resetSliderSteps = function ( bIsAtEnd ) {
		// Ugly... Manipulates client-side code, but jQuery doesn't present a 
		// data-binding alternative
		var reviews = self._reviews(),
		    steps = reviews.length,
		    end = 0,
		    values = [];

		if ( self._filterStart() == null ) {
			self._filterStart( 0 );
		}

		if ( bIsAtEnd ) {
			self._filterEnd( reviews.length - 1 );
		}
		else {
			// Magic number. The service returns 20 records at a time
			values = $( "#yelprng" ).slider( "option", "values" );
			end = values[0] + 20;
		}

		$('#yelprng').slider('option', {
			max: steps,
			steps: steps,
			values: [end, steps - self._filterStart()]
		})
	},

	self.searchForReviews = function () {
		self._searching( true );
		self._filterEnd( null );
		self._filterStart( null );
		self._reviews.removeAll();
		self._start( 0 );

		self.getReviews();
	};

	//API
	return {
		rngStart: self._filterStart,
		rngEnd: self._filterEnd,

		avgReview: self._averageReviews,
		search: self.searchForReviews,
		searchURL: self._searchURL,

		endDate: ko.computed( function () {
			if ( self._filterEnd() != null && self._reviews().length > 0 ) {
				return self.momentDate( self._reviews()[ self._filterEnd() ].date );
			}

			return null;
		}),

		exportdata: self.data2json,

		formatDate: self.momentDate,

		isFirstLoad: ko.computed( function () {
			var r = self._reviews();
			return ( self._searching() == true && r.length == 0 );
		}),

		isLoadingPages: ko.computed( function () {
			var r = self._reviews();
			return ( self._searching() == true && r.length > 0 );
		}),

		raw: self,

		reviews: self.filteredReviews,

		searchButtonEnabled: ko.computed( function () {
			return self._searchURL() != '';
		}),

		startDate: ko.computed( function () {
			if ( self._filterStart() != null && self._reviews().length > 0 ) {
				return self.momentDate( self._reviews()[ self._filterStart() ].date );
			}
			return null;
		}),

		filterReviews: function ( a, b ) {
			var r = self._reviews();

			// B looks like the end, but it actually refers to the start of the array
			self._filterStart( r.length - b );
			// A looks like the end, but it actually refers to the offset from the end
			self._filterEnd( r.length - 1 - a );

			// console.log(a, b);
			// console.log( self._filterStart(), self._filterEnd() );
		},

		selectAll: function ( data, evt ) {
			evt.target.select();
		}
	};
};