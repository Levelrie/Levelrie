import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* outfitDisplay(action) {
  console.log('Action Payload:', action.payload);
  console.log('Category Number -->', action.payload.category_id);
  switch (action.payload.category_id) {
    case 1:
      console.log('We hit a 1');
      try {
        yield put({ type: 'CLEAR_TOP'}),
        yield put({ type: 'SET_TOP', payload: action.payload});
      }
      catch (error) {
        console.log('Item display failed', error);
      }
      return;
    case 2:
      console.log('We hit a 2');
      try {
        yield put({ type: 'CLEAR_BOTTOM'}),
        yield put({ type: 'SET_BOTTOM', payload: action.payload});
      }
      catch (error) {
        console.log('Item display failed', error);
      }
      return;
    case 3:
      console.log('We hit a 3');
      try {
        yield put({ type: 'CLEAR_FOOTWEAR'}),
        yield put({ type: 'SET_FOOTWEAR', payload: action.payload});
      }
      catch (error) {
        console.log('Item display failed', error);
      }
      return;
    case 6:
      console.log('We hit a 6');
      try {
        yield put({ type: 'CLEAR_OUTERWEAR'}),
        yield put({ type: 'SET_OUTERWEAR', payload: action.payload});
      }
      catch (error) {
        console.log('Item display failed', error);
      }
      return;
    case 7:
      console.log('We hit a 7');
      try {
        yield put({ type: 'CLEAR_ACCESSORY'}),
        yield put({ type: 'SET_ACCESSORY', payload: action.payload});
      }
      catch (error) {
        console.log('Item display failed', error);
      }
      return;
  }
}

function* outfitDisplaySaga() {
    yield takeLatest('SAGA_OUTFIT_DISPLAY', outfitDisplay)
}

export default outfitDisplaySaga;