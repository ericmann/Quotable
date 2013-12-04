( function( window, undefined ) {
    var document = window.document,
        body = document.getElementsByTagName( 'body' )[0],
        tweetDiv = null,
        text = '';
	
	/**
	 * Twitter's URL shortener will always shorten links to 22 characters. We need to truncate
	 * text automatically to make sure the tweet as a whole is less than 140 characters. But we
	 * also want to add quotes and ellipsis.
	 */
	function shortenText() {
		text = text.toString();
		text = text.trim();
		text = '"' + text;
		if ( text.length > 116 )
			text = text.substring( 0, 115 ) + '…';
		
		text = text + '"';
	}
	
	/**
	 * Remove the Twitter button and reset things.
	 */
	function remove() {
		tweetDiv.parentNode.removeChild( tweetDiv );
		tweetDiv = null;
		text = '';
	}
    
	/**
	 * Create the Twitter button node.
	 *
	 * @param {number} x
	 * @param {number} y
	 */
    function tweeter( x, y ) {              
        if ( null !== tweetDiv )
			remove();
		       
        if ( 0 === text.toString().length )
            return;
		
		shortenText();
        
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
    }
	
	/**
	 * Clear any active selection so we don't double-print the Twitter button.
	 */
	function clear() {
		if ( window.getSelection ) {
			window.getSelection().empty() || window.getSelection().removeAllRanges();
		} else if ( document.selection ) {
			document.selection.empty();
		}
	}
    
	/**
	 * Intercept any mouseup events and check to see if we have a selected range of text.
	 */
    function get( e ) {
		document.onmousedown = clear;
		
		if ( ! document.all )
			document.captureEvents( Event.MOUSEDOWN );
		
        text = document.all ? document.selection.createRange().text : document.getSelection();
        tweeter( e.pageX, e.pageY );
    }
    
    document.onmouseup = get;
    
    if ( ! document.all )
        document.captureEvents( Event.MOUSEUP );
} )( window );