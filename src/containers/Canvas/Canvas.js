import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Toolbox from '../../components/Toolbox/Toolbox';
import ShapeProperties from '../../components/ShapeProperties';
import Groups from '../../components/Groups';
import { tools, mode, defaultShapeAttributes, canvasFunctions } from '../../helper/canvasHelper';
import * as actions from '../../store/actions/actions';
import Shape from '../../components/Shape/Shape';

import './Canvas.css';

class Canvas extends Component {
    state = {
        drawingName: 'Untitled',
        shape: { type: null, points: [], text: '' },
        referencePoint: { x: null, y: null },
        activeMode: mode.SELECT_MODE,
        drawStarted: false,
        selectedTool: tools.SELECT,
        mouseMoveEventNeeded: false,
        selectedPointIndex: null,
        movingShapeStarted: false,
        pointsBeforeMoving: [],
        selectedBucketColor: '#FFFFFF',
        remainingTime: null,
        intervalId: null
    };

    componentDidMount = () => {
        if (this.props.competition.hasOwnProperty('id')) {
            const competitionStarted = parseInt(Date.now() / 1000, 10);
            const newState = {
                remainingTime: this.props.competition.endDate + ':00'
            };

            const intervalId = setInterval(() => {
                const now = parseInt(Date.now() / 1000, 10);
                const timeleft = competitionStarted + this.props.competition.endDate * 60 - now;
                if (timeleft <= 0) {
                    clearInterval(this.state.intervalId);
                    newState.remainingTime = '0:00';
                    this.saveDrawingHandler();
                } else {
                    newState.remainingTime = parseInt(timeleft / 60, 10) + ':' + ('0' + timeleft % 60).slice(-2);
                }

                this.setState(newState);
            }, 1000)

            newState.intervalId = intervalId;
            this.setState(newState);
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        this.props.resetCanvasGlobalState(false);
    }

    componentWillReceiveProps = (nextProps) => {
        // check is reset needed
        if (nextProps.resetCanvasLocalState === true) {
            this.setState({
                drawingName: '',
                shape: { type: null, points: [], text: '' },
                referencePoint: { x: null, y: null },
                activeMode: mode.SELECT_MODE,
                drawStarted: false,
                selectedTool: tools.SELECT,
                mouseMoveEventNeeded: false,
                selectedPointIndex: null,
                movingShapeStarted: false,
                pointsBeforeMoving: [],
                selectedBucketColor: '#FFFFFF',
                remainingTime: null,
                intervalId: null
            });

            this.props.updateResetCanvasLocalStateField(false);
            this.props.history.push('/gallery/user/' + nextProps.userId);
        }

        if ((this.state.activeMode === mode.UNDO_MODE || this.state.activeMode === mode.REDO_MODE) && nextProps.shapes.length) {
            let lastShape = nextProps.shapes[nextProps.shapes.length - 1];
            if (lastShape.type === tools.POLYGON && lastShape.points.length > 1 && lastShape.points[0] !== lastShape.points[lastShape.points.length - 1]) {
                let point = lastShape.points[0].split(',');
                let referencePoint = { x: point[0], y: point[1] };
                this.setState({
                    activeMode: mode.DRAW_MODE,
                    shape: lastShape,
                    selectedTool: lastShape.type,
                    drawStarted: true,
                    referencePoint,
                    mouseMoveEventNeeded: false
                });
            } else {
                this.setState({ shape: { type: null, points: [], text: '' }, drawStarted: false, activeMode: mode.SELECT_MODE, selectedTool: tools.SELECT, mouseMoveEventNeeded: false });
            }
        }
    };
    changeDrawingName = (name) => {
        this.setState({ drawingName: name })
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
            if (this.state.shape.points.length) {
                this.props.addShape(this.state.shape);
            }
            this.setState({ shape: { id: null, points: [], attributes: defaultShapeAttributes(this.state.shape.type) }, drawStarted: false });
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
            }
        }
        if (this.state.activeMode === mode.TEXT_MODE) {
            let referencePoint = { x: event.clientX - canvas.left, y: event.clientY - canvas.top };
            let shape = { id: this.props.lastUsedId + 1, type: this.state.selectedTool, attributes: defaultShapeAttributes(this.state.selectedTool), points: [referencePoint.x + ',' + referencePoint.y], text: 'Some text goes here!' };
            this.setState({ shape, activeMode: mode.SELECT_MODE, selectedTool: tools.SELECT });
            this.props.addShape(shape);

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

    undoRedoHandler = (action) => {
        if (action === 'undo') {
            this.setState({ activeMode: mode.UNDO_MODE });
            setTimeout(() => this.props.undo(), 10);
        } else {
            this.setState({ activeMode: mode.REDO_MODE });
            setTimeout(() => this.props.redo(), 10);
        }

    };
    saveDrawingHandler = () => {
        let drawing = {
            name: this.state.drawingName,
            shapes: this.props.shapes,
            competitionId: this.props.competition ? Number.parseInt(this.props.competition.id, 10) : null
        };

        if (this.props.isLoged === true) {
            return this.props.saveDrawing(drawing);
        }

        return this.props.modal('login', true, 'Save drawing is allowed only for logged users.', drawing);
    };

    render() {
        return (
            <div className='container'>
                {/* *** Canvas Title *** */}
                <div className='row canvas__title'>
                    <div className='col-md-12' >
                        {this.props.competition.id ? 'Competition: ' + this.props.competition.name : 'Draw for fun'}
                    </div>
                </div>
                {/* *** Canvas Content Header *** */}
                <div className='row d-flex align-items-center'>
                    <div className='col-md-4'>
                        <input value={this.state.drawingName} onChange={(ev) => this.changeDrawingName(ev.target.value)} type="text" className="form-control" placeholder='Enter a name of your art...' />
                    </div>
                    <div className='col-md-6 text-center'>
                        {this.props.competition.id ? <div className="alert alert-light m-0 p-2">
                            Remaining time: <strong>{this.state.remainingTime} minutes</strong>
                        </div> : null}
                    </div>
                    <div className='col-md-2'><button disabled={this.state.drawingName === '' || this.props.shapes.length === 0} type="button" className="btn vac-btn-primary canvas__save-button" onClick={this.saveDrawingHandler}>Save</button></div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        {/* *** Canvas Content Body  *** */}
                        <div className='row canvas__content-body mt-10'>
                            <div className='col-md-2 canvas__toolbox'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <Toolbox
                                            onClick={this.unselectShapeHandler}
                                            selectedTool={this.state.selectedTool}
                                            selectToolHandler={this.selectToolHandler}
                                            drawStarted={this.state.drawStarted} /></div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='card mt-3'>
                                            <div className='card-body pt-2 pb-2'>
                                                <div className='row'>
                                                    <div className='col-md-6'><i className='fa fa-undo fa-lg text-info' onClick={() => this.undoRedoHandler('undo')} style={{ cursor: 'pointer' }}></i></div>
                                                    <div className='col-md-6'><i className='fa fa-repeat fa-lg text-info' onClick={() => this.undoRedoHandler('redo')} style={{ cursor: 'pointer' }}></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <ShapeProperties
                                            mode={this.state.activeMode}
                                            shape={this.state.shape}
                                            updateShapeProps={this.updateShapeProperties}
                                            selectedColor={this.state.selectedBucketColor}
                                            changeBucketColor={this.changeBucketColorHandler}
                                            changeText={this.changeTextHandler} />
                                    </div>
                                </div>
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
                                <Groups
                                    activeMode={this.state.activeMode}
                                    unselectShapeHandler={this.unselectShapeHandler}
                                    shape={this.state.shape} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

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
        isLoged: state.auth.isLoged,
        userId: state.auth.userId,
        shapes: clonnedShapes,
        groupsSettings: state.groupsSettings,
        resetCanvasLocalState: state.canvas.resetCanvasLocalState,
        competition: state.competitions.started
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addShape: (shape) => dispatch(actions.addShape(shape)),
        updateShape: (shape) => dispatch(actions.updateShape(shape)),
        deleteShape: (shape) => dispatch(actions.deleteShape(shape)),
        selectElementDispatch: (elementId) => dispatch(actions.selectElement(elementId)),
        undo: () => dispatch(actions.undo()),
        redo: () => dispatch(actions.redo()),
        modal: (component, show, message, payload = null) => dispatch(actions.AuthenticationModal(component, show, message, payload)),
        saveDrawing: (drawing) => dispatch(actions.AsyncSaveDrawing(drawing)),
        updateResetCanvasLocalStateField: (val) => dispatch(actions.updateResetCanvasLocalStateField(val)),
        resetCanvasGlobalState: (resetLocalCanvasState) => dispatch(actions.resetCanvasGlobalState(resetLocalCanvasState))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Canvas));