import React from 'react';
//import { useGlobalState } from '../globalstate/GlobalStateProvider';
import { useGlobalContext } from '../globalstate/GlobalStateProvider';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
//import TextField from '@material-ui/core/TextField';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import './AddWidgetDialog.css'
//import sprite from './sprite.svg'
//import Icon from './Icon'

import GridOnIcon from '@material-ui/icons/GridOn';

const AddWidgetDialog = (props) => {
  const GlobalContext = useGlobalContext();
  const {open, onExited, hideModal} = props

  const handleClick = (event, title, who) => {
    console.log(title)
    console.log(who)
    GlobalContext.addWidget({type: 'ADD_WIDGET', payload: {x: 0, y: 0, w: 400, h: 400, title: title, mode: 'chart', type: who}});
    hideModal()
  }

  const PaperComponent = (props) => {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

//console.log(sprite)

//// <svg className="">
//<use href={sprite + "#bell"}/>
//</svg>
//        <Icon name='comparative'/>
//<div className="icon widget-comparative"></div>

    return (
      <Dialog
        open={open}
        onExited={onExited}
        onClose={hideModal}
        PaperComponent={PaperComponent}

      >
        <DialogTitle style={{width:'700px',cursor: 'move'}} id="draggable-dialog-title">Add Widget</DialogTitle>
          <DialogContent style={{width:'700px'}} dividers>
            <div className="add-widgets-dialog" style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>

              <span>Data</span>
              <div className="add-widgets-cell" onClick={(event) => handleClick(event, 'comparative', 'comparative')}>
                <span className="widget-type-name"><GridOnIcon/>comparative</span>
              </div>
              <div className="add-widgets-cell" onClick={(event) => handleClick(event, 'geo', 'geoWidget')}>
                <span className="widget-type-name"><GridOnIcon/>geo</span>
              </div>

              <div className="add-widgets-cell" onClick={(event) => handleClick(event, 'rating meter', 'ratingmeter')}>
                <span className="widget-type-name"><GridOnIcon/>rating meter</span>
              </div>
              <div className="add-widgets-cell" onClick={(event) => handleClick(event, 'grid', 'grid')}>
                <span className="widget-type-name"><GridOnIcon/>grid</span>
              </div>

              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>

              <span>Content</span>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>

              <span>Selector</span>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
              <div className="add-widgets-cell"></div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideModal}>Close</Button>
          </DialogActions>
      </Dialog>
    )
}

export default AddWidgetDialog