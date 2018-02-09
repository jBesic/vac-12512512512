import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import Toolbox from '../../components/Toolbox/Toolbox';
import ShapeProperties from '../../components/ShapeProperties';
import { tools, mode, defaultShapeAttributes } from '../../helper/canvasHelper';
import * as actions from '../../store/actions/actions';

import './Canvas.css';

class Canvas extends Component {
    state = {
        shape: { type: null, points: [] },
        referencePoint: { x: null, y: null },
        activeMode: mode.SELECT_MODE,
        drawStarted: false,
        selectedTool: tools.SELECT,
        mouseMoveEventNeeded: false,
        selectedPointIndex: null
    };

    mouseDownHandler = (event) => {
        if (this.state.mouseMoveEventNeeded === true && this.state.drawStarted === false) {
            const canvas = document.getElementById('Canvas').getBoundingClientRect();
            let referencePoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
            let shape = { id: this.props.lastUsedId + 1, type: this.state.selectedTool, points: [], attributes: defaultShapeAttributes(this.state.selectedTool) };
            this.setState({ drawStarted: true, referencePoint, shape });
        }
    };

    mouseMoveHandler = (event) => {
        if (this.state.mouseMoveEventNeeded === true && this.state.drawStarted === true) {
            const canvas = document.getElementById('Canvas').getBoundingClientRect();
            let newPoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
            let points;
            switch (this.state.selectedTool) {
                case tools.RECTANGLE:
                    points = getControlPointsForRectangle(this.state.referencePoint, newPoint);
                    break;
                case tools.TRIANGLE:
                    points = getControlPointsForTriangle(this.state.referencePoint, newPoint);
                    break;
                case tools.CIRCLE:
                    points = getControlPointsForCircle(this.state.referencePoint, newPoint);
                    break;
                case tools.LINE:
                    points = getControlPointsForLine(this.state.referencePoint, newPoint);
                    break;
                default:
                    return;
            }

            let shape = { ...this.state.shape };
            shape.points = points;

            this.setState({ shape });
        }
    };

    mouseUpHandler = (event) => {
        if (this.state.mouseMoveEventNeeded === true && this.state.drawStarted === true) {
            this.setState({ shape: { id: null, points: [], attributes: defaultShapeAttributes(this.state.shape.type) }, drawStarted: false });
            this.props.addShape(this.state.shape);
        }
    };

    clickShapeHandler = (shape, event) => {
        if (this.state.activeMode !== mode.DRAW_MODE) {
            event.stopPropagation();
        }

        switch (this.state.activeMode) {
            case mode.SELECT_MODE: return this.selectShape(event, shape);
            case mode.DELETE_MODE: return this.deleteShape(shape);
            case mode.PAINT_MODE: return this.paintShape(shape);
            default: return;
        }
    };

    deleteShape = (shape) => {
        this.props.deleteShape(shape);
    };

    selectShape = (event, shape) => {
        if (this.state.shape.id === shape.id) {
            return this.setState({ shape: { id: null, points: [] } });
        }
        return this.setState({ shape });
    };

    paintShape = (shape) => { };

    canvasEventHandler = (event) => {
        if (this.state.activeMode === mode.DRAW_MODE && this.state.mouseMoveEventNeeded === false) {
            const canvas = document.getElementById('Canvas').getBoundingClientRect();
            if (this.state.drawStarted === true) {
                let newPoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
                let shape = { ...this.state.shape };
                let points = [...shape.points];
                points.push(newPoint.x + ',' + newPoint.y);
                shape.points = points;
                this.setState({ shape });
                this.props.addShape(shape);
            } else {
                let referencePoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
                let shape = { id: this.props.lastUsedId + 1, type: this.state.selectedTool, attributes: defaultShapeAttributes(this.state.selectedTool), points: [] };
                shape.points.push(referencePoint.x + ',' + referencePoint.y);
                this.setState({ drawStarted: true, referencePoint, shape });
                this.props.addShape(shape);
            }
        }
    };

    selectToolHandler = (tool) => {
        let activeMode = mode.DRAW_MODE;

        switch (tool) {
            case tools.SELECT:
                activeMode = mode.SELECT_MODE;
                break;
            case tools.DELETE:
                activeMode = mode.DELETE_MODE;
                break;
            default:
                break;
        }

        let mouseMoveEventNeeded = false;
        const helper = [tools.RECTANGLE, tools.CIRCLE, tools.LINE, tools.TRIANGLE];
        if (activeMode === mode.DRAW_MODE && helper.indexOf(tool) !== -1) {
            mouseMoveEventNeeded = true;
        }

        this.setState({ shape: { type: null, points: [] }, selectedTool: tool, mouseMoveEventNeeded, activeMode });
    };

