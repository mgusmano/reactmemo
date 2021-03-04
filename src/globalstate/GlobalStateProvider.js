import React, { createContext, useReducer, useContext } from 'react';
import { GlobalStateReducer } from './GlobalStateReducer';
import { RESIZE_WIDGET, ADD_WIDGET, CHANGE_WIDGET, CHANGE_WIDGET_TITLE, CHANGE_WIDGET_DATA, LOAD_WIDGETS } from './GlobalStateTypes';
import '../data/widgets'
import '../data/widgets2'

const GlobalContext = createContext();

export const GlobalStateProvider = (props) => {
  const initialState = {
    highWidgetId: 0,
    userName: '',
    toolkitTitle: 'Workspace',
    dashboardData: {appTitle:''},
    widgetData: null,
    widgets: null,
  }
  const[state, dispatch] = useReducer(GlobalStateReducer, initialState);

  const loadWidgets = (payload) => {
    console.log('loadWidgets')
    dispatch({type: LOAD_WIDGETS, payload: payload});
    //dispatch(payload);

    // var event = {type: ADD_WIDGET, payload: payload}
    // console.log(event)
    // dispatch(event);
  }


  const eventFromWidgetDispatch = (what) => {
    //var event = {type: CHANGE_WIDGET_TITLE, payload: payload}
    //console.log('dispatch',JSON.stringify(event))
    dispatch(what);
  }

  const getDashboard = () => {
    setTimeout(function(){
      //console.log(window.dashboardData)
      //console.log(window.dashboardData.dashboard.widgets)
      var action = {"success":true,"userName":"Marc Gusmano"}
      dispatch({type: 'userName', payload: action.userName});
      dispatch({type: 'dashboardData', payload: window.dashboardData});
      //console.log( window.dashboardData.dashboard.widgets)
      dispatch({type: 'widgetData', payload: window.dashboardData.dashboard.widgets});



      var element = document.getElementById("initialLoadMask");
      if (element) {
        element.parentNode.removeChild(element);
      }
    }, 500);
  }

  const resizeWidget = (payload) => {
    var event = {type: RESIZE_WIDGET, payload: payload}
    console.log(event)
    dispatch(event);
  }

  const changeWidgetTitle = (payload) => {
    var event = {type: CHANGE_WIDGET_TITLE, payload: payload}
    console.log('dispatch',JSON.stringify(event))
    dispatch(event);
  }

  const changeWidgetData = (payload) => {
    var event = {type: CHANGE_WIDGET_DATA, payload: payload}
    console.log('dispatch',JSON.stringify(event))
    dispatch(event);
  }




  const changeWidget = (payload) => {
    //dispatch(payload);

    var event = {type: CHANGE_WIDGET, payload: payload}
    console.log(event)
    dispatch(event);
  }

  const addWidget = (payload) => {
    //dispatch(payload);

    var event = {type: ADD_WIDGET, payload: payload}
    console.log(event)
    dispatch(event);
  }

  const deleteWidget = (payload) => {
    dispatch(payload);
  }

  const tileWidgets = (payload) => {
    dispatch(payload);
  }

  const activateWidget = (payload) => {
    dispatch(payload);
  }







  //const reducer = useReducer(GlobalStateReducer, initialState);







  return (
    <GlobalContext.Provider value={{
      highWidgetId: state.highWidgetId,
      userName: state.userName,
      toolkitTitle: state.toolkitTitle,
      dashboardData: state.dashboardData,
      widgetData: state.widgetData,
      widgets: state.widgets,
      eventFromWidgetDispatch,
      getDashboard,
      loadWidgets,
      resizeWidget,
      changeWidget,
      addWidget,
      deleteWidget,
      tileWidgets,
      activateWidget,
      changeWidgetTitle,
      changeWidgetData
    }}>
      {props.children}
    </GlobalContext.Provider>
  );

  // return (
  //   <GlobalContext.Provider value={ useReducer(GlobalStateReducer, initialState) }>
  //     {props.children}
  //   </GlobalContext.Provider>
  // );
}
export const useGlobalContext = () => useContext(GlobalContext);



  //   axios
  //     .post('Actions.ashx', {action: 'passwordExpiration'})
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data))
  //       dispatch({type: 'userName', payload: response.data.userName});
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   axios
  //     .get('DashboardHandler.ashx?action=getInitialData', {action: 'getInitialData'})
  //     .then((response) => {
  //       dispatch({type: 'dashboardData', payload: response.data});
  //       dispatch({type: 'widgetData', payload: response.data.dashboard.widgets});
  //       var element = document.getElementById("initialLoadMask");
  //       element.parentNode.removeChild(element);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, []);
