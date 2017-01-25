import React, { Component, PropTypes } from 'react';
import TrashIcon from 'react-icons/lib/fa/trash-o';
import EditIcon from 'react-icons/lib/fa/edit';
import EntryForm from '../../containers/archive/entry-form';
import styles from '../../styles/entry';
import Column from '../column';
import Button from '../button';
import EntryView from './entry-view';
import EmptyView from './entry-empty';

class Entry extends Component {
  componentWillReceiveProps(nextProps) {
    const { mode, entry, initializeForm } = this.props;
    if (nextProps.mode !== mode) {
      if (nextProps.mode === 'edit' && entry) {
        initializeForm(entry);
      }
    }
  }

  renderEditMode() {
    let ref;
    return {
      content: <EntryForm
        ref={form => {
          ref = form;
        }}
        onSubmit={values => this.props.onEditEntry(values)}
        onKeyUp={this.handleKeyUp}
        />,
      footer: (
        <div className={styles.splitter}>
          <div>
            <Button
              onClick={() => ref.submit()}
              disabled={!this.props.dirty}
              primary
              >Save</Button>
            {' '}
            <Button onClick={this.props.handleViewMode} secondary>Cancel</Button>
          </div>
          <div>
            <Button
              onClick={() => this.props.onDelete(this.props.entry.id)}
              icon={<TrashIcon/>}
              danger
              >Delete</Button>
          </div>
        </div>
      )
    };
  }

  renderNewMode() {
    let ref;
    return {
      content: <EntryForm
        ref={form => {
          ref = form;
        }}
        onSubmit={values => this.props.onNewEntry(values)}
        />,
      footer: (
        <div>
          <Button
            onClick={() => ref.submit()}
            disabled={!this.props.dirty}
            primary
            >Save</Button>
          {' '}
          <Button onClick={this.props.handleViewMode} secondary>Cancel</Button>
        </div>
      )
    };
  }

  renderViewMode() {
    return {
      content: <EntryView entry={this.props.entry}/>,
      footer: <Button onClick={this.props.handleEditMode} secondary icon={<EditIcon/>}>Edit</Button>
    };
  }

  renderIdleMode() {
    return {
      content: <EmptyView/>,
      footer: null
    };
  }

  render() {
    const { entry, mode } = this.props;
    let fn = null;

    if (entry && mode !== 'new') {
      if (mode === 'edit') {
        fn = this.renderEditMode;
      } else if (mode === 'view') {
        fn = this.renderViewMode;
      }
    } else if (!entry && mode === 'new') {
      fn = this.renderNewMode;
    } else {
      fn = this.renderIdleMode;
    }

    const { content, footer } = fn.call(this);

    return (
      <Column light footer={footer} className={styles.column} contentClassName={styles.content}>
        {content}
      </Column>
    );
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      ref.submit();
    }
  }

}



Entry.propTypes = {
  dirty: PropTypes.bool,
  mode: PropTypes.string,
  entry: PropTypes.object,
  onEditEntry: PropTypes.func,
  onNewEntry: PropTypes.func,
  onDelete: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleViewMode: PropTypes.func,
  initializeForm: PropTypes.func
};

export default Entry;
