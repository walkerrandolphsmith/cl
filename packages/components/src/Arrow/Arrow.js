import React from 'react';
import PropTypes from 'prop-types';
import { ChevronIcon } from '@versionone/icons';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { Rotate } from '../Rotate';

const buildStyles = ({ height }) => ({
  background: 'none',
  ...styleUtils.padding(0, 8),
  '-moz-appearance': 'none',
  '-webkit-appearance': 'none',
  display: 'flex',
  alignItems: 'center',
  height,
  border: 'none',
});

const ArrowButton = createComponent(
  ({ disabled, height, theme }) => {
    return {
      ...buildStyles({ disabled, height, theme }),
      ':focus': {
        outline: 'none',
        boxShadow: theme.FormField.boxShadow,
      },
      ...styleUtils.conditionalStyle(
        disabled,
        'cursor',
        'not-allowed',
        'pointer',
      ),
    };
  },
  'button',
  [
    'tabIndex',
    'type',
    'onClick',
    'onKeyDown',
    'onKeyUp',
    'onKeyPress',
    'role',
    'aria-label',
    'aria-haspopup',
    'data-toggle',
    'data-component',
    'data-test',
  ],
);

const ArrowIcon = createComponent(buildStyles, 'span', [
  'role',
  'aria-label',
  'aria-haspopup',
  'data-toggle',
  'data-component',
  'data-test',
]);

const Arrow = props => {
  const { open, is, disabled, tabIndex, 'data-test': dataTest } = props;
  const arrow = open ? (
    <Rotate deg={90}>
      <ChevronIcon size={12} />
    </Rotate>
  ) : (
    <Rotate deg={0}>
      <ChevronIcon size={12} />
    </Rotate>
  );

  const ArrowImpl = is === 'button' ? ArrowButton : ArrowIcon;

  return (
    <StyleProvider>
      <ArrowImpl
        {...props}
        disabled={disabled}
        data-component="Arrow"
        data-test={dataTest}
        type="button"
        tabIndex={disabled ? '-1' : tabIndex}
      >
        {arrow}
      </ArrowImpl>
    </StyleProvider>
  );
};

Arrow.propTypes = {
  /**
   * If true the arrow is roated to indicate the related content is visible
   */
  open: PropTypes.bool,
  /**
   * If true the control is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Height of the arrow button
   */
  height: PropTypes.number,
  /**
   * Tab index
   */
  tabIndex: PropTypes.string,
  /**
   * Render a button or a span
   */
  is: PropTypes.oneOf(['span', 'button']),
};

Arrow.defaultProps = {
  open: false,
  disabled: false,
  height: 28,
  tabIndex: '0',
  is: 'button',
};

export { Arrow };
