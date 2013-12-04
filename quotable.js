( function( window, undefined ) {
    var document = window.document,
        body = document.getElementsByTagName( 'body' )[0],
        tweetDiv = null,
        text = '';
    
    function tweeter( x, y ) {              
        if ( null !== tweetDiv ) {
            tweetDiv.parentNode.removeChild( tweetDiv );
			tweetDiv = null;
        }
        
        if ( 0 === text.toString().length ) {
            return;
        }
        
        tweetDiv = document.createElement( 'div' );
        tweetDiv.className = 'dyn-tweet-this';
        var anchor = document.createElement( 'a' );
        anchor.className = 'twitter-share-button';
        anchor.href = 'https://twitter.com/share?url=' + encodeURI( window.location ) + '&text=' + encodeURI( text );
        anchor.setAttribute( 'data-lang', 'en' );
        var label = document.createTextNode( 'Tweet This' );
        anchor.appendChild( label );
        tweetDiv.appendChild( anchor );
		
		var script = document.createElement( "script" );
		script.type = "text/javascript";
		script.src = "https://platform.twitter.com/widgets.js";
		tweetDiv.appendChild( script );
        
        tweetDiv.style.position = 'absolute';
        tweetDiv.style.top = y + 'px';
        tweetDiv.style.left = x + 'px';
        
        body.appendChild( tweetDiv );
		
		// Scan for unloaded widgets.
		//window.twttr.widgets.load();
    }
    
    function get( e ) {
		console.log( e );
        text = document.all ? document.selection.createRange().text : document.getSelection();
        tweeter( e.pageX, e.pageY );
    }
    
    document.onmouseup = get;
    
    if ( ! document.all ) {
        document.captureEvents( Event.MOUSEUP );
    }
} )( window );