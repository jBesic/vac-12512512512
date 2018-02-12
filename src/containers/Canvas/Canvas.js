import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbox from '../../components/Toolbox/Toolbox';
import ShapeProperties from '../../components/ShapeProperties';
import Groups from '../../components/Groups';
import { tools, mode, defaultShapeAttributes, canvasFunctions } from '../../helper/canvasHelper';
import * as actions from '../../store/actions/actions';
import Shape from '../../components/Shape/Shape';

import './Canvas.css';

class Canvas extends Component {
    state = {
        shape: { type: null, points: [], text: '' },
        referencePoint: { x: null, y: null },
        activeMode: mode.SELECT_MODE,
        drawStarted: false,
        selectedTool: tools.SELECT,
        mouseMoveEventNeeded: false,
        selectedPointIndex: null,
        movingShapeStarted: false,
        pointsBeforeMoving: [],
        selectedBucketColor: '#FFFFFF'
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
                    points = canvasFunctions.getControlPointsForRectangle(this.state.referencePoint, newPoint);
                    break;
                case tools.TRIANGLE:
                    points = canvasFunctions.getControlPointsForTriangle(this.state.referencePoint, newPoint);
                    break;
                case tools.ELLIPSE:
                    points = canvasFunctions.getControlPointsForEllipse(this.state.referencePoint, newPoint);
                    break;
                case tools.CIRCLE:
                    points = canvasFunctions.getControlPointsForCircle(this.state.referencePoint, newPoint);
                    break;
                case tools.LINE:
                    points = canvasFunctions.getControlPointsForLine(this.state.referencePoint, newPoint);
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
            this.props.addShapeToGroup(this.state.shape.id);
        }
    };

    clickShapeHandler = (shape, event) => {
        if (this.state.activeMode !== mode.DRAW_MODE) {
            event.stopPropagation();
        }

        const selectedGroup = this.props.groupsSettings.groups.find(group => {
            return group.id === this.props.groupsSettings.selectedGroupId;
        });

        switch (this.state.activeMode) {
            case mode.SELECT_MODE:
                return this.selectShape(event, shape);

            case mode.DELETE_MODE:
                return selectedGroup.shapeIds.indexOf(shape.id) !== -1 ? this.deleteShape(event, shape) : false;

            case mode.PAINT_MODE:
                if (selectedGroup.shapeIds.indexOf(shape.id) !== -1) {
                    this.selectShape(event, shape);
                    setTimeout(() => this.updateShapeProperties('fill', this.state.selectedBucketColor), 10);
                }

                return false;

            default: return;
        }
    };

    deleteShape = (event, shape) => {
        this.props.deleteShape(shape);
        this.props.deleteShapeFromGroup(shape.id);
    };

    selectShape = (event, shape) => {
        const group = this.props.groupsSettings.groups.find(group => {
            return group.shapeIds.indexOf(shape.id) !== -1;
        });

        if (group) {
            this.props.selectElementDispatch(group.id);
        }

        return this.setState({ shape });
    };

    canvasEventHandler = (event) => {
        const canvas = document.getElementById('Canvas').getBoundingClientRect();
        if (this.state.activeMode === mode.DRAW_MODE && this.state.mouseMoveEventNeeded === false) {
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
                this.props.addShapeToGroup(shape.id);
            }
        }
        if (this.state.activeMode === mode.TEXT_MODE) {
            let referencePoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
            let shape = { id: this.props.lastUsedId + 1, type: this.state.selectedTool, attributes: defaultShapeAttributes(this.state.selectedTool), points: [referencePoint.x + ',' + referencePoint.y], text: 'Some text goes here!' };
            this.setState({ shape, activeMode: mode.SELECT_MODE, selectedTool: tools.SELECT });
            this.props.addShape(shape);
            this.props.addShapeToGroup(shape.id);

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
            case tools.BUCKET:
                activeMode = mode.PAINT_MODE;
                break;
            case tools.TEXT_INPUT:
                activeMode = mode.TEXT_MODE;
                break;
            default:
                break;
        }

        let mouseMoveEventNeeded = false;
        const helper = [tools.RECTANGLE, tools.ELLIPSE, tools.LINE, tools.TRIANGLE, tools.CIRCLE];
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

    handleResizeStart = (selectedPoint, event) => {
        event.stopPropagation();
        let shape = { ...this.state.shape };
        let selectedPointIndex = shape.points.indexOf(selectedPoint);

        if (shape.type === tools.RECTANGLE) {
            let referencePointIndex = selectedPointIndex > 1 ? selectedPointIndex - 2 : selectedPointIndex + 2;
            let referencePointHelper = shape.points[referencePointIndex].split(',');
            let referencePoint = { x: referencePointHelper[0], y: referencePointHelper[1] };
            return this.setState({ shape, referencePoint });
        }

        if (shape.type === tools.ELLIPSE) {
            let centerCoords = shape.points[0].split(',');
            centerCoords = centerCoords.map(item => (Number)(item));
            let rx = shape.points[1];
            let ry = shape.points[2];
            let referencePoint = { x: centerCoords[0] - rx, y: centerCoords[1] - ry };
            return this.setState({ shape, referencePoint });
        }

        if (shape.type === tools.CIRCLE) {
            let centerCoords = shape.points[0].split(',');
            centerCoords = centerCoords.map(item => (Number)(item));
            let radius = shape.points[1];
            let referencePoint = { x: centerCoords[0] - radius, y: centerCoords[1] };
            return this.setState({ shape, referencePoint });
        }

        return this.setState({ selectedPointIndex });

    };

    handleResizeDrag = (axis, event) => {
        event.stopPropagation();
        const canvas = document.getElementById('Canvas').getBoundingClientRect();
        let newPoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
        let shape = { ...this.state.shape };
        let points = [];
        if (shape.type === tools.RECTANGLE) {
            points = canvasFunctions.getControlPointsForRectangle(this.state.referencePoint, newPoint);
        } else if (shape.type === tools.ELLIPSE) {
            if (axis === 'x') {
                newPoint.y = this.state.referencePoint.y + (shape.points[2] * 2);
            } else {
                newPoint.x = this.state.referencePoint.x + (shape.points[1] * 2);
            }
            points = canvasFunctions.getControlPointsForEllipse(this.state.referencePoint, newPoint);
        } else if (shape.type === tools.CIRCLE) {
            points = canvasFunctions.getControlPointsForCircle(this.state.referencePoint, newPoint);
        }
        else {
            points = [...shape.points];
            points[this.state.selectedPointIndex] = newPoint.x + ',' + newPoint.y;
            if (this.state.shape.type !== tools.LINE && this.state.selectedPointIndex === 0) {
                points[points.length - 1] = newPoint.x + ',' + newPoint.y;
            }
        }

        shape.points = points;
        this.setState({ shape });
    };

    handleResizeStop = (event) => {
        event.stopPropagation();
        this.props.updateShape({ ...this.state.shape });
    };

    handleMoveStart = (event) => {
        event.stopPropagation();
        const canvas = document.getElementById('Canvas').getBoundingClientRect();
        let referencePoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
        let pointsBeforeMoving = [...this.state.shape.points];
        this.setState({ referencePoint, movingShapeStarted: true, pointsBeforeMoving });
    };
    handleMoveDrag = (event) => {
        event.stopPropagation();
        const canvas = document.getElementById('Canvas').getBoundingClientRect();
        let newPoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
        let shape = { ...this.state.shape };
        shape.points = canvasFunctions.calculateNewShapePoints(this.state.referencePoint, newPoint, [...shape.points], shape.type);
        this.setState({ shape, referencePoint: newPoint });
    };
    handleMoveStop = (event) => {
        event.stopPropagation();
        this.props.updateShape({ ...this.state.shape, });
        this.setState({ movingShapeStarted: false })
    };

    updateShapeProperties = (attribute, value) => {
        let shape = {
            ...this.state.shape,
            attributes: {
                ...this.state.shape.attributes,
                [attribute]: value
            }
        };
        this.setState({ shape });
        this.props.updateShape(shape);
    };

    changeBucketColorHandler = (color) => {
        return this.setState({ selectedBucketColor: color });
    };

    changeTextHandler = (text) => {
        let shape = { ...this.state.shape };
        shape.text = text;
        this.setState({ shape });
        this.props.updateShape(shape);
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
                                    shape={this.state.shape}
                                    updateShapeProps={this.updateShapeProperties}
                                    selectedColor={this.state.selectedBucketColor}
                                    changeBucketColor={this.changeBucketColorHandler}
                                    changeText={this.changeTextHandler} />
                            </div>
                            <div className='col-md-8'
                                onClick={this.canvasEventHandler}
                                onMouseDown={this.mouseDownHandler}
                                onMouseUp={this.mouseUpHandler}
                                onMouseMove={this.mouseMoveHandler}>
                                <div className=' canvas__draw-wrapper'>
                                    <div className='inner'>
                                        <svg style={{ border: '1px solid #ced4da' }} width='100%' height='100%' id='Canvas'>
                                            {/* Show saved shapes, except shape which you currently draw or have selected */}
                                            {this.props.shapes.map((item, index) => {
                                                if (item.id === this.state.shape.id) {
                                                    return [];
                                                }
                                                return <Shape type={item.type} key={item.id} onClickHandler={this.clickShapeHandler.bind(this, item)} text={item.text} points={item.points} style={item.attributes} />
                                            })}

                                            {/* Show shape you currently manage */}
                                            {this.state.shape.id && <Shape
                                                type={this.state.shape.type}
                                                points={this.state.movingShapeStarted ? this.state.pointsBeforeMoving : this.state.shape.points}
                                                onClickHandler={this.clickShapeHandler.bind(this, this.state.shape)}
                                                text={this.state.shape.text}
                                                class='canvas__shape-selected'
                                                style={this.state.shape.attributes}
                                                isDraggable={this.state.activeMode === mode.SELECT_MODE ? true : false}
                                                position={{ x: 0, y: 0 }}
                                                handleStart={this.handleMoveStart.bind(this)}
                                                handleDrag={this.handleMoveDrag.bind(this)}
                                                handleStop={this.handleMoveStop.bind(this)} />}

                                            {/* Show circle on first point of polygon in DRAW_MODE */}
                                            {this.state.activeMode === mode.DRAW_MODE && this.state.shape.type === tools.POLYGON &&
                                                <circle
                                                    onClick={this.closePolygonHandler}
                                                    cx={this.state.referencePoint.x} cy={this.state.referencePoint.y} r='10'
                                                    style={{ stroke: 'black', strokeWidth: '2', fill: 'red', cursor: 'pointer' }} />}

                                            {/* Show small circles on control points of selected shape in SELECT_MODE */}
                                            {this.state.activeMode === mode.SELECT_MODE && this.state.shape.points.map((item, index) => {
                                                if (this.state.shape.type !== tools.LINE && index === this.state.shape.points.length - 1) {
                                                    return [];
                                                }
                                                let point = [];
                                                let axis = 'both';
                                                if (this.state.shape.type === tools.ELLIPSE || this.state.shape.type === tools.CIRCLE) {
                                                    point = this.state.shape.points[0].split(',');
                                                    point = point.map(item => (Number)(item));
                                                    let radius = this.state.shape.points[index + 1];
                                                    point[index] = point[index] + radius;
                                                    axis = index > 0 ? 'y' : 'x';
                                                } else {
                                                    point = item.split(',');
                                                    point = point.map(item => (Number)(item));
                                                }
                                                return <Shape
                                                    key={index}
                                                    type={tools.CIRCLE}
                                                    points={['0,0', '5']}
                                                    style={{ stroke: 'black', strokeWidth: '1px', fill: 'red', cursor: 'pointer' }}
                                                    isDraggable={true}
                                                    axis={axis}
                                                    position={{ x: point[0], y: point[1] }}
                                                    handleStart={this.handleResizeStart.bind(this, item)}
                                                    handleDrag={this.handleResizeDrag.bind(this, axis)}
                                                    handleStop={this.handleResizeStop} />;
                                            })}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-2 canvas__groups'>
                                <Groups shape={this.state.shape} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

/*function resizeRectangle(oldPoints, newPoint, selectedPointIndex) {
                    let points = [...oldPoints];
    points[selectedPointIndex] = newPoint.x + ',' + newPoint.y;
    if (selectedPointIndex === 0 || selectedPointIndex === 2) {
                    let prevIndex = selectedPointIndex ? (points.length-2) : (selectedPointIndex-1);
        let nextIndex = selectedPointIndex + 1;
        let tmp = points[prevIndex].split(',');
        points[prevIndex] = newPoint.x + ',' + tmp[1];
        tmp = points[nextIndex].split(',');
        points[nextIndex] = tmp[0] + ',' + newPoint.y;
    } else {
                    let prevIndex = selectedPointIndex - 1;
        let nextIndex = selectedPointIndex + 1;
        let tmp = points[prevIndex].split(',');
        points[prevIndex] = tmp[0] + ',' + newPoint.y;
        tmp = points[nextIndex].split(',');
        points[nextIndex] = newPoint.x + ',' + tmp[1];
    }

    if (selectedPointIndex === 0) {
                    points[points.length - 1] = points[0];
                }

    return points;
}*/

const mapStateToProps = state => {
    const sortedShapes = state.groupsSettings.groups.reduce((accumulated, group) => {
        return [...accumulated, ...group.shapeIds]
    }, []);

    const clonnedShapes = [...state.canvas.shapes];
    clonnedShapes.sort((shapeA, shapeB) => {
        return sortedShapes.indexOf(shapeA.id) > sortedShapes.indexOf(shapeB.id);
    });

    return {
        lastUsedId: state.canvas.lastUsedId,
        shapes: clonnedShapes,
        groupsSettings: state.groupsSettings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addShape: (shape) => dispatch(actions.addShape(shape)),
        updateShape: (shape) => dispatch(actions.updateShape(shape)),
        deleteShape: (shape) => dispatch(actions.deleteShape(shape)),
        addShapeToGroup: (shapeId) => dispatch(actions.addShapeToGroup(shapeId)),
        deleteShapeFromGroup: (shapeId) => dispatch(actions.deleteShapeFromGroup(shapeId)),
        selectElementDispatch: (elementId) => dispatch(actions.selectElement(elementId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);