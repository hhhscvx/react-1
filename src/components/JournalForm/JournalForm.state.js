export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true,
  },
  values: {
    post: "",
    title: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE": // Сначала в CLEAR присваиваем values пустые поля, затем в SET_VALUE при submit`е формы срабатывает onChange, которой применяет к полям значения из state, и если они равны пустым строкам, то поля очищаются
      return { ...state, values: { ...state.values, ...action.payload } }; // action.payload нам нужен для того, чтобы в форме отображалось то, что мы вводим
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const titleValidity = state.values.title?.trim().length;
      const postValidity = state.values.post?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        isValid: {
          post: postValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: titleValidity && postValidity && dateValidity,
      };
    }
  }
}
