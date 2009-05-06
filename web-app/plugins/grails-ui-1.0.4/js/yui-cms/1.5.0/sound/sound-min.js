/*
Copyright (c) 2007, Caridy Patino. All rights reserved.
Portions Copyright (c) 2007, Yahoo!, Inc. All rights reserved.
Code licensed under the BSD License:
http://www.bubbling-library.com/eng/licence
version: 1.5.0
*/
(function(){var $B=YAHOO.Bubbling,$E=YAHOO.util.Event,$D=YAHOO.util.Dom,$L=YAHOO.lang;YAHOO.plugin.SoundManager=function(){var obj={},_isReady=false,_sounds={},_id='soundManagerObject';_handle=null,_defConfing={repeating:false,volume:80,onLoad:null,onPlay:null,onStop:null};function action(el,track){if(el&&(el.getAttribute('rel'))){obj.play(el.getAttribute('rel'),track);}}$B.on('rollover',function(layer,args){$B.processingAction(layer,args,{soundOnRollover:function(layer,args){action(args[1].el);return false;}},true);});$B.on('navigate',function(layer,args){$B.processingAction(layer,args,{soundOnClick:function(layer,args){action(args[1].el);return false;},soundMasterTrack:function(layer,args){action(args[1].el,'master');return false;},soundOnMute:function(layer,args){var c=null;if(args[1].target&&(c=$D.getAncestorByClassName(args[1].target,'yui-cms-sound-control'))){$D.addClass(c,'mute');}obj.mute=true;return true;},soundOnPlay:function(layer,args){var c=null;if(args[1].target&&(c=$D.getAncestorByClassName(args[1].target,'yui-cms-sound-control'))){$D.removeClass(c,'mute');}obj.mute=false;return true;}},true);});$B.addLayer(['newSoundReady','soundManagerAvailable'],obj);function _createFlashWrapper(uri){var content='',wrapper="yui-cms-sm-wrapper",dom=document.createElement('div');var el=new YAHOO.util.Element(dom,{id:wrapper,innerHTML:''});el.appendTo(document.body);wrapper=$D.get(wrapper);if($E.isIE){content='<object id="'+_id+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1"><param name="movie" value="'+uri+'" /><param name="allowScriptAccess" value="sameDomain" /></object>';}else{content='<embed src="'+uri+'" width="1" height="1" name="'+_id+'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';}wrapper.innerHTML=content;el.setStyle('visibility','hidden');}function _play(id){_handle.playsound(id);}function _stop(id){_handle.stopsound(id);}function _load(id){_handle.addsound(id,_sounds[id].uri);}obj.mute=false;obj.tracks={};obj.load=function(id,conf){if($L.isString(id)&&(id!=='')&&!_sounds.hasOwnProperty(id)){_sounds[id]=conf||_defConfing;_sounds[id].isReady=!conf.cache;_sounds[id].id=id;if(conf.cache){_sounds[id].uri+=(_sounds[id].uri.indexOf('?')>=0?'&':'?')+'_cache='+(new Date()).getTime();}if(_isReady){_load(id);}}};obj.init=function(){_handle=($E.isIE?window[_id]:document[_id]);if(!_isReady&&_handle){_isReady=true;$B.fire('soundManagerAvailable',{wrapper:obj});for(id in _sounds){if(_sounds.hasOwnProperty(id)){_load(id);}}}};obj.create=function(uri){$E.onDOMReady(function(){if(!$D.inDocument(_id)){_createFlashWrapper(uri);}});};obj.ready=function(id){if(_sounds.hasOwnProperty(id)){_sounds[id].isReady=true;$B.fire('newSoundReady',_sounds[id]);}};obj.play=function(id,track){if(_sounds.hasOwnProperty(id)&&_sounds[id].isReady&&!this.mute){if($L.isString(track)){if(obj.tracks.hasOwnProperty(track)&&_sounds.hasOwnProperty(obj.tracks[track])){_stop(obj.tracks[track]);}obj.tracks[track]=id;}_play(id);return true;}else{return false;}};obj.stop=function(id){if(_sounds.hasOwnProperty(id)&&(_sounds[id].isReady)){_stop(id);return true;}else{return false;}};obj.state=function(id){if(_sounds.hasOwnProperty(id)){return(_sounds[id].isReady?2:1);}else{return 0;}};return obj;}();window.soundManagerInit=function(){YAHOO.plugin.SoundManager.init();};window.soundManagerReady=function(id){YAHOO.plugin.SoundManager.ready(id);};})();
YAHOO.register("soundmanager",YAHOO.plugin.SoundManager,{version:"1.5.0",build:"203"});