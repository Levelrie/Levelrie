import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//  Fetch Outfits Saga
function* fetchOutfits() {
  try {
    // yield put({type: 'CLEAR_OUTFITS'});
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
    yield put({type: 'SAGA_FETCH_OUTFITS'});
  }
  catch (error) {
    console.log('Outfit create failed', error);
  }
  return;
}

//  Edit Outfit Saga
function* editOutfit(action) {
  console.log('Action Payload:', action.payload);
  const id = action.payload.id
  try {
    yield axios.put(`/api/design/outfit/edit/${id}`, action.payload);
    yield put({type: 'SAGA_CLEAR_OUTFIT'});
    yield put({type: 'CLEAR_OUTFITS'});
    yield put({type: 'SAGA_FETCH_OUTFITS'});
  }
  catch (error) {
    console.log('Outfit edit failed', error);
  }
  return;
}

//  Delete Outfit Saga
function* deleteOutfit(action) {
  console.log('Action Payload:', action.payload);
  const id = action.payload
  try {
    yield axios.delete(`/api/design/outfit/delete/${id}`);
    yield put({type: 'SAGA_CLEAR_OUTFIT'});
    yield put({type: 'CLEAR_OUTFITS'});
    yield put({type: 'SAGA_FETCH_OUTFITS'});
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

//  Find Outfit Saga
function* findOutfit(action) {
  // console.log('Find outfit ID: ', action.payload);
  const id = action.payload;
  try {
    const outerwear = yield axios.get(`/api/design/outerwear/${id}`);
    const top = yield axios.get(`/api/design/top/${id}`);
    const accessory = yield axios.get(`/api/design/accessory/${id}`);
    const bottom = yield axios.get(`/api/design/bottom/${id}`);
    const footwear = yield axios.get(`/api/design/footwear/${id}`);
    // console.log('outerwear:', outerwear);
    yield put({ type: 'SET_OUTERWEAR', payload: outerwear.data[0] })
    yield put({ type: 'SET_TOP', payload: top.data[0] })
    yield put({ type: 'SET_ACCESSORY', payload: accessory.data[0] })
    yield put({ type: 'SET_BOTTOM', payload: bottom.data[0] })
    yield put({ type: 'SET_FOOTWEAR', payload: footwear.data[0] })
  }
  catch (error) {
    console.log('Outfit find failed', error);
  }
}

function* fetchItemsForDesign() {
    try {
        const items = yield axios.get('/api/item/design');
        yield put({
            type: 'SET_ITEMS',
            payload: items.data
        })

    } catch (error) {
        console.log('itemsSaga fetchItemsForDesign function error', error);
    }
}

function* designSaga() {
    yield takeLatest('SAGA_FETCH_OUTFITS', fetchOutfits),
    yield takeLatest('SAGA_CREATE_OUTFIT', createOutfit),
    yield takeLatest('SAGA_EDIT_OUTFIT', editOutfit),
    yield takeLatest('SAGA_DELETE_OUTFIT', deleteOutfit),
    yield takeLatest('SAGA_CLEAR_OUTFIT', clearOutfit),
    yield takeLatest('SAGA_FIND_OUTFIT', findOutfit),
    yield takeLatest('SAGA_FETCH_ITEMS_FOR_DESIGN', fetchItemsForDesign);
}

export default designSaga;