import { useMemo, useReducer } from 'react';

type AnyAction = {
  type: string;
  payload?: any;
};
type AnyMethod = (state: any, payload?: any) => any;

type Tail<Arr extends readonly unknown[]> = Arr extends readonly [unknown, ...infer Rest] ? Rest : [];

type AnyMethodsMap<State> = Record<string, (state: State, payload: any) => State>;

type UseMethodsOptions<State, Methods> = {
  initialState: State;
  methods: Methods;
};

type UseMethodsInit<State, Methods extends AnyMethodsMap<State>> =
  | UseMethodsOptions<State, Methods>
  | (() => UseMethodsOptions<State, Methods>);

type BoundMethod<Method extends AnyMethod> = (...args: Tail<Parameters<Method>>) => void;

type BoundMethods<Methods extends AnyMethodsMap<any>> = {
  [Key in keyof Methods]: BoundMethod<Methods[Key]>;
};

const useMethods = <State, Methods extends AnyMethodsMap<State>>(
  options: UseMethodsInit<State, Methods>,
): [State, BoundMethods<Methods>] => {
  const initialOptions = useMemo(
    () => (typeof options === 'function' ? options() : options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const reducer = (state: State, action: AnyAction) => {
    const currentOptions = typeof options === 'function' ? options() : options;

    return currentOptions.methods[action.type](state, action.payload);
  };

  const [state, dispatch] = useReducer(reducer, initialOptions.initialState);

  const methods = useMemo(() => {
    const result: Record<string, (payload?: unknown) => void> = {};

    Object.keys(initialOptions.methods).forEach(key => {
      result[key] = (payload?: unknown) => dispatch({ type: key, payload });
    });

    return result;
  }, [initialOptions]);

  return [state, methods as BoundMethods<Methods>];
};

export { useMethods };
export type { AnyMethodsMap as UseMethodsMethodList };
