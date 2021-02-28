import React from "react";
import { CHANGE_WIDGET_TITLE } from '../globalstate/GlobalStateTypes';
import { Comparative } from './widgettype/Comparative'
import Tools from './Tools'
import SouthEastSizer from './SouthEastSizer'
import './Widget.css'

const WidgetRoot = ({id, properties, widgetData, eventFromWidget}) => {
  console.log('in ' + id + ' title: ' + properties.title)

  var active = ''

  var style = {
    left: properties.x,
    top: properties.y,
    width: properties.w,
    height: properties.h,
    id: properties.id
  }

  var Specific = <div> {properties.type} </div>
  switch (properties.type) {
    case 'comparative':
      Specific = <Comparative id={id} widgetData={widgetData} eventFromWidget={eventFromWidget}/>;
      break;
    default:
      break;
  }

  const findAncestor = (el, cls) => {
    if (el.classList.contains(cls)) {return el}
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  const onMouseDownForMove = (e) => {
    e.stopPropagation();
    var startX = e.clientX;
    var startY = e.clientY;

    var par = findAncestor(e.target,'widget')
    console.log('par')
    console.log(par)
    if (par == null) {
      return
    }
    function doDrag(e) {
      par.style.left = (startLeft + e.clientX - startX) + 'px'
      par.style.top = (startTop + e.clientY - startY) + 'px'
      par.style.width = startWidth
      par.style.height = startHeight
      //console.log(par.style.left,par.style.top)
    }
    function stopDrag(e) {
      console.log('stopDrag',e)
      console.log(par.style.left,par.style.top)
      //var r = {type: RESIZE_WIDGET, payload: {id: widgetRecord.id, w: par.style.width, h: par.style.height, changed: Date.now() }}
      var r = {"type":CHANGE_WIDGET_TITLE,"payload":{"id":id,"title":"move " + par.style.left + ' ' + par.style.top }}
      console.log('stopDrag',r)
      eventFromWidget(r)
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
    var startLeft = parseInt(document.defaultView.getComputedStyle(par).left, 10);
    var startTop = parseInt(document.defaultView.getComputedStyle(par).top, 10);
    var startWidth = parseInt(document.defaultView.getComputedStyle(par).width, 10);
    var startHeight = parseInt(document.defaultView.getComputedStyle(par).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  };

  const onMouse = (e, display) => {
    e.stopPropagation();
    function findAncestor (el, cls) {
      if (el.classList.contains(cls)) {return el}
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    }
    var w = findAncestor(e.target,'widget')
    if (w != null) {
      w.getElementsByClassName("tools")[0].style.display = display
      w.getElementsByClassName("southeastsizer")[0].style.display = display
    }
  };

  const onClick = (e, display) => {
    //e.stopPropagation();
    //GlobalContext.activateWidget({type: 'ACTIVATE_WIDGET', payload: {id: widgetRecord.id}});
  };

  return (
    <div style={style} className={`widget bordershadow ${active ? "active" : ""}`} onClick={(e) => {onClick(e)}} onMouseEnter={(e) => {onMouse(e,'block')}} onMouseLeave={(e) => {onMouse(e,'none')}}>
      <div onMouseDown={(e) => {onMouseDownForMove(e)}} style={{cursor:'move',position:'relative',display:'flex',flexDirection:'rows',justifyContent:'space-between',borderBottom:'0px solid lightgray',padding:'0 0 5px 0',height:'20px'}}>
        <div style={{fontSize: '11px',fontWeight:'bold',paddingTop:'3px'}}>{properties.title}</div>
        <Tools
          id={id}
          properties={properties}
          eventFromWidget={eventFromWidget}
        />
      </div>
      <div style={{display:'flex',flexDirection:'rows',justifyContent:'space-between',borderBottom:'0px solid lightgray',padding:'0 0 5px 0'}}>
        <div style={{fontSize: '12px'}}>breadcrumb  &gt;  more  &gt;  more</div>
      </div>
      {Specific}
      <div style={{display:'flex',flexDirection:'rows',justifyContent:'space-between',borderBottom:'0px solid lightgray',padding:'5px 0 0 0',height:'20px'}}>
        <div style={{fontSize: '11px',fontWeight:'bold',paddingTop:'3px'}}>timestamp: {properties.timestamp}  -  last rerender:{Date.now().toString()}</div>
        <div style={{fontSize: '11px',fontWeight:'bold',paddingTop:'3px'}}>({id})</div>
      </div>
      <SouthEastSizer
        id={id}
        eventFromWidget={eventFromWidget}
      />
    </div>
  )
}

function checkIfWidgetChanged(prevWidget, nextWidget) {
  console.log('checkIfWidgetChanged: ' + prevWidget.id)
  console.log('prev',prevWidget.properties)
  console.log('next', nextWidget.properties)
  var same = prevWidget.properties === nextWidget.properties
  if (same === true) {
    console.log(`widget ${prevWidget.id} will NOT redraw`)
  }
  else {
    console.log(`widget ${prevWidget.id} WILL redraw`)
  }
  return same
}
export const Widget = React.memo(WidgetRoot, checkIfWidgetChanged);
