import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; //인풋 값 변경
const CREATE = 'waiting/CREATE'; //명단에 이름 추가
const ENTER = 'waiting/ENTER'; //입장
const LEAVE = 'waiting/LEAVE'; //나감

// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text});
// export const create = text => ({ type: CREATE, payload: text});
// export const enter = id => ({ type: ENTER, payload: id});
// export const leave = id => ({ type: LEAVE, payload: id});

//위 코드를 createAction 을 통해 대체하기
//export const 액션생성함수이름 = createAction(타입, 인자 => 인자);
let id = 3;

export const changeInput = createAction(CHANGE_INPUT, (text) => text);
export const create = createAction(CREATE, (text) => ({ text, id: id++ }));
export const enter = createAction(ENTER, (id) => id);
export const leave = createAction(LEAVE, (id) => id);

//작동예시
// create('hello');
// { type: CREATE, payload: { id: 3, text: 'hello' }}
// create('bye')
// { type: CREATE, payload: { id: 4, text: 'bye' }}

//***초기상태 정의 */
const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entered: false,
    },
  ],
};

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state, //state에 해당하는 값 넘겨줌
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        //concat 은 배열 붙이기
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(
        //map 은 배열 안의 값을 수정함
        (item) =>
          item.id === action.payload
            ? { ...item, entered: !item.entered } //액션으로 요청된 id와 같은게 있으면 enterted 값 true로 변경
            : item //아니라면 그대로
      ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload), //액션으로 요청된 id와 같지 않은것들만 걸러서 list에 남김
    }),
  },
  initialState
);
