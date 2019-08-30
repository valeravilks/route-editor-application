import withStore from '~/hocs/withStore';
import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { ListGroup } from 'react-bootstrap';

const SortableItem = SortableElement(({value}) => <ListGroup.Item>{value}</ListGroup.Item>);

const SortableList = withStore(SortableContainer(({items}) => {
    console.log(1);

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