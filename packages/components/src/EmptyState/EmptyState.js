import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider } from '../StyleProvider';
import { Grid } from '../Grid';
import { SpacedGroup } from '../SpacedGroup';

const Impl = createComponent(
  ({ theme }) => {
    return {
      color: theme.EmptyState.main,
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const Title = createComponent(
  () => ({
    'font-size': '1.429em',
    'font-weight': '300',
  }),
  'h2',
);

const EmptyState = props => {
  const { icon, title, children, primaryAction, 'data-test': dataTest } = props;
  const supportingVisual = Boolean(icon) && (
    <Impl {...props}>
      {React.createElement(icon, {
        size: 72,
      })}
    </Impl>
  );

  return (
    <StyleProvider>
      <div data-component="EmptyState" data-test={dataTest}>
        <SpacedGroup xs={8}>
          <Grid xs={12} direction="row" justify="center" alignItems="center">
            {supportingVisual}
          </Grid>
          <Grid xs={12} direction="row" justify="center" alignItems="center">
            <Title>{title}</Title>
          </Grid>
          {children && (
            <Grid xs={12} direction="row" justify="center" alignItems="center">
              {children}
            </Grid>
          )}
          <Grid xs={12} direction="row" justify="center" alignItems="center">
            {primaryAction}
          </Grid>
        </SpacedGroup>
      </div>
    </StyleProvider>
  );
};

EmptyState.propTypes = {
  /**
   * Additional guidance to help the user. Assume this won't be read
   */
  children: PropTypes.node,
  /**
   * Main message to guide user to using feature
   */
  title: PropTypes.string.isRequired,
  /**
   * Action the user can take to resolve the empty state
   */
  primaryAction: PropTypes.node,
  /**
   * Icon that explains the empty state
   */
  icon: PropTypes.element,
};

EmptyState.defaultProps = {};

export { EmptyState };
