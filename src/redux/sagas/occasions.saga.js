import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchOccasions() {
    try {
        const occasions = yield axios.get('/api/occasions');
        yield put({
            type: 'SET_OCCASIONS',
            payload: occasions.data
        })
    } catch (error) {
        console.log('SAGA Fetch Occasions error', error);
    }

}

function* occasionsSaga() {
    yield takeEvery('SAGA_FETCH_OCCASIONS',fetchOccasions);
}

export default occasionsSaga;