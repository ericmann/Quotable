( function( window, undefined ) {
    var document = window.document,
        body = document.getElementsByTagName( 'body' )[0],
        tweetDiv = null,
        text = '';
    
    function tweeter( x, y ) {       
        if ( ! document.getElementById( 'twitter-wjs' ) ) {
            var first = document.getElementsByTagName( 'script' )[0];
            var script = document.createElement( 'script' );
            script.id = 'twitter-wjs';
            script.src = 'https://platform.twitter.com/widgets.js';
            
            first.parentNode.insertBefore( script, first );
        }
        
        if ( null !== tweetDiv ) {
            body.removeChild( tweetDiv );
        }
        
        if ( 0 === text.toString().length ) {
            return;
        }
        
        tweetDiv = document.createElement( 'div' );
        tweetDiv.class = 'dyn-tweet-this';
        var anchor = document.createElement( 'a' );
        anchor.class = 'twitter-share-button';
        anchor.href = 'https://twitter.com/share?url=' + encodeURI( window.location ) + '&text=' + encodeURI( text );
        anchor.setAttribute( 'data-lang', 'en' );
        var label = document.createTextNode( 'Tweet This' );
        anchor.appendChild( label );
        tweetDiv.appendChild( anchor );
        
        tweetDiv.style.position = 'absolute';
        tweetDiv.style.top = y + 'px';
        tweetDiv.style.left = x + 'px';
        
        body.appendChild( tweetDiv );
    }
    
    function get( e ) {
        text = document.all ? document.selection.createRange().text : document.getSelection();
        tweeter( e.pageX, e.pageY );
    }
    
    document.onmouseup = get;
    
    if ( ! document.all ) {
        document.captureEvents( Event.MOUSEUP );
    }
} )( window );