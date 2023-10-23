function copy(value,callback){
   	const input = document.createElement('input')
   	document.body.appendChild(input)
   	input.setAttribute('value', value)
   	input.select()  	
   	if (document.execCommand('copy')) {
        document.execCommand('copy')
        callback()
    }
 	document.body.removeChild(input)
}


function copy_and_alert(value,al){
	copy(value,function(){
		alert(al)
	})
}

function copy_component(id,callback){
	let value=document.getElementById(id).innerHTML
	copy(value,callback)
}

function copy_component_and_alert(id,al){
	copy_component(id,function(){
		alert(al)
	})
}