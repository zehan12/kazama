import React from 'react';

export function createHOCs(hooks: any) {
  const { useModel, useModelDispatchers, useModelEffectsLoading, useModelEffectsError } = hooks;

  const withModel =
    (key: string, mapModelToProps?: (model: any) => any) => (Component: any) => {
      return (props: any) => {
        const model = useModel(key);
        const modelProps = mapModelToProps ? mapModelToProps(model) : { [key]: model };
        return React.createElement(Component, { ...props, ...modelProps });
      };
    };

  const withModelDispatchers =
    (key: string, mapModelDispatchersToProps?: (dispatchers: any) => any) => (Component: any) => {
      return (props: any) => {
        const dispatchers = useModelDispatchers(key);
        const modelProps = mapModelDispatchersToProps
          ? mapModelDispatchersToProps(dispatchers)
          : { [`${key}Dispatchers`]: dispatchers };
        return React.createElement(Component, { ...props, ...modelProps });
      };
    };

  const withModelEffectsLoading =
    (key: string, mapModelEffectsLoadingToProps?: (loading: any) => any) => (Component: any) => {
      return (props: any) => {
        const loading = useModelEffectsLoading(key);
        const modelProps = mapModelEffectsLoadingToProps
          ? mapModelEffectsLoadingToProps(loading)
          : { [`${key}EffectsLoading`]: loading };
        return React.createElement(Component, { ...props, ...modelProps });
      };
    };

  const withModelEffectsError =
    (key: string, mapModelEffectsErrorToProps?: (error: any) => any) => (Component: any) => {
      return (props: any) => {
        const error = useModelEffectsError(key);
        const modelProps = mapModelEffectsErrorToProps
          ? mapModelEffectsErrorToProps(error)
          : { [`${key}EffectsError`]: error };
        return React.createElement(Component, { ...props, ...modelProps });
      };
    };

  return {
    withModel,
    withModelDispatchers,
    withModelEffectsLoading,
    withModelEffectsError,
  };
}
