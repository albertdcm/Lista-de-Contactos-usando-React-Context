export const initialStore = () => ({
  contacts: [],
  todos: []
});

export default function storeReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };

    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload)
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };

    default:
      return state;
  }
}