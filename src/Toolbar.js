import React from 'react';
import { CHANGE_WIDGET_TITLE, CHANGE_WIDGET_DATA } from './globalstate/GlobalStateTypes';
import './Toolbar.css'

const Toolbar = ({eventFromWidget}) => {

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

  const onChangeData = (e) => {
    console.log('onChangeData')
    // var r = {
    //   "type": CHANGE_WIDGET_DATA,
    //   "payload": {
    //     id: 1,
    //     data: [
    //       {id: '1', firstname: 'Nick', lastname: Date.now().toString()},
    //       {id: '2', firstname: 'Andy', lastname: Date.now().toString()}
    //     ]
    //   }
    // }

    var r = {
      "type": CHANGE_WIDGET_DATA,
      "payload": {
        id: 1,
        data: [
          {id: '1', firstname: 'Nick', lastname: 'G'},
          {id: '2', firstname: 'Andy', lastname: 'G'}
        ]
      }
    }
    eventFromWidget(r);
  };

  return (
    <div style={{background:'#e6e6e6',height:'40px',display:'flex',flexDirection:'rows',justifyContent:'space-between'}}>
      <div style={{padding:'10px 0 0 10px'}}>Dashboard</div>
      <div style={{padding:'5px 0 5px 0',display:'flex',flexDirection:'row'}}>
        <button onClick={onChangeTitleDifferent} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Title Different</button>
        <button onClick={onChangeTitleSame} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Title Same</button>
        <button onClick={onChangeData} style={{width:'180px',margin:'0 0 0 10px',fontSize:'11px',background:'gray',color:'white'}} >Change Data</button>
      </div>
    </div>
  );
}

export default Toolbar
