/* JavaScript to go through an entire document, finding all the
sections (h2 elements), and creating a table of contents at the top of
the document with page-internal hyperlinks to each section.

This implementation is text-based, creating elements via the innerHTML
property, since quirksmode.org has tested the performance of the DOM and
the innerHTML method is significantly faster.

The implementation relies on the user helping out by indicating where the
TOC should go, with a element with the ID of 'insert_TOC_here' The
innerHTML of that element will be set, so anything that it has will go
away.

Scott D. Anderson
October 26, 2010
*/

// returns the ID of an element if it already has one, otherwise
// assigns one (the second argument). Returns whatever ID the element
// has when this is done.
function elementID(elt,assign_id) {
    if( elt.id == "" ) {
      elt.id = assign_id;  // modify the element to have an id.
    } 
    return elt.id;
}

function insertTOC_textual() {
    var start_time = (new Date()).getTime();
    var toc_elt = document.getElementById('insert_TOC_here');
    if( toc_elt == null ) {
        console.log("Couldn't find where to put TOC, elt id='insert_TOC_here'");
        return;
        /*
        var warning = document.createElement('P');
        warning.innerHTML = "Couldn't find where to put TOC";
        document.body.insertBefore(warning,document.body.firstChild);
        return;
        */
    }

    var all_h2_elts = document.getElementsByTagName('h2');

    toc_elt.innerHTML = "processing "+all_h2_elts.length+" headers";
    if( all_h2_elts.length == 0 ) {
        // give up if there are no sections;
        return;
    }

    // For the textual version, we're going to build up a string of HTML
    // code, and insert it when we're done.
    var toc_list_items = "";

    for( var i=0; i<all_h2_elts.length; i++ ) {
        var h2 = all_h2_elts[i];
        var id = elementID(h2,'section_'+i);
        // Create the HTML for the list item.  Hope that h2's contents is just text.
        var li = "<li><a href='#"+id+"'>"+h2.innerHTML+"</a>\n";
        // Concatenate it onto the end of our list
        toc_list_items += li;
    }
    // Done looping, so insert the HTML for the TOC
    // Maybe, someday, define default behavior: show/hide
    toc_elt.innerHTML = "<p>hide Table of Contents"+
        "<ul id='TOC_list' style='display: block'>\n"+
        toc_list_items+
        "</ul>\n";
    var widget = toc_elt.firstChild;
    widget.onclick = function () {
        var next=document.getElementById('TOC_list');
        if( next.style.display == 'block' ) {
            next.style.display = 'none';
            widget.innerHTML = 'show Table of Contents';
        } else {
            next.style.display = 'block';
            widget.innerHTML = 'hide Table of Contents';
        }
    }
    var end_time = (new Date()).getTime();
    var elapse = end_time - start_time;
    console.log("computing the TOC took "+elapse+" ms");
}

// ================================================================ 
// Assume this is loaded after the HTML, so we can just go ahead and do it.

insertTOC_textual();
