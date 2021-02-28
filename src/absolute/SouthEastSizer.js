import React from 'react';
import { CHANGE_WIDGET_TITLE } from '../globalstate/GlobalStateTypes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sehandle: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    bottom: '0',
    right: '0',
    background: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=)',
    backgroundPosition: 'bottom right',
    padding: '0 3px 3px 0',
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'content-box',
    boxSizing: 'border-box',
    cursor: 'se-resize',
    display: 'none'
  }
}));

const SouthEastSizer = ({id, eventFromWidget}) => {
    const classes = useStyles();

    const findAncestor = (el, cls) => {
      if (el.classList.contains(cls)) {return el}
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    }

    const onMouseDownSE = (e) => {
      e.stopPropagation();
      var startX = e.clientX;
      var startY = e.clientY;
      var par = findAncestor(e.target,'widget')
      var startWidth = parseInt(document.defaultView.getComputedStyle(par).width, 10);
      var startHeight = parseInt(document.defaultView.getComputedStyle(par).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
      function doDrag(e) {
        par.style.width = (startWidth + e.clientX - startX) + 'px';
        par.style.height = (startHeight + e.clientY - startY) + 'px';
      }
      function stopDrag(e) {
        var r = {"type":CHANGE_WIDGET_TITLE,"payload":{"id":id,"title":"resize " + Date.now() }}
        console.log('stopDrag',r)
        eventFromWidget(r)
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
      }

    };

    return (
      <div className={`${classes.sehandle} southeastsizer`} onMouseDown={(e) => {onMouseDownSE(e)}}/>
    );
}

export default SouthEastSizer
