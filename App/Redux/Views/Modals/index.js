import { combineReducers } from 'redux';
import { bookLessonReducer } from './BookLesson';
import { cancelDrivingLessonModalReducer } from './CancelDrivingLesson';
import { schoolActivationReducer } from './SchoolActivationRedux';
import { metaModalsReducer } from './ModalRedux';

export const modalsReducer = combineReducers({
  bookLesson: bookLessonReducer,
  cancelLesson: cancelDrivingLessonModalReducer,
  schoolActivation: schoolActivationReducer,
  meta: metaModalsReducer
});