    closePolygonHandler = (event) => {
        event.stopPropagation();
        let shape = { ...this.state.shape };
        let points = [...shape.points];
        points.push(points[0]);
        shape.points = points;
        this.props.addShape(shape);
        this.setState({ drawStarted: false, shape: { type: null, points: [] } });
    }

    unselectShapeHandler = () => {
        this.setState({ shape: { type: null, points: [] } });
    }

    handleStart = (selectedPoint, event) => {
        event.stopPropagation();
        let shape = { ...this.state.shape };
        let selectedPointIndex = shape.points.indexOf(selectedPoint);
        if (shape.type === tools.RECTANGLE) {
            let referencePointIndex = selectedPointIndex > 1 ? selectedPointIndex - 2 : selectedPointIndex + 2;
            let referencePointHelper = shape.points[referencePointIndex].split(',');
            let referencePoint = { x: referencePointHelper[0], y: referencePointHelper[1] };
            this.setState({ shape, referencePoint });
        } else {
            this.setState({ selectedPointIndex });
        }
    };

    handleDrag = (event) => {
        event.stopPropagation();
        const canvas = document.getElementById('Canvas').getBoundingClientRect();
        let newPoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
        let shape = { ...this.state.shape };
        let points = [];
        if (shape.type === tools.RECTANGLE) {
            points = getControlPointsForRectangle(this.state.referencePoint, newPoint);
        } else {
            points = [...shape.points];
            points[this.state.selectedPointIndex] = newPoint.x + ',' + newPoint.y;
            if (this.state.selectedPointIndex === 0) {
                points[points.length - 1] = newPoint.x + ',' + newPoint.y;
            }
        }

        shape.points = points;
        this.setState({ shape });
    };

    handleStop = (event) => {
        event.stopPropagation();
        this.props.updateShape({ ...this.state.shape });
    };

    render() {
        return (
            <div className='container'>
                {/* *** Canvas Title *** */}
                <div className='row canvas__title'>
                    <div className='col-md-12' >Draw for competiton: Competition Name</div>
                </div>
                {/* *** Canvas Content Header *** */}
                <div className='row d-flex align-items-center'>
                    <div className='col-md-4'>
                        <input type="text" className="form-control" placeholder='Enter a name of your art...' />
                    </div>
                    <div className='col-md-6 text-center'>
                        <div className="alert alert-light m-0 p-2">
                            Remaining time: <strong>2:33 min</strong>
                        </div>
                    </div>
                    <div className='col-md-2'><button type="button" className="btn vac-btn-primary canvas__save-button">Save</button></div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        {/* *** Canvas Content Body  *** */}
                        <div className='row canvas__content-body mt-10'>
                            <div className='col-md-2 canvas__toolbox'>
                                <Toolbox
                                    onClick={this.unselectShapeHandler}
                                    selectedTool={this.state.selectedTool}
                                    selectToolHandler={this.selectToolHandler}
                                    drawStarted={this.state.drawStarted} />
                                <ShapeProperties
                                    mode={this.state.activeMode}
                                    shape={this.state.shape} />
                            </div>
                            <div className='col-md-8 canvas__draw-wrapper'
                                onClick={this.canvasEventHandler}
                                onMouseDown={this.mouseDownHandler}
                                onMouseUp={this.mouseUpHandler}
                                onMouseMove={this.mouseMoveHandler}
                            >
                                <svg
                                    width='100%' height='100%'
                                    id='Canvas'>
                                    {/* Show saved shapes, except shape which you currently draw or have selected */}
                                    {this.props.shapes.map((item, index) => {
                                        if (item.id === this.state.shape.id) {
                                            return 0;
                                        }
                                        if (item.type === tools.RECTANGLE || item.type === tools.TRIANGLE || item.type === tools.POLYGON) {
                                            return item.id !== this.state.shape.id && <polyline onClick={this.clickShapeHandler.bind(this, item)} key={item.id} fill='white' stroke='black' strokeWidth='2px' points={item.points.join(' ')} />;
                                        }
                                        if (item.type === tools.CIRCLE) {
                                            return item.points.length && <ellipse onClick={this.clickShapeHandler.bind(this, item)} key={item.id} cx={item.points[0]} cy={item.points[1]} rx={item.points[2]} ry={item.points[3]} stroke='black' strokeWidth='2px' fill='white' />;
                                        }
                                        if (item.type === tools.LINE) {
                                            return item.points.length && <line onClick={this.clickShapeHandler.bind(this, item)} key={item.id} x1={item.points[0]} y1={item.points[1]} x2={item.points[2]} y2={item.points[3]} fill='white' stroke='black' strokeWidth='2px' />;
                                        }
                                        return [];
                                    })}
                                    {/* Show shape you currently manage */}
                                    {(this.state.shape.type === tools.RECTANGLE || this.state.shape.type === tools.TRIANGLE || this.state.shape.type === tools.POLYGON) && <polyline className='canvas__shape-selected' onClick={this.clickShapeHandler.bind(this, this.state.shape)} key={this.state.shape.id} fill='white' stroke='black' strokeWidth='2px' points={this.state.shape.points.join(' ')} />}
                                    {this.state.shape.type === tools.CIRCLE && this.state.shape.points.length && <ellipse className='canvas__shape-selected' onClick={this.clickShapeHandler.bind(this, this.state.shape)} key={this.state.shape.id} cx={this.state.shape.points[0]} cy={this.state.shape.points[1]} rx={this.state.shape.points[2]} ry={this.state.shape.points[3]} fill='white' stroke='black' strokeWidth='2px' />}
                                    {this.state.shape.type === tools.LINE && this.state.shape.points.length && <line className='canvas__shape-selected' onClick={this.clickShapeHandler.bind(this, this.state.shape)} x1={this.state.shape.points[0]} y1={this.state.shape.points[1]} x2={this.state.shape.points[2]} y2={this.state.shape.points[3]} fill='white' stroke='black' strokeWidth='2px' />}

                                    {/* Show circle on first point of polygon in DRAW_MODE */}
                                    {this.state.activeMode === mode.DRAW_MODE && this.state.shape && this.state.shape.type === tools.POLYGON && <circle onClick={this.closePolygonHandler} fill='red' stroke='black' strokeWidth='2px' cx={this.state.referencePoint.x} cy={this.state.referencePoint.y} r='10' />}}

                                            {/* Show small circles on control points of selected shape (RECTANGLE, TRIANGLE, POLYGON) in SELECT_MODE */}
                                    {this.state.activeMode === mode.SELECT_MODE && (this.state.shape.type === tools.RECTANGLE || this.state.shape.type === tools.TRIANGLE || this.state.shape.type === tools.POLYGON) && this.state.shape.points.map((item, index) => {
                                        if (index === this.state.shape.points.length - 1) return [];
                                        let points = item.split(',');
                                        points[0] = (Number)(points[0]);
                                        points[1] = (Number)(points[1]);
                                        return <Draggable
                                            key={(index)}
                                            axis="both"
                                            position={{ x: points[0], y: points[1] }}
                                            onStart={this.handleStart.bind(this, item)}
                                            onDrag={this.handleDrag}
                                            onStop={this.handleStop}>
                                            <circle style={{ cursor: 'pointer' }} cx='0' cy='0' r='5' stroke='black' strokeWidth='1px' fill='red' />
                                        </Draggable>;
                                    })}
                                </svg>
                            </div>
                            <div className='col-md-2 canvas__groups'>Groups</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

function getControlPointsForRectangle(referencePoint, newPoint) {
    let points = [referencePoint.x + ',' + referencePoint.y];
    points.push(newPoint.x + ',' + referencePoint.y);
    points.push(newPoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + referencePoint.y);

    return points;
}

function getControlPointsForTriangle(referencePoint, newPoint) {
    let points = [referencePoint.x + ',' + referencePoint.y];
    points.push(newPoint.x + ',' + referencePoint.y);
    points.push(newPoint.x + ',' + newPoint.y);
    points.push(referencePoint.x + ',' + referencePoint.y);

    return points;
}

function getControlPointsForCircle(referencePoint, newPoint) {
    let points = [];
    let rx = Math.abs((newPoint.x - referencePoint.x) / 2);
    let ry = Math.abs((newPoint.y - referencePoint.y) / 2);
    // cx, cy, rx, ry
    points.push(referencePoint.x + rx / 2);
    points.push(referencePoint.y + ry / 2);
    points.push(rx);
    points.push(ry);

    return points;
}

function getControlPointsForLine(referencePoint, newPoint) {
    let points = [referencePoint.x, referencePoint.y, newPoint.x, newPoint.y];

    return points;
}

const mapStateToProps = state => {
    return {
        lastUsedId: state.canvas.lastUsedId,
        shapes: state.canvas.shapes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addShape: (shape) => dispatch(actions.addShape(shape)),
        updateShape: (shape) => dispatch(actions.updateShape(shape)),
        deleteShape: (shape) => dispatch(actions.deleteShape(shape))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);