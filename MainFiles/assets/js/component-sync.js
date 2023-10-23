function syncHTML(sourceURL,targetId, sourceId, insertMode) {
    $.when(
        $.get(sourceURL),
    ).then(function (html){
        let domparser = new DOMParser();
        var sourceElement = domparser
            .parseFromString(html,"text/html")
            .getElementById(sourceId)
        
        var target = document.getElementById(targetId)
        var parent=target.parentElement
        
        if(insertMode=='replace'){
            
            parent.insertBefore(sourceElement,target);
            parent.removeChild(target)
        }
        
        if(insertMode=='append'){
            parent.appendChild(sourceElement)
        }
        
    });
}