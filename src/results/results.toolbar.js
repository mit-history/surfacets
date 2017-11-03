import React, { Component } from 'react';
import {connect} from 'react-redux';
import './results.toolbar.css';
import {changeViewMode, VIEW_MODE_SUMMARY, VIEW_MODE_SELECTION, VIEW_MODE_DETAILED} from './action';

const COLUMNS = 3;
const ROWS_SMALL = 4;
const ROWS_LARGE = 1;
const ICON_WIDTH = 42;
const ICON_HEIGHT = 34;

const mapStateToProps = (state) => {
  return {
    viewMode: state.results.viewMode
  };
}

class ResultsToolbar extends Component {
  constructor(props) {
    super(props);
    this.handleSummaryViewClicked = this.handleSummaryViewClicked.bind(this);
    this.handleSelectionViewClicked = this.handleSelectionViewClicked.bind(this);
    this.handleDetailedViewClicked = this.handleDetailedViewClicked.bind(this);
  }
  
  render() {
    return (
      <header className='results-toolbar'>
        <svg className={
          ['results-toolbar__icon']
            .concat(this.props.viewMode === VIEW_MODE_SUMMARY ? ['results-toolbar__icon--active'] : [])
            .join(' ')} 
            width={ICON_WIDTH} 
            height={ICON_HEIGHT}
            onClick={this.handleSummaryViewClicked}>
          <rect x='1' y='1' width='40' height='32' className='results-toolbar-icon__frame' />
          {Array.from(Array(COLUMNS * ROWS_SMALL).keys()).map(index =>
                <rect key={'summary' + index}
                  x={((index % COLUMNS) * 8) + (3 * (index % COLUMNS)) + 6} 
                  y={(Math.floor(index / COLUMNS) * 4) + (Math.floor(index / COLUMNS) * 2) + 6} 
                  width='8' 
                  height='4'/>)}
        </svg>
        <svg className={
          ['results-toolbar__icon']
            .concat(this.props.viewMode === VIEW_MODE_SELECTION ? ['results-toolbar__icon--active'] : [])
            .join(' ')} 
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
            onClick={this.handleSelectionViewClicked}>
          <rect x='1' y='1' width='40' height='32' className='results-toolbar-icon__frame' />
          {Array.from(Array(COLUMNS * ROWS_SMALL).keys()).map(index =>
                <rect key={'selection' + index}
                  x={((index % COLUMNS) * 8) + (3 * (index % COLUMNS)) + 6} 
                  y={(index % COLUMNS === 0 ? 6 : ((Math.floor(index / COLUMNS) * 4) + (Math.floor(index / COLUMNS) * 2) + 6))} 
                  width='8' 
                  height={index % COLUMNS === 0 ? 22 : 4}/>)}
        </svg>
        <svg className={
          ['results-toolbar__icon']
            .concat(this.props.viewMode === VIEW_MODE_DETAILED ? ['results-toolbar__icon--active'] : [])
            .join(' ')} 
            width={ICON_WIDTH} 
            height={ICON_HEIGHT}
            onClick={this.handleDetailedViewClicked}>
          <rect x='1' y='1' width='40' height='32' className='results-toolbar-icon__frame' />
          {Array.from(Array(COLUMNS * ROWS_LARGE).keys()).map(index =>
                <rect key={'detailed' + index}
                  x={((index % COLUMNS) * 8) + (3 * (index % COLUMNS)) + 6} 
                  y={(Math.floor(index / COLUMNS) * 4) + (Math.floor(index / COLUMNS) * 2) + 6} 
                  width='8' 
                  height='22'/>)}
        </svg>
      </header>
    );
  }

  handleSummaryViewClicked(event) {
    this.props.dispatch(changeViewMode(VIEW_MODE_SUMMARY)); 
  }

  handleSelectionViewClicked(event) {
    this.props.dispatch(changeViewMode(VIEW_MODE_SELECTION));
  }

  handleDetailedViewClicked(event) {
    this.props.dispatch(changeViewMode(VIEW_MODE_DETAILED));
  }
}

export default connect(mapStateToProps)(ResultsToolbar);