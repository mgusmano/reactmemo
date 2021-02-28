import React from 'react';
import SenchaGrid, { Column } from '@sencha/sencha-grid';
import '@sencha/sencha-grid/dist/themes/material.css';
import 'material-design-icons/iconfont/material-icons.css';

const ComparativeRoot = ({widgetData, eventFromWidget}) => {
  console.log(widgetData)

  return (
    <div style={{display:'flex',height:'100%',overflow:'auto',flexDirection:'column'}}>
      <div style={{flex:'1',border:'1px solid lightgray' }}>
        <SenchaGrid
          height='100%'
          data={widgetData.data}
        >
          <Column dataIndex="id" text="ID" width="20px" />
          <Column dataIndex="firstname" text="First" width="60px" />
          <Column dataIndex="lastname" text="Last" flex="1" />
        </SenchaGrid>
      </div>
    </div>
  )
}

function checkIfComparativeChanged(prevWidget, nextWidget) {
  console.log('checkIfComparativeChanged: ' + prevWidget.id)
  console.log('prev',prevWidget.widgetData)
  console.log('next', nextWidget.widgetData)
  var same = prevWidget.widgetData === nextWidget.widgetData
  if (same === true) {
    console.log(`comparative ${prevWidget.id} will NOT redraw`)
  }
  else {
    console.log(`comparative ${prevWidget.id} WILL redraw`)
  }
  return same
}
export const Comparative = React.memo(ComparativeRoot, checkIfComparativeChanged);