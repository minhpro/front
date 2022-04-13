import { combineReducers } from "redux";
import questionTypeSlide from "redux/slide/questionTypeSlide";
import classReducer from "redux/slide/classSlide";
import subjectSlide from "redux/slide/subjectSlide";
import chapterSlide from "redux/slide/chapterSlide";
import unitsSilde from "redux/slide/unitsSilde";
import testTypeSilde from "redux/slide/testTypeSilde";
import questionDistributionsSlide from "redux/slide/questionDistributionsSlide";
import timeExamSlide from "redux/slide/timeExamSlide";
import scoreSlide from "redux/slide/scoreSlide";
import otherConfigSlide from "redux/slide/otherConfigSlide";
import authSlide from "redux/slide/authSlide";
import checkingSlice from "redux/slide/checkingSlice";
import nofiSlide from "redux/slide/nofiSlide";

export default combineReducers({
  reduxQuestionType: questionTypeSlide,
  reduxClass: classReducer,
  reduxSubject: subjectSlide,
  reduxChapter: chapterSlide,
  reduxUnits: unitsSilde,
  reduxTestType: testTypeSilde,
  reduxQuestionDistributions: questionDistributionsSlide,
  reduxTimeExam: timeExamSlide,
  reduxScoreSlide: scoreSlide,
  reduxOtherConfig: otherConfigSlide,
  reduxAuth: authSlide,
  reduxChecking: checkingSlice,
  reduxNofi: nofiSlide,
});
