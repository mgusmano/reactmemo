import produce from 'immer'
import { RESIZE_WIDGET, CHANGE_WIDGET, CHANGE_WIDGET_TITLE, CHANGE_WIDGET_DATA, LOAD_WIDGETS } from './GlobalStateTypes';

export const GlobalStateReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {

    case LOAD_WIDGETS:
      console.log('dispatch LOAD_WIDGETS',payload)
      return produce(state, draft => {
        draft.highWidgetId = payload.length
        draft.widgets = payload
      })
    case CHANGE_WIDGET_TITLE:
      console.log(CHANGE_WIDGET_TITLE,payload)
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          console.log('index found:',index);
          draft.widgets[index].properties.title = payload.title;
          draft.widgets[index].properties.timestamp = Date.now();
        }
      })

    case CHANGE_WIDGET_DATA:
      console.log(CHANGE_WIDGET_DATA,payload)
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          console.log('index found:',index);
          draft.widgets[index].widgetData.data = payload.data;
          draft.widgets[index].properties.timestamp = Date.now();
        }
      })

    case RESIZE_WIDGET:
      //console.log("RESIZE_WIDGET",payload.id)
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgets[index].properties.w = payload.w
          draft.widgets[index].properties.h = payload.h
          //draft.widgetData[index].properties.size = {width: payload.w,height: payload.h}
        }
      })

    case 'userName':
      return produce(state,(draft) => {
        draft.userName = payload
      })
    case 'dashboardData':
      return { ...state, dashboardData: payload }
    case 'widgetData':
      return { ...state, widgetData: payload, highWidgetId: payload.length }

    case 'appTitle':
      return produce(state,(draft) => {
        draft.dashboardData.appTitle = payload
      })
    case "ADD_WIDGET":
      return produce(state, draft => {
        draft.highWidgetId = draft.highWidgetId + 1
        draft.widgets.push({
          id: draft.highWidgetId,
          defaultTitle: payload.title,
          type: payload.type,
          x: payload.x,y: payload.y,
          w: payload.w,h: payload.h
          // properties: {
          //   mode: payload.mode,
          //   position: {x: payload.x,y: payload.y},
          //   size: {width: payload.w,height: payload.h}
          // },
        })
      })
    case "TILE_WIDGETS":
      return produce(state, draft => {
        var a = document.getElementById('absolute2')
        var w = a.scrollWidth
        var h = a.scrollHeight - 40
        var l = draft.widgets.length
        var newWidth = w/l
        //console.dir(a)
        //console.log(w)
        //console.log(l)
        //console.log(newWidth)
        var left = 20
        var width = newWidth - 40

        draft.widgets.forEach(widget => {
          var index = draft.widgets.map(item => item.id).indexOf(widget.id);
          if (index !== -1) {
            draft.widgets[index].properties.position =  {x:left,y: 20}
            draft.widgets[index].properties.size = {width: width,height: h}
            left = width + left + 30
          }
        })
      })
    case "CHANGE_WIDGET_MODE":
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          if (draft.widgetData[index].mode === 'chart') {
            draft.widgetData[index].mode = 'grid'
          }
          else {
            draft.widgetData[index].mode = 'chart'
          }
        }
      })
    case "DELETE_WIDGET":
      //console.log('DELETE_WIDGET')
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgets.splice(index, 1);
        }
      })
    case "UPDATE_WIDGET":
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgetData[index].x = payload.x
          draft.widgetData[index].y = payload.y
          draft.widgetData[index].w = payload.w
          draft.widgetData[index].x = payload.h

          // draft.widgetData[index].position =  {x: payload.x,y: payload.y}
          // draft.widgetData[index].size = {width: payload.w,height: payload.h}
        }
      })
    case "MOVE_WIDGET":
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgetData[index].x = payload.x
          draft.widgetData[index].y = payload.y
          //draft.widgetData[index].properties.position = {x: payload.x,y: payload.y}
        }
      })
    case CHANGE_WIDGET:
      console.log(CHANGE_WIDGET,payload)
      return produce(state, draft => {
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgets[index].x = payload.x
          draft.widgets[index].y = payload.y
          draft.widgets[index].w = payload.w
          draft.widgets[index].h = payload.h
          //draft.widgetData[index].properties.size = {width: payload.w,height: payload.h}
        }
      })


    case "ACTIVATE_WIDGET":
      //console.log("ACTIVATE_WIDGET",payload.id)
      return produce(state, draft => {
        draft.widgets.forEach(widget => widget.active = false)
        var index = draft.widgets.map(item => item.id).indexOf(payload.id);
        if (index !== -1) {
          draft.widgets[index].active = true
          draft.toolkitTitle = draft.widgets[index].defaultTitle
        }
      })
    default:
      return state;
  }
}