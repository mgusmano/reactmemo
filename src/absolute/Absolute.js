import React, { useEffect } from 'react';
import { useGlobalContext } from '../globalstate/GlobalStateProvider';
import { Widget } from './Widget'
import Toolbar from '../Toolbar';

const Absolute = () => {
  const GlobalContext = useGlobalContext();

  useEffect(() => {
    console.log('useEffect: call GlobalContext.loadWidgets()')
    GlobalContext.loadWidgets(window.widgets)
  }, []);

  const eventFromWidget = (event) => {
    console.log('eventFromWidget: ', JSON.stringify(event))
    GlobalContext.eventFromWidgetDispatch(event)
  }

  return (
<>
    <Toolbar eventFromWidget={eventFromWidget}/>
    <div id='absolute' className='absolute' style={{overflow:'auto',width:'100%',height:'100%',flex:'1',position:'relative',border:'0px solid #73AD21',display: 'flex'}}>
    {GlobalContext.widgets !== null &&
      GlobalContext.widgets.map((widget, index) => {
        console.log('GlobalContext.widgets.map',JSON.stringify(widget))
        return (
          <Widget
            key={index}
            id={widget.id}
            properties={widget.properties}
            widgetData={widget.widgetData}
            eventFromWidget={eventFromWidget}
          />
        )
      })
    }
    </div>
</>
  )
}

export default Absolute
