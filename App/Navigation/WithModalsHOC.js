import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ModalTemplate from '../Components/ModalTemplate';
import { MODALS_IDS } from '../Redux/ModalRedux';
import CancelDrivingLesson from '../Components/CancelDrivingLesson';
import BookLessonWidget from '../Components/BookLessonWidget';

export const withModals = (TabNav) => {
  class TabFlowWithModals extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        drivingLessonCancelStatus,
        drivingLessonBookStatus
      } = this.props;

      return (
        <View style={{ flex: 1 }}>
          <ModalTemplate
            modalID={MODALS_IDS.CANCEL_DRIVING_LESSON}
            status={drivingLessonCancelStatus}
          >
            <CancelDrivingLesson/>
          </ModalTemplate>

          <ModalTemplate
            modalID={MODALS_IDS.CREATE_DRIVING_LESSON}
            status={drivingLessonBookStatus}
          >
            <BookLessonWidget/>
          </ModalTemplate>

          <TabNav navigation={this.props.navigation}/>
        </View>
      )
    }
  }

  TabFlowWithModals.router = TabNav.router;

  const mapStateToProps = state => ( {
    drivingLessonCancelStatus: state.lessonModal.cancel.status,
    drivingLessonBookStatus: state.lessonModal.book.status,
  });

  return connect(mapStateToProps)(TabFlowWithModals);
};
