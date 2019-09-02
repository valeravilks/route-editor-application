import withStore from '~/hocs/withStore';
import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import { ListGroup, Button } from 'react-bootstrap';
import css from './style.module.scss';

const SortableItem = SortableElement(({sortIndex, removeItem, value}) =>{
    return(
    <ListGroup.Item className={css.item}>
        <div className={css.fg}>{value}</div>
        <Button variant="danger"
                onClick={() => removeItem(sortIndex)}
                >
            X
        </Button>
    </ListGroup.Item>)});

const SortableList = SortableContainer(({items, removeItem}) => {
    return (
        <ListGroup>
            {items.map((value, index) => (
                <SortableItem sortIndex={index} key={index} index={index} value={value.name} removeItem={removeItem} />
            ))}
        </ListGroup>
    );
});
class SortableComponent extends Component {
     onSortEnd = ({oldIndex, newIndex}) => {
        this.props.stores.maps.pointerSort(oldIndex, newIndex);
    };

    removeItem = (value) => {
        this.props.stores.maps.pointerRemove(value);
    };

    render() {
        return <SortableList key={this.props.stores.maps.pointer.length} items={this.props.stores.maps.pointer}
                             onSortEnd={this.onSortEnd}
                             removeItem={(index) => this.removeItem(index)}
        />;
    }
}

export default withStore(SortableComponent);