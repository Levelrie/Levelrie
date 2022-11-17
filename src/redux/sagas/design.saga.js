import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//  Create Outfit Saga
function* createOutfit(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.post('/api/design/outfit/create', action.payload);
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

//  Create Item Saga
function* createItem(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.post('/api/design/item/create', action.payload);
  }
  catch (error) {
    console.log('Item create failed', error);
  }
  return;
}

//  Edit Item Saga
function* editItem(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.put('/api/design/item/edit', action.payload);
  }
  catch (error) {
    console.log('Item edit failed', error);
  }
  return;
}

//  Delete Item Saga
function* deleteItem(action) {
  console.log('Action Payload:', action.payload);
  try {
    yield axios.delete('/api/design/item/delete', action.payload);
  }
  catch (error) {
    console.log('Item delete failed', error);
  }
  return;
}

function* designSaga() {
    yield takeLatest('SAGA_CREATE_OUTFIT', createOutfit),
    yield takeLatest('SAGA_EDIT_OUTFIT', editOutfit),
    yield takeLatest('SAGA_DELETE_OUTFIT', deleteOutfit),
    yield takeLatest('SAGA_CREATE_ITEM', createItem),
    yield takeLatest('SAGA_EDIT_ITEM', createItem),
    yield takeLatest('SAGA_DELETE_ITEM', deleteItem)
}

export default designSaga;