import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//  Fetch Outfits Saga
function* fetchOutfits() {
  try {
    yield put({type: 'CLEAR_OUTFITS'});
    const outfits = yield axios.get('/api/design/outfits');
    yield put({
      type: 'SET_OUTFITS',
      payload: outfits.data
  })
  }
  catch (error) {
    console.log('Outfits fetch failed', error);
  }
  return;
}

//  Create Outfit Saga
function* createOutfit(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.post('/api/design/outfit/create', action.payload);
    yield put({type: 'SAGA_CLEAR_OUTFIT'});
  }
  catch (error) {
    console.log('Outfit create failed', error);
  }
  return;
}

//  Edit Outfit Saga
function* editOutfit(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.put('/api/design/outfit/edit', action.payload);
  }
  catch (error) {
    console.log('Outfit edit failed', error);
  }
  return;
}

//  Delete Outfit Saga
function* deleteOutfit(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.delete('/api/design/outfit/delete', action.payload);
  }
  catch (error) {
    console.log('Outfit delete failed', error);
  }
  return;
}

//  Clear Outfit Saga
function* clearOutfit() {
  try {
    yield put({ type: 'CLEAR_OUTERWEAR'});
    yield put({ type: 'CLEAR_TOP'});
    yield put({ type: 'CLEAR_ACCESSORY'});
    yield put({ type: 'CLEAR_BOTTOM'});
    yield put({ type: 'CLEAR_FOOTWEAR'});
  }
  catch (error) {
    console.log('Outfit clear failed', error);
  }
  return;
}

function* designSaga() {
    yield takeLatest('SAGA_FETCH_OUTFITS', fetchOutfits),
    yield takeLatest('SAGA_CREATE_OUTFIT', createOutfit),
    yield takeLatest('SAGA_EDIT_OUTFIT', editOutfit),
    yield takeLatest('SAGA_DELETE_OUTFIT', deleteOutfit),
    yield takeLatest('SAGA_CLEAR_OUTFIT', clearOutfit)
}

export default designSaga;