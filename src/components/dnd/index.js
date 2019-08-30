import withStore from '~/hocs/withStore';
import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ListGroup } from 'react-bootstrap';

const SortableItem = SortableElement(({value}) => <ListGroup.Item>{value}</ListGroup.Item>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ListGroup>
            {items.map((value, index) => (
                <SortableItem key={`item-${value.name}`} index={index} value={value.name} />
            ))}
        </ListGroup>
    );
});

class SortableComponent extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        return <SortableList items={this.props.stores.maps.pointer} onSortEnd={this.onSortEnd} />;
    }
}

export default withStore(SortableComponent);