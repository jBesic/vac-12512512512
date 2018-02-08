import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mode } from '../../helper/canvasHelper';
import { updateShape } from '../../store/actions/actions';
import './shape-properties.css';

class ShapeProperties extends Component {
    constructor(props) {
        super();

        this.state = {
            shape: { ...props.shape }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            shape: {
                ...nextProps.shape,
                attributes: nextProps.shape.attributes
            }
        });
    }

    updateShape(attribute, value) {
        this.setState({
            shape: {
                ...this.state.shape,
                attributes: {
                    ...this.state.shape.attributes,
                    [attribute]: value
                }
            }
        });

        setTimeout(() => this.props.updateShape(this.state.shape), 10);
    }

    getPropertyType(type) {
        switch (type) {
            case 'borderSize':
                return (
                    <div key='borderSize' className='shape-properties-wrapper mb-1'>
                        <label>Border size</label>
                        <input
                            className="form-control"
                            type='number'
                            value={this.state.shape.attributes.borderSize}
                            onChange={ev => this.updateShape('borderSize', ev.target.value)}
                            min='0' step='1' />
                    </div>
                );

            case 'borderColor':
                return (
                    <div key='borderColor' className='shape-properties-wrapper mb-1'>
                        <label>Border Color</label>
                        <input
                            className="form-control"
                            type='color'
                            value={this.state.shape.attributes.borderColor}
                            onChange={ev => this.updateShape('borderColor', ev.target.value)} />
                    </div>
                );

            case 'fillColor':
                return (
                    <div key='fillColor' className='shape-properties-wrapper mb-1'>
                        <label>Fill Color</label>
                        <input
                            className="form-control"
                            type='color'
                            value={this.state.shape.attributes.fillColor}
                            onChange={ev => this.updateShape('fillColor', ev.target.value)} />
                    </div>
                );

            case 'opacity':
                return (
                    <div key='opacity' className='shape-properties-wrapper mb-1'>
                        <label>Opacity</label>
                        <input
                            className="form-control"
                            type='number'
                            value={this.state.shape.attributes.opacity}
                            onChange={ev => this.updateShape('opacity', ev.target.value)}
                            min='0' max='100' step='1' />
                    </div>
                );

            case 'groupId':
                return (
                    <div key='groupId' className='shape-properties-wrapper mb-1'>
                        <label>Group</label>
                        <select
                            className="form-control"
                            value={this.state.shape.attributes.groupId}
                            onChange={ev => this.updateShape('groupId', ev.target.value)}>
                            <option value='undefined'>No Group</option>
                        </select>
                    </div >
                );

            default:
                return null;
        }
    }

    render() {
        return (
            this.props.mode === mode.SELECT_MODE && this.state.shape.id ?
                < div className='row' >
                    <div className='col-md-12 mb-3'>
                        <div className="alert alert-secondary  m-0 p-1">
                            Properties
                    </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                        {Object.keys(this.state.shape.attributes).map(attribute => {
                            return this.getPropertyType(attribute);
                        })}
                    </div>
                </div >
                : null
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        updateShape: (shape) => dispatch(updateShape(shape))
    }
}

export default connect(null, mapDispatchToProps)(ShapeProperties);