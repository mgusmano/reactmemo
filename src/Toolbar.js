import React from 'react';
import { LOAD_WIDGETS, CHANGE_WIDGET_TITLE, CHANGE_WIDGET_DATA } from './globalstate/GlobalStateTypes';
import './Toolbar.css'

const Toolbar = ({eventFromWidget}) => {

  const onLoadWidgetsSmallDif = (e) => {
    console.log('onLoadWidgetsSmallDif')
    var r = {
      "type": LOAD_WIDGETS,
      "payload": window.widgetssmalldif
    }
    eventFromWidget(r);
  };

  const onLoadWidgets = (e) => {
    console.log('onLoadWidgets')
    var r = {
      "type": LOAD_WIDGETS,
      "payload": window.widgets
    }
    eventFromWidget(r);
  };

  const onLoadWidgets2 = (e) => {
    console.log('onLoadWidgets2')
    var r = {
      "type": LOAD_WIDGETS,
      "payload": window.widgets2
    }
    eventFromWidget(r);
  };

  const onChangeTitleDifferent = (e) => {
    console.log('onChangeTitleDifferent')
    var r = {
      "type": CHANGE_WIDGET_TITLE,
      "payload": {
        id: 1,
        title: 'new comparative' + Date.now().toString()
      }
    }
    eventFromWidget(r);
  };

  const onChangeTitleSame = (e) => {
    console.log('onChangeTitleSame')
    var r = {
      "type": CHANGE_WIDGET_TITLE,
      "payload": {
        id: 1,
        title: 'same'
      }
    }
    eventFromWidget(r);
  };

  const onChangeDataDifferent = (e) => {
    console.log('onChangeDataDifferent')
    var r = {
      "type": CHANGE_WIDGET_DATA,
      "payload": {
        id: 1,
        data: [
          {id: '1', firstname: 'Nick', lastname: Date.now().toString()},
          {id: '2', firstname: 'Andy', lastname: Date.now().toString()}
        ]
      }
    }
    eventFromWidget(r);
  };

  const onChangeDataSame = (e) => {
    console.log('onChangeDataSame')
    var r = {
      "type": CHANGE_WIDGET_DATA,
      "payload": {
        id: 1,
        data: [
          {id: '1', firstname: 'Nick', lastname: 'Gusmano'},
          {id: '2', firstname: 'Andy', lastname: 'Gusmano'}
        ]
      }
    }
    eventFromWidget(r);
  };

  return (
    <div style={{background:'#e6e6e6',height:'40px',display:'flex',flexDirection:'rows',justifyContent:'space-between'}}>
      <div style={{padding:'10px 0 0 10px'}}>Dashboard</div>
      <div style={{padding:'5px 0 5px 0',display:'flex',flexDirection:'row'}}>
      <button onClick={onLoadWidgetsSmallDif} style={{width:'100px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Load Widgets Small Diff</button>
      <button onClick={onLoadWidgets} style={{width:'100px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Load Widgets</button>
        <button onClick={onLoadWidgets2} style={{width:'100px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Load Widgets2</button>
        <button onClick={onChangeTitleDifferent} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Title Different</button>
        <button onClick={onChangeTitleSame} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Title Same</button>
        <button onClick={onChangeDataDifferent} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Data Different</button>
        <button onClick={onChangeDataSame} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Data Same</button>
      </div>
    </div>
  );
}

export default Toolbar
