import withStore from '~/hocs/withStore';
import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import { ListGroup, Button } from 'react-bootstrap';
import css from './style.module.scss';

const SortableItem = SortableElement(({value}) =>
    <ListGroup.Item className={css.item}>
        <div className={css.fg}>{value}</div>
        <Button variant="danger">-</Button>
    </ListGroup.Item>);

const SortableList = withStore(SortableContainer(({items}) => {
    return (
        <ListGroup>
            {items.map((value, index) => (
                <SortableItem key={index} index={index} value={value.name} />
            ))}
        </ListGroup>
    );
}));

class SortableComponent extends Component {
     onSortEnd = ({oldIndex, newIndex}) => {
        this.props.stores.maps.pointerSort(oldIndex, newIndex);
    };
    render() {
        return <SortableList key={this.props.stores.maps.pointer.length} items={this.props.stores.maps.pointer} onSortEnd={this.onSortEnd} />;
    }
}

export default withStore(SortableComponent);